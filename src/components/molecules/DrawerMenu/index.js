import React, { useState } from "react";
import '../../../styles/drawerMenu.css'
import { MdMenu } from 'react-icons/md';

// sliding drawer component
const DrawerMenu = (props)=> {
  const {menuIcon, children} = props;
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const handleDrawerMenuAction = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <aside>
      <span className={'drawerMenuToolTip'}>
        <div className={'drawerMenuIconWrapper'}>
          <img
            className={'drawerMenuIcon'}
            src={menuIcon ? menuIcon : MdMenu}
            alt={'drawerMenuIcon'}
            onClick={() => handleDrawerMenuAction()}
          />
          <span className={'drawerMenuToolTipTxt'}>{isDrawerOpen ? 'Close Panel' : 'Open Panel'}</span>
        </div>
      </span>
      <div className={isDrawerOpen ? 'drawerMenuWrapperOpen' : 'drawerMenuWrapperClosed'}>
        {children}
      </div>
    </aside>
  );
}

export default DrawerMenu;