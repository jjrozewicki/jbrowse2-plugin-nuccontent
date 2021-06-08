import PluginManager from '@jbrowse/core/PluginManager';
import AdapterClass from './NucContentAdapter';
declare const _default: (pluginManager: PluginManager) => {
    configSchema: import("@jbrowse/core/configuration/configurationSchema").AnyConfigurationSchemaType;
    AdapterClass: typeof AdapterClass;
};
export default _default;
