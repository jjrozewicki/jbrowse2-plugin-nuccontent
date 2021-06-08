import AdapterType from '@jbrowse/core/pluggableElementTypes/AdapterType'
import Plugin from '@jbrowse/core/Plugin'
import PluginManager from '@jbrowse/core/PluginManager'

import NucContentAdapter from './NucContentAdapter'
import {
  configSchemaFactory as nucContentDisplayConfigSchemaFactory,
  stateModelFactory as nucContentDisplayModelFactory,
} from "./NucContentDisplay";

export default class NucContentPlugin extends Plugin {
  name = 'NucContentPlugin'

  install(pluginManager: PluginManager) {
    pluginManager.addAdapterType(
      () =>
        new AdapterType({
          name: 'NucContentAdapter',
          ...pluginManager.load(NucContentAdapter),
        }),
    )

    const DisplayType =
      pluginManager.lib["@jbrowse/core/pluggableElementTypes/DisplayType"];
    const WigglePlugin = pluginManager.getPlugin(
      "WigglePlugin",
    ) as import("@jbrowse/plugin-wiggle").default;
    const { LinearWiggleDisplayReactComponent } = WigglePlugin.exports;

    pluginManager.addDisplayType(() => {
      const configSchema = nucContentDisplayConfigSchemaFactory(pluginManager);
      return new DisplayType({
        name: "NucContentDisplay",
        configSchema,
        stateModel: nucContentDisplayModelFactory(
          pluginManager,
          configSchema,
        ),
        trackType: "FeatureTrack",
        viewType: "LinearGenomeView",
        ReactComponent: LinearWiggleDisplayReactComponent,
      });
    });

  }
}


