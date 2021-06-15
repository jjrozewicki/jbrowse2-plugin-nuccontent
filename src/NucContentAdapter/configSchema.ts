import { types } from "mobx-state-tree";
import PluginManager from "@jbrowse/core/PluginManager";
import { ConfigurationSchema } from "@jbrowse/core/configuration";

export const defaultWindowSize = 1000;
export const defaultWindowOverlap = 0;
export const defaultCharactersA = "Gg";
export const defaultCharactersB = "Cc";
export const defaultCharactersAll = "AaTtGgCc";
export const defaultCalculationMode = "average";

export default (pluginManager: PluginManager) => {
  return ConfigurationSchema(
    "NucContentAdapter",
    {
      sequenceAdapter: pluginManager.pluggableConfigSchemaType("adapter"),
      windowSize: {
        type: "integer",
        defaultValue: defaultWindowSize,
        description: "size of the region to calculate average over"
      },
      windowOverlap: {
        type: "integer",
        defaultValue: defaultWindowOverlap,
        description: "percent to overlap regions by"
      },
      charactersA: {
        type: "string",
        defaultValue: defaultCharactersA,
        description: "which characters to count for group A"
      },
      charactersB: {
        type: "string",
        defaultValue: defaultCharactersB,
        description: "which characters to count for group B"
      },
      charactersAll: {
        type: "string",
        defaultValue: defaultCharactersAll,
        description: "list of all valid characters"
      },
      calculationMode: {
        type: "stringEnum",
        defaultValue: defaultCalculationMode,
        model: types.enumeration("Calculation mode", ["average", "skew"]),
        description: "type of calculation to use for statistics"
      }
    },
    { explicitlyTyped: true }
  );
};

export function sanitizeWindowSize(value: any): number {
  value = parseInt(value);

  if (isNaN(value)) {
    return defaultWindowSize;
  }

  if (value < 0) {
    value = Math.abs(value);
  }

  if (value < 1) {
    value = 1;
  }

  return value;
}

export function sanitizeWindowOverlap(value: any): number {
  value = parseInt(value);

  if (isNaN(value)) {
    return defaultWindowOverlap;
  }

  if (value < 0) {
    value = Math.abs(value);
  }

  if (value >= 100) {
    value = 99;
  }

  return value;
}
