import 'ol/ol.css';
import FullScreen from 'ol/control/FullScreen';
import apply from './mbox-apply';
import Map from 'ol/Map';
import featuresStyle from './data/style.json';
import GeoJSON from 'ol/format/GeoJSON';
import { getMboxLayoutProperty , setMboxLayoutProperty , getMboxLayer, getOLLayer } from './mbox-layer.js';

const map = new Map({ target: 'map' });
window.map = map;

apply(
  map, featuresStyle).then(function (map) {
    const format = new GeoJSON({
      featureProjection: 'EPSG:3857',
      dataProjection: 'EPSG:4326'
      }),
      features = format.readFeatures(window.geojson),
      featTunnuspiste = format.readFeature({
        "type":"Feature",
        "properties": { 'kiinteistotunnuksenEsitysmuoto': features[0].getProperties()['kiinteistotunnuksenEsitysmuoto']},
        "geometry":features[0].getProperties()['kiinteistotunnuksenSijainti']
        })
        ;
      features.push(featTunnuspiste);
        window.featTunnuspiste=featTunnuspiste;
        window.features = features;

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

  window.setMboxLayoutProperty = setMboxLayoutProperty;
  window.getMboxLayoutProperty = getMboxLayoutProperty;
  window.getMboxLayer = getMboxLayer;
  window.getOLLayer = getOLLayer;
  