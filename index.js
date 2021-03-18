import 'ol/ol.css';
import FullScreen from 'ol/control/FullScreen';
import apply from 'ol-mapbox-style';
import Map from 'ol/Map';
import featuresStyle from './data/style.json';
import GeoJSON from 'ol/format/GeoJSON';

const map = new Map({ target: 'map' });
window.map = map;

apply(
  map, featuresStyle).then(function (map) {
    var features = new GeoJSON({
      featureProjection: 'EPSG:3857',
      dataProjection: 'EPSG:4326'
    }).readFeatures(window.geojson);
    const layer = 
    map.getLayers().getArray()[1];
    layer.getSource().addFeatures(features);
    const extent = layer.getSource().getExtent();
    map.getView().fit(extent, {
      size: map.getSize(),
      padding: [50,50,50,50],
      maxZoom: 16
    });
  });


