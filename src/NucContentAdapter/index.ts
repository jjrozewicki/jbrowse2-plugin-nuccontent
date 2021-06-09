import PluginManager from "@jbrowse/core/PluginManager";
import configSchemaF from "./configSchema";
import AdapterClass from "./NucContentAdapter";

export default (pluginManager: PluginManager) => {
  return {
    configSchema: pluginManager.load(configSchemaF),
    AdapterClass
  };
};
