# ndjson-to-shape

Helper script to read a line delimited json or geojson, parse it to create a valid geojson FeatureCollection and an ESRI Shapefile

## Install

```
$ git clone git@github.com:oini/ndjson-to-shape.git
$ cd ndjson-to-shape
$ npm install
```

## Run

```
$ node index.js <PATH TO INPUT LINE DELIMITED JSON/GEOJSON FILE>
```

## Outputs

- **out.geojson** - The resultant GeoJSON FeatureCollection
- **out.zip** - Zip containing resultant ESRI Shapefile
