import {
  BaseFeatureDataAdapter,
  BaseOptions
} from "@jbrowse/core/data_adapters/BaseAdapter";
import { AnyConfigurationModel } from "@jbrowse/core/configuration/configurationSchema";
import { getSubAdapterType } from "@jbrowse/core/data_adapters/dataAdapterCache";
import { ObservableCreate } from "@jbrowse/core/util/rxjs";
import { readConfObject } from "@jbrowse/core/configuration";
import { Region, NoAssemblyRegion } from "@jbrowse/core/util/types";
import SimpleFeature, { Feature } from "@jbrowse/core/util/simpleFeature";
import { toArray } from "rxjs/operators";

import { sanitizeWindowSize, sanitizeWindowOverlap } from "./configSchema";

function count_regexp(target_string: string, regexp_string: string): number {
  let regexp = new RegExp(regexp_string, "g");
  let matches = target_string.matchAll(regexp);
  let count = 0;
  while (matches.next().done == false) {
    count += 1;
  }
  return count;
}

//Taken from:
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export default class extends BaseFeatureDataAdapter {
  private config: AnyConfigurationModel;

  private getSubAdapter?: getSubAdapterType;

  public static capabilities = ["hasLocalStats"];

  public constructor(
    config: AnyConfigurationModel,
    getSubAdapter?: getSubAdapterType
  ) {
    super(config);
    this.config = config;
    this.getSubAdapter = getSubAdapter;
  }

  public async configure() {
    // instantiate the sequence adapter
    const sequenceAdapter = readConfObject(this.config, "sequenceAdapter");

    const dataAdapter = await this.getSubAdapter?.(sequenceAdapter);
    if (!dataAdapter) {
      throw new Error("Error getting subadapter");
    }
    return dataAdapter.dataAdapter as BaseFeatureDataAdapter;
  }

  public async getRefNames() {
    const sequenceAdapter = await this.configure();
    return sequenceAdapter.getRefNames();
  }

  public async getRegions(): Promise<NoAssemblyRegion[]> {
    const sequenceAdapter = await this.configure();
    // @ts-ignore
    return sequenceAdapter.getRegions();
  }

  /**
   * Fetch features for a certain region
   * @param param -
   * @returns Observable of Feature objects in the region
   */
  public getFeatures(query: Region, opts: BaseOptions) {
    let windowSize = sanitizeWindowSize(
      readConfObject(this.config, ["windowSize"])
    );
    let windowOverlap = sanitizeWindowOverlap(
      readConfObject(this.config, ["windowOverlap"])
    );
    let windowDelta = windowSize * (windowOverlap / 100.0);
    if (windowDelta == 0) {
      windowDelta = windowSize;
    }
    let calcMode = readConfObject(this.config, ["calculationMode"]);
    let regExpA =
      "[" + escapeRegExp(readConfObject(this.config, ["charactersA"])) + "]";
    let regExpB =
      "[" + escapeRegExp(readConfObject(this.config, ["charactersB"])) + "]";
    let regExpAll =
      "[" + escapeRegExp(readConfObject(this.config, ["charactersAll"])) + "]";

    return ObservableCreate<Feature>(async observer => {
      const sequenceAdapter = await this.configure();
      let { start: queryStart, end: queryEnd } = query;

      //Set the start/end one chunk before/after the current view
      queryStart = Math.max(0, queryStart - windowDelta);
      queryEnd += windowDelta;

      //Quantize queryStart and queryEnd so the windowing behaves intuitively
      queryStart = Math.floor(queryStart / windowDelta) * windowDelta;
      queryEnd = Math.floor(queryEnd / windowDelta) * windowDelta;

      if (queryEnd < 0 || queryStart > queryEnd) {
        observer.complete();
        return;
      }

      const ret = sequenceAdapter.getFeatures(
        { ...query, start: queryStart, end: queryEnd },
        opts
      );
      const [feat] = await ret.pipe(toArray()).toPromise();
      const sequence = feat.get("seq");

      const f = windowSize === 1;
      for (let i = 0; i < sequence.length; i += windowDelta) {
        const seq_chunk = f ? sequence[i] : sequence.slice(i, i + windowSize);

        let n_regExpA = count_regexp(seq_chunk, regExpA);
        let n_regExpB = count_regexp(seq_chunk, regExpB);
        let len = count_regexp(seq_chunk, regExpAll);

        let score = 0;
        if (calcMode === "average") {
          score = (n_regExpA + n_regExpB) / (len || 1);
        } else if (calcMode === "skew") {
          score = (n_regExpA - n_regExpB) / (n_regExpA + n_regExpB || 1);
        }

        const new_simple_feat = new SimpleFeature({
          uniqueId: `${this.id}_${queryStart + i}`,
          start: queryStart + i,
          end: queryStart + i + windowDelta,
          score
        });

        observer.next(new_simple_feat);
      }

      observer.complete();
    });
  }

  /**
   * called to provide a hint that data tied to a certain region
   * will not be needed for the forseeable future and can be purged
   * from caches, etc
   */
  public freeResources(/* { region } */): void {}
}
