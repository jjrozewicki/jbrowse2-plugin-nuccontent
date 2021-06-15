# jbrowse2-plugin-nuccontent

This NucContent plugin for JBrowse2 is designed to allow easy calculation of statistics like GC content, but is also customizable enough for calculating other kinds of statistics (e.g. soft-masked nucleotides).

## Install

### For use in [JBrowse Web](https://jbrowse.org/jb2/docs/quickstart_web)

Simply add the appropriate plugin and track settings to your configuration (documented below).

### For use in [`@jbrowse/react-linear-view`](https://www.npmjs.com/package/@jbrowse/react-linear-genome-view)

Coming soon.

## Usage

```
"plugins": [
  {
    "name": "NucContent",
    "url": "dist/jbrowsepluginnuccontent.umd.development.js"
  }
}

### Example Track Config

This plugin takes a standard Sequence Adapter configuration to load the sequence data that will be used for statistics. This could be the sequence files used for the main assembly, but could also be other kinds of sequence data that are mapped to the main assembly.

```
"tracks": [
  {
    "name": "GC Content (Dynamic)",
    "trackId": "gc_content_dynamic",
    "type": "NucContentTrack",
    "assemblyNames": [
      "SL4.0"
    ],
    "adapter": {
      "type": "NucContentAdapter",
      "sequenceAdapter": {
        "type": "BgzipFastaAdapter",
        "faiLocation": {
          "uri": "./sample_config/S_lycopersicum_chromosomes.4.00.fa.gz.fai"
        },
        "fastaLocation": {
          "uri": "./sample_config/S_lycopersicum_chromosomes.4.00.fa.gz"
        },
        "gziLocation": {
          "uri": "./sample_config/S_lycopersicum_chromosomes.4.00.fa.gz.gzi"
        }
      },
      "charactersA": "Gg",
      "charactersB": "Cc",
      "charactersAll": "AaTtGgCc",
      "windowSize": 10000,
      "windowOverlap": 0
    },
    "displays": [
      {
        "displayId": "gc_content_dynamic-NucContentDisplay",
        "maxScore": 0.7,
        "minScore": 0.3,
        "renderers": {
          "DensityRenderer": {
            "type": "DensityRenderer"
          },
          "LinePlotRenderer": {
            "type": "LinePlotRenderer"
          },
          "XYPlotRenderer": {
            "type": "XYPlotRenderer"
          }
        },
        "type": "NucContentDisplay"
      }
    ]
  }
]
```

## Bug Reports/Issues/Contributions

Bug reports and issues for this plugin can be submitted via this Github repository.

Pull requests that include documentation of improvements/fixes will be considered, but may not be immediately accepted.

## Development

Dependencies for this project can be downloaded through `yarn`:

* `npx yarn`

This project can be built with the command

* `npx yarn build`
