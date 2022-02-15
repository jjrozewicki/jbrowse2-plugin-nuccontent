import AdapterType from "@jbrowse/core/pluggableElementTypes/AdapterType";
import TrackType from "@jbrowse/core/pluggableElementTypes/TrackType";
import Plugin from "@jbrowse/core/Plugin";
import PluginManager from "@jbrowse/core/PluginManager";
import {
  createBaseTrackConfig,
  createBaseTrackModel
} from "@jbrowse/core/pluggableElementTypes/models";
import { ConfigurationSchema } from "@jbrowse/core/configuration";
import { FileLocation } from '@jbrowse/core/util/types'
import { AdapterGuesser, TrackTypeGuesser } from "@jbrowse/core/util/tracks";

import NucContentAdapter from "./NucContentAdapter";
import {
  configSchemaFactory as nucContentDisplayConfigSchemaFactory,
  stateModelFactory as nucContentDisplayModelFactory
} from "./NucContentDisplay";

export default class NucContentPlugin extends Plugin {
  name = "NucContentPlugin";

  install(pluginManager: PluginManager) {
    pluginManager.addTrackType(() => {
      const configSchema = ConfigurationSchema(
        "NucContentTrack",
        {},
        { baseConfiguration: createBaseTrackConfig(pluginManager) }
      );
      return new TrackType({
        name: "NucContentTrack",
        configSchema,
        stateModel: createBaseTrackModel(
          pluginManager,
          "NucContentTrack",
          configSchema
        )
      });
    });

    pluginManager.addAdapterType(
      () =>
        new AdapterType({
          name: "NucContentAdapter",
          ...pluginManager.load(NucContentAdapter)
        })
    );

    pluginManager.addToExtensionPoint(
      'Core-guessAdapterForLocation',
      (adapterGuesser: AdapterGuesser) => {
        return (
          file: FileLocation,
          index?: FileLocation,
          adapterHint?: string,
        ) => {
          const adapterName = 'NucContentAdapter'

          if (adapterHint === adapterName) {
            return {
              type: adapterName,
              ieqLocation: file,
            }
          }
          return adapterGuesser(file, index, adapterHint)
        }
      },
    )

    pluginManager.addToExtensionPoint(
      'Core-guessTrackTypeForLocation',
      (trackTypeGuesser: TrackTypeGuesser) => {
        return (adapterName: string) => {
          if (adapterName === 'NucContentAdapter') {
            return 'NucContentTrack'
          }
          return trackTypeGuesser(adapterName)
        }
      },
    )

    const DisplayType =
      pluginManager.lib["@jbrowse/core/pluggableElementTypes/DisplayType"];
    const WigglePlugin = pluginManager.getPlugin(
      "WigglePlugin"
    ) as import("@jbrowse/plugin-wiggle").default;
    const { LinearWiggleDisplayReactComponent } = WigglePlugin.exports;

    pluginManager.addDisplayType(() => {
      const configSchema = nucContentDisplayConfigSchemaFactory(pluginManager);
      return new DisplayType({
        name: "NucContentDisplay",
        configSchema,
        stateModel: nucContentDisplayModelFactory(pluginManager, configSchema),
        trackType: "NucContentTrack",
        viewType: "LinearGenomeView",
        ReactComponent: LinearWiggleDisplayReactComponent
      });
    });
  }
}
