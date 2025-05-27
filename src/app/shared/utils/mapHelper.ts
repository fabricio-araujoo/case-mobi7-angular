export function createGeoCircle(
  center: [number, number],
  radiusInMeters: number,
  points = 64
): GeoJSON.Feature<GeoJSON.Polygon> {
  const [lng, lat] = center;
  const coordinates: [number, number][] = [];

  const distanceX =
    radiusInMeters / (111.32 * 1000 * Math.cos((lat * Math.PI) / 180));
  const distanceY = radiusInMeters / 110574;

  for (let i = 0; i <= points; i++) {
    const angle = (i * 360) / points;
    const theta = (angle * Math.PI) / 180;
    const dx = distanceX * Math.cos(theta);
    const dy = distanceY * Math.sin(theta);

    coordinates.push([lng + dx, lat + dy]);
  }

  return {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [coordinates],
    },
    properties: {},
  };
}
