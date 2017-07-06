var fs = require('fs');
var ndjson = require('ndjson')
var ogr2ogr = require('ogr2ogr');

var inputFile = __dirname + '/' + process.argv[2];
var outputFile = __dirname + '/out.geojson';
var start = '{ "type": "FeatureCollection", "features": [';
var comma = '';
fs.appendFileSync(outputFile, start, {encoding: 'utf8'});

fs.createReadStream(inputFile)
  .pipe(ndjson.parse())
  .on('data', function(obj) {
    var feature = {};
    if (obj.geometry) {
      feature = obj;
      fs.appendFileSync(outputFile, comma + JSON.stringify(feature), {encoding: 'utf8'});
      if (!comma) comma = ',';
    } else if (obj.longitude && obj.latitude) {
      feature.type = "Feature";
      feature.properties = obj;
      feature.geometry = {
        "type": "Point",
        "coordinates": [
          obj.longitude,
          obj.latitude
        ]
      };
      fs.appendFileSync(outputFile, comma + JSON.stringify(feature), {encoding: 'utf8'});
      if (!comma) comma = ',';
    }
    // console.log(feature);
  })
  .on('end', function () {
    var end = "]}";
    fs.appendFileSync(outputFile, end, {encoding: 'utf8'});
    var shapefile = ogr2ogr(outputFile)
                    .format('ESRI Shapefile')
                    .timeout(1000000)
                    .skipfailures()
                    .stream();
    shapefile.pipe(fs.createWriteStream(__dirname + '/out.zip'));
  })
