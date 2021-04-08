import TileLayer from 'ol/layer/Tile';

export function getOLLayer(map, layerId) {
    const layers = map.getLayers().getArray();
    for (let i = 0, ii = layers.length; i < ii; ++i) {
      const mapboxLayers = layers[i].get('mapbox-layers');
      if (mapboxLayers && mapboxLayers.indexOf(layerId) !== -1) {
        return layers[i];
      }
    }
  }
  
export function getMboxLayer(map, layerId) {
    const layers = map.getLayers().getArray();
    for (let i = 0, ii = layers.length; i < ii; ++i) {
      const mapboxLayers = layers[i].get('mapbox-layer-style');
      if (mapboxLayers && mapboxLayers.length) {
        for (let j = 0, jj = mapboxLayers.length; j < jj; ++j) {
          if (mapboxLayers[j].id === layerId) {
            return mapboxLayers[j];
          }
        }
      }
    }
  }


  const compareObjects = (a, b) => {
    if (a === b) return true;
   
    if (typeof a != 'object' || typeof b != 'object' || a == null || b == null) return false;
   
    let keysA = Object.keys(a), keysB = Object.keys(b);
   
    if (keysA.length != keysB.length) return false;
   
    for (let key of keysA) {
      if (!keysB.includes(key)) return false;
   
      if (typeof a[key] === 'function' || typeof b[key] === 'function') {
        if (a[key].toString() != b[key].toString()) return false;
      } else {
        if (!compareObjects(a[key], b[key])) return false;
      }
    }
   
    return true;
   }

  export function setMboxLayoutProperty(map, layerId, name, value) {
    const layer = getOLLayer(map,layerId);
    const glLayer = getMboxLayer(map, layerId);
    const oldValue = (glLayer.layout || {})[name];
    if (compareObjects(oldValue, value)) {
      return;
    }
  
    if (name === 'visibility' && layer instanceof TileLayer) {
      layer.setVisible(value !== 'none');
    }
  
    if (!glLayer.layout) {
      glLayer.layout = {};
    }
    glLayer.layout[name] = value;
  
    layer.changed();
}

export function getMboxLayoutProperty(map, layerId, name) {
    const layer = getOLLayer(map,layerId);
    const glLayer = getMboxLayer(map, layerId);
    return (glLayer.layout || {})[name];
 
}
