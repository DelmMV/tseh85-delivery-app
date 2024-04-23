export function createMapLink(address, mapType) {
  if (mapType === 'yandex') {
    return `https://yandex.ru/maps/?text=${encodeURIComponent(address)}`;
  } if (mapType === '2gis') {
    return `https://2gis.ru/search/${encodeURIComponent(address)}`;
  }
  return null;
}
