const globals = require('@jbrowse/core/ReExports/list').default
const { createJBrowsePluginTsdxConfig } = require('@jbrowse/development-tools')
const nodeBuiltins = require('rollup-plugin-node-builtins')
const nodeGlobals = require('rollup-plugin-node-globals')

module.exports = {
  rollup(config, options) {
    const newConfig = createJBrowsePluginTsdxConfig(config, options, globals)
    if (options.format === 'umd') {
      newConfig.plugins.push(nodeBuiltins(), nodeGlobals())
    }
    return newConfig
  },
}
