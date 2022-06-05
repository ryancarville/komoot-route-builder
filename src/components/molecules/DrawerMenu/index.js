import React, { useState } from "react";
import '../../../styles/drawerMenu.css'
import { MdMenu } from 'react-icons/md';
import clsx from "clsx";
import PropTypes from 'prop-types';

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
          <span className={'drawerMenuToolTipTxt'}>
            {isDrawerOpen ? 'Close Panel' : 'Open Panel'}
          </span>
        </div>
      </span>
      <div
        className={clsx([
          'drawerMenuWrapper',
          isDrawerOpen ? 'drawerMenuWrapperOpen' : 'drawerMenuWrapperClosed'
        ])}
      >
        {children}
      </div>
    </aside>
  );
}

DrawerMenu.defaultProps = {
  menuIcon: undefined,
  children: React.createElement('div')
}

DrawerMenu.propTypes = {
  menuIcon: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element)
}

export default DrawerMenu;