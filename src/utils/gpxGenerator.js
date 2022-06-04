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
    <?xml version="1.0" encoding="UTF-8"?>
    <gpx
      version="1.1"
      creator="Komoot - http://www.komoot.com"

      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns="http://www.topografix.com/GPX/1/1"
      xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd"
      xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1"
    >
      <metadata
        name="${title}"
        time=${creationTime}
      >
        ${wpts.join("")}
      </metadata>
    </gpx>
  `;
  return gpx;
}