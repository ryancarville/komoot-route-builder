import React, { useEffect, useState } from "react";
import { unitTypes } from "../../../constants/common"
import Button from "../../atoms/Button"
import '../../../styles/toolBar.css';
import clsx from "clsx"
import logo from '../../../images/logo.png'

const ToolBar = (props) => {
  const { handleUnitType, currUnitType, handleSideBar } = props;
  const [ selectedUnitBtn, setSelectedUnitBtn ] = useState(currUnitType)
  const [showUnits, setShowUnits] = useState(true);
  const [toolBarClass, setToolBarClass] = useState(undefined);

  const handleUnitClick = (unit) => handleUnitType(unit);

  const handleShowSideBar = () => {
    setShowUnits(!showUnits);
    handleSideBar();
  }

  useEffect(() => {
    setSelectedUnitBtn(currUnitType)
  }, [currUnitType])



  useEffect(() => {
    if (showUnits) {
      setToolBarClass('toolBarWrapper');
    } else {
      setToolBarClass('toolBarClose');
    }
  }, [showUnits]);
  return (
    <div className={toolBarClass}>
      <span className={'toolBarLogo'}>
        <img
          src={logo}
          alt={'Komoot Logo'}
          className={'toolBarLogo'}
          onClick={handleShowSideBar}
        />
        <span className={'logoTooltipTxt'}>Toggle Panel</span>
      </span>
      {showUnits && (
        <div className={'untBtnWrapper'}>
          <Button
            cls={clsx([
              'unitBtn',
              selectedUnitBtn === unitTypes.miles && 'selectedUnitBtn'
            ])}
            text={unitTypes.miles}
            onClick={() => handleUnitClick(unitTypes.miles)}
          />
          <Button
            cls={clsx([
              'unitBtn',
              selectedUnitBtn === unitTypes.km && 'selectedUnitBtn'
            ])}
            text={unitTypes.km}
            onClick={() => handleUnitClick(unitTypes.km)}
          />
        </div>
      )}
    </div>
  );
}

export default ToolBar;