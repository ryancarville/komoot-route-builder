import L from 'leaflet';
import waypointMarkerIcon from '../../../images/waypoint-marker.png';
import '../../../styles/common.css'

const waypointMarker = (attr) => {
  // const customWaypointMaker = (
  //   <span className={'customMarker'}>
  //     <span>{attr}</span>
  //     <img src={waypointMarkerIcon} alt={`waypoint-${attr}`} />
  //   </span>
  // )

  return L.icon({
    iconUrl: waypointMarkerIcon,
    iconSize: [48, 55],
    iconAnchor: [25, 52],
    popupAnchor: [-2, -50]
    // shadowUrl: waypointMakerShadow,
    // shadowSize: [68, 95],
    // shadowAnchor: [22, 84]
  });
}

export default  waypointMarker;