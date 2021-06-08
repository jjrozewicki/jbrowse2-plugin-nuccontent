import { BaseFeatureDataAdapter, BaseOptions } from '@jbrowse/core/data_adapters/BaseAdapter';
import { AnyConfigurationModel } from '@jbrowse/core/configuration/configurationSchema';
import { getSubAdapterType } from '@jbrowse/core/data_adapters/dataAdapterCache';
import { Region, NoAssemblyRegion } from '@jbrowse/core/util/types';
import { Feature } from '@jbrowse/core/util/simpleFeature';
export default class extends BaseFeatureDataAdapter {
    private config;
    private getSubAdapter?;
    static capabilities: string[];
    constructor(config: AnyConfigurationModel, getSubAdapter?: getSubAdapterType);
    configure(): Promise<BaseFeatureDataAdapter>;
    getRefNames(): Promise<string[]>;
    getRegions(): Promise<NoAssemblyRegion[]>;
    /**
     * Fetch features for a certain region
     * @param param -
     * @returns Observable of Feature objects in the region
     */
    getFeatures(query: Region, opts: BaseOptions): import("rxjs").Observable<Feature>;
    /**
     * called to provide a hint that data tied to a certain region
     * will not be needed for the forseeable future and can be purged
     * from caches, etc
     */
    freeResources(): void;
}
