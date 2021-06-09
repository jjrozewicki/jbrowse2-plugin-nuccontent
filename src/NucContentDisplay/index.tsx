//Extends from LinearGenomeView so we can add menu items
//https://github.com/GMOD/jbrowse-components/issues/2006
//
import React, { useState } from "react";

import PluginManager from "@jbrowse/core/PluginManager";
import { ConfigurationSchema } from "@jbrowse/core/configuration";
import { AnyConfigurationModel } from "@jbrowse/core/configuration/configurationSchema";
import { getSession } from "@jbrowse/core/util";
import { types } from "mobx-state-tree";

import CloseIcon from "@material-ui/icons/Close";

import { defaultWindowOverlap, sanitizeWindowOverlap } from "../NucContentAdapter/configSchema";
import { defaultWindowSize, sanitizeWindowSize } from "../NucContentAdapter/configSchema";
import { defaultCalculationMode } from "../NucContentAdapter/configSchema";

export function configSchemaFactory(pluginManager: PluginManager) {
  const LGVPlugin = pluginManager.getPlugin(
    "LinearGenomeViewPlugin"
  ) as import("@jbrowse/plugin-linear-genome-view").default;
  const { baseLinearDisplayConfigSchema } = LGVPlugin.exports;

  return ConfigurationSchema(
    "NucContentDisplay",
    {
      autoscale: {
        type: "stringEnum",
        defaultValue: "local",
        model: types.enumeration("Autoscale type", [
          "global",
          "local",
          "globalsd",
          "localsd",
          "zscore"
        ]),
        description:
          "global/local using their min/max values or w/ standard deviations (globalsd/localsd)"
      },
      minScore: {
        type: "number",
        defaultValue: Number.MIN_VALUE,
        description: "minimum value for the y-scale"
      },
      maxScore: {
        type: "number",
        description: "maximum value for the y-scale",
        defaultValue: Number.MAX_VALUE
      },
      numStdDev: {
        type: "number",
        description:
          "number of standard deviations to use for autoscale types globalsd or localsd",
        defaultValue: 3
      },
      scaleType: {
        type: "stringEnum",
        model: types.enumeration("Scale type", ["linear", "log"]), // todo zscale
        description: "The type of scale to use",
        defaultValue: "linear"
      },
      inverted: {
        type: "boolean",
        description: "draw upside down",
        defaultValue: false
      },
      defaultRendering: {
        type: "stringEnum",
        model: types.enumeration("Rendering", ["density", "xyplot", "line"]),
        defaultValue: "xyplot"
      }
    },
    { baseConfiguration: baseLinearDisplayConfigSchema, explicitlyTyped: true }
  );
}

export function stateModelFactory(
  pluginManager: PluginManager,
  configSchema: any
) {
  const WigglePlugin = pluginManager.getPlugin(
    "WigglePlugin"
  ) as import("@jbrowse/plugin-wiggle").default;
  const { linearWiggleDisplayModelFactory } = WigglePlugin.exports;

  return types
    .compose(
      "NucContentDisplay",
      linearWiggleDisplayModelFactory(pluginManager, configSchema),
      types.model({
        type: types.literal("NucContentDisplay")
      })
    )
    .views(self => {
      const { composedTrackMenuItems } = self;
      return {
        get trackMenuItems() {
          const new_menu_items = [
            {
              label: "NucContent settings",
              onClick: () => {
                //@ts-ignore
                getSession(self).setDialogComponent(SetWindowDlg, {
                  model: self
                });
              }
            }
          ];
          return [...composedTrackMenuItems, ...new_menu_items];
        }
      };
    });

  function SetWindowDlg(props: {
    model: {
      parentTrack: {
        configuration: AnyConfigurationModel;
      };
      adapterConfig: {
        calculationMode: string;
        windowSize: number;
        windowOverlap: number;
      };
    };
    handleClose: () => void;
  }) {
    const { makeStyles } = pluginManager.jbrequire("@material-ui/core/styles");
    const classes = makeStyles((theme: any) => ({
      root: {},
      closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
      }
    }));
    const { model, handleClose } = props;
    const { Button } = pluginManager.jbrequire("@material-ui/core");
    const { Dialog } = pluginManager.jbrequire("@material-ui/core");
    const { DialogContent } = pluginManager.jbrequire("@material-ui/core");
    const { DialogTitle } = pluginManager.jbrequire("@material-ui/core");
    const { Divider } = pluginManager.jbrequire("@material-ui/core");
    const { TextField } = pluginManager.jbrequire("@material-ui/core");
    const { Typography } = pluginManager.jbrequire("@material-ui/core");
    const { IconButton } = pluginManager.jbrequire("@material-ui/core");
    const { MenuItem } = pluginManager.jbrequire("@material-ui/core");

    //adapterConfig doesn't have default values due to getSnapshot so we have to guard against that
    const current_window_size = model.adapterConfig.windowSize || defaultWindowSize;
    const [window_size, set_window_size] = useState( current_window_size.toString() );

    const current_window_overlap = model.adapterConfig.windowOverlap || defaultWindowOverlap;
    const [window_overlap, set_window_overlap] = useState( current_window_overlap.toString() );

    const current_calculation_mode = model.adapterConfig.calculationMode || defaultCalculationMode;
    const [calculation_mode, set_calculation_mode] = useState( current_calculation_mode );

    return (
      <Dialog open onClose={handleClose}>
        <DialogTitle>
          NucContent Settings
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ overflowX: "hidden" }}>
          <div className={classes.root}>
            <Typography>Window size: </Typography>
            <TextField
              value={window_size}
              onChange={function(event: Event) {
                const target = event.target as HTMLInputElement;
                if (target.value == "") {
                  set_window_size(target.value);
                } else {
                  set_window_size(sanitizeWindowSize(target.value).toString());
                }
              }}
              placeholder="Enter window size"
            />

            <Typography>Window overlap (in percent): </Typography>
            <TextField
              value={window_overlap}
              onChange={function(event: Event) {
                const target = event.target as HTMLInputElement;
                if (target.value == "") {
                  set_window_overlap(target.value);
                } else {
                  set_window_overlap(sanitizeWindowOverlap(target.value).toString());
                }
              }}
              placeholder="Enter window overlap"
            />

            <Typography>Calculation mode: </Typography>
            <TextField
              select
              style={{ marginRight: 20 }}
              value={calculation_mode}
              onChange={function(event: Event) {
                const target = event.target as HTMLInputElement;
                set_calculation_mode(target.value);
              }}
            >
              <MenuItem key="average" value="average">Average</MenuItem>
              <MenuItem key="skew" value="skew">Skew</MenuItem>
            </TextField>

            <Divider
              style={{ marginTop: 5, marginBottom: 5}}
              light />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={() => {
                model.adapterConfig.windowOverlap = sanitizeWindowOverlap(
                  window_overlap
                );
                model.adapterConfig.windowSize = sanitizeWindowSize(
                  window_size
                );
                model.adapterConfig.calculationMode = calculation_mode;
                model.parentTrack.configuration.setSubschema(
                  "adapter",
                  model.adapterConfig
                );
                handleClose();
              }}
            >
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

export type NucContentDisplayModel = ReturnType<typeof stateModelFactory>;
