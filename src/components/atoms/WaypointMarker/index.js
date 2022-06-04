import L from 'leaflet';
import waypointMarker1 from '../../../images/waypointMarkers/waypoint-marker-1.png';
import waypointMarker2 from '../../../images/waypointMarkers/waypoint-marker-2.png';
import waypointMarker3 from '../../../images/waypointMarkers/waypoint-marker-3.png';
import waypointMarker4 from '../../../images/waypointMarkers/waypoint-marker-4.png';
import waypointMarker5 from '../../../images/waypointMarkers/waypoint-marker-5.png';
import waypointMarker6 from '../../../images/waypointMarkers/waypoint-marker-6.png';
import waypointMarker7 from '../../../images/waypointMarkers/waypoint-marker-7.png';
import waypointMarker8 from '../../../images/waypointMarkers/waypoint-marker-8.png';
import waypointMarker9 from '../../../images/waypointMarkers/waypoint-marker-9.png';
import waypointMarker10 from '../../../images/waypointMarkers/waypoint-marker-10.png';
import waypointMarker11 from '../../../images/waypointMarkers/waypoint-marker-11.png';
import waypointMarker12 from '../../../images/waypointMarkers/waypoint-marker-12.png';
import waypointMarker13 from '../../../images/waypointMarkers/waypoint-marker-13.png';
import waypointMarker14 from '../../../images/waypointMarkers/waypoint-marker-14.png';
import waypointMarker15 from '../../../images/waypointMarkers/waypoint-marker-15.png';
import waypointMarker16 from '../../../images/waypointMarkers/waypoint-marker-16.png';
import waypointMarker17 from '../../../images/waypointMarkers/waypoint-marker-17.png';
import waypointMarker18 from '../../../images/waypointMarkers/waypoint-marker-18.png';
import waypointMarker19 from '../../../images/waypointMarkers/waypoint-marker-19.png';
import waypointMarkerDefault from '../../../images/waypointMarkers/waypoint-marker-default.png';

// waypoint marker icons
const waypointMarker = (attr) => {

  const marker = () => {
    switch (attr) {
      case 1:
        return waypointMarker1;
      case 2:
        return waypointMarker2;
      case 3:
        return waypointMarker3;
      case 4:
        return waypointMarker4;
      case 5:
        return waypointMarker5;
      case 6:
        return waypointMarker6;
      case 7:
        return waypointMarker7;
      case 8:
        return waypointMarker8;
      case 9:
        return waypointMarker9;
      case 10:
        return waypointMarker10;
      case 11:
        return waypointMarker11;
      case 12:
        return waypointMarker12;
      case 13:
        return waypointMarker13;
      case 14:
        return waypointMarker14;
      case 15:
        return waypointMarker15;
      case 16:
        return waypointMarker16;
      case 17:
        return waypointMarker17;
      case 18:
        return waypointMarker18;
      case 19:
        return waypointMarker19;
      default:
        return waypointMarkerDefault;
    }
  }
  return L.icon({
    iconUrl: marker(),
    iconSize: [48, 55],
    iconAnchor: [25, 52],
    popupAnchor: [-2, -50]
  });
}

export default  waypointMarker;