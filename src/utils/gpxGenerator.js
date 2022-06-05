export const gpxGenerator = (title, data) => {
  const date = new Date(Date.now());
  const creationTime = date.toISOString();
  const wpts = data.map((point) => {
    const { lat, lng, name } = point;
    return `
      <wpt lat="${lat}" lon="${lng}">
        <time>${creationTime}</time>
        <name>${name}</name>
      </wpt>`;
  });

  const gpx = `
    <gpx
      version="1.1"
      creator="Komoot - http://www.komoot.com"
      xmlns#"http://www.topografix.com/GPX/1/1"
      xmlns:gpxx#"http://www.garmin.com/xmlschemas/GpxExtensions/v3"
      xmlns:gpxtpx#"http://www.garmin.com/xmlschemas/TrackPointExtension/v1"
      xmlns:xsi#"http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation#"http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd">
    >
      <metadata
        name="${title}"
        time=${creationTime}
      >
        ${wpts.join('')}
      </metadata>
    </gpx>
  `;
  return gpx;
}