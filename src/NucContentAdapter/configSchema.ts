import { types } from 'mobx-state-tree'
import PluginManager from '@jbrowse/core/PluginManager'
import { ConfigurationSchema } from '@jbrowse/core/configuration'

export default (pluginManager: PluginManager) => {
  return ConfigurationSchema(
    'NucContentAdapter',
    {
      sequenceAdapter:
        pluginManager.pluggableConfigSchemaType('adapter'),
      windowSize: {
        type: 'number',
        defaultValue: 1000,
        description: 'size of the region to calculate average over',
      },
      gRegExp: {
        type: 'string',
        defaultValue: '[Gg]',
        description: 'regular expression to use for counting G nucleotides',
      },
      cRegExp: {
        type: 'string',
        defaultValue: '[Cc]',
        description: 'regular expression to use for counting C nucleotides',
      },
      ValidNucRegExp: {
        type: 'string',
        defaultValue: '[AaTtGgCc]',
        description: 'regular expression to use for counting non-GC nucleotides',
      },
      calculationMode: {
        type: 'stringEnum',
        defaultValue: 'average',
        model: types.enumeration('Calculation mode', [
          'average',
          'skew',
        ]),
        description: 'type of calculation to use for nucleotide content',
      },
    },
    { explicitlyTyped: true },
  )
}
