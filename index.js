import 'ol/ol.css';
import FullScreen from 'ol/control/FullScreen';
import apply from 'ol-mapbox-style';
import Map from 'ol/Map';
import featuresStyle from './data/style.json';
import GeoJSON from 'ol/format/GeoJSON';
import { features } from './features';
import { transform } from 'ol/proj';

const api = 'https://beta-paikkatieto.maanmittauslaitos.fi/kiinteisto-avoin/features/v1',
  featType = 'RajamerkinSijaintitiedot';

const map = new Map({ target: 'map' }),
  format = new GeoJSON({
    featureProjection: 'EPSG:3857',
    dataProjection: 'EPSG:4326'
  });


window.map = map;

apply(
  map, featuresStyle).then(function (map) {

    map.on("moveend", (evt) => {
      const
        view = map.getView(),
        layer = map.getLayers().getArray()[1],
        source = layer.getSource(),
        bounds = view.calculateExtent(map.getSize()),
        lb = transform([bounds[0], bounds[1]], 'EPSG:3857', 'EPSG:4326'),
        rt = transform([bounds[2], bounds[3]], 'EPSG:3857', 'EPSG:4326'),
        bbox = [lb[0], lb[1], rt[0], rt[1]];

      features((fc) => {
        source.addFeatures(format.readFeatures(fc));
        const extent = source.getExtent();
        return true;
      }, api, featType, {
        limit: 200,
        bbox: bbox.join(',')
      });
    });
  });
