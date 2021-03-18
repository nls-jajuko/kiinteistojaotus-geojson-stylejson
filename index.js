import 'ol/ol.css';
import FullScreen from 'ol/control/FullScreen';
import apply from 'ol-mapbox-style';
import Map from 'ol/Map';
import featuresStyle from './data/152555966.json';

const map = new Map({ target: 'map' });

apply( 
  map, featuresStyle).then(function (map) {
    map.addControl(new FullScreen());
});


