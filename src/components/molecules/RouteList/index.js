import React from 'react'
import { MdDeleteOutline, MdMenu } from 'react-icons/md';
import '../../../styles/routeList.css'
import Button from '../../atoms/Button'
const RouteList = (props) => {
  const { markers, removeWaypoint, handleDrag, handleDrop } = props;
  return (
    <aside className='routeListWrapper'>
      <div className='routeListHeader'>
        <h2>Route Builder</h2>
      </div>
      <div className='routeList'>
        {markers
          .sort((a, b) => a.id - b.id)
          .map((mark) => (
            <div
              key={mark.id}
              className='waypointItem'
              draggable={true}
              id={mark.id}
              onDragOver={(e) => e.preventDefault()}
              onDragStart={handleDrag}
              onDrop={handleDrop}
            >
              <div className='waypointContent' id={mark.id}>
                <MdMenu id={mark.id} />
                <p id={mark.id}>{mark.name}</p>
              </div>
              <MdDeleteOutline onClick={() => removeWaypoint(mark.id)} />
            </div>
          ))}
      </div>
      <div className='downloadWrapper'>
        <Button cls='gpxDownloadBtn' text='Download Your Route' />
      </div>
    </aside>
  );
}

export default RouteList