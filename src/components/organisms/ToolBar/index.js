import React, { useState } from "react";
import { unitTypes } from "../../../constants/common"
import Button from "../../atoms/Button"
import '../../../styles/toolBar.css';
import clsx from "clsx"

const ToolBar = (props) => {
  const { handleUnitType } = props;
  const [ selectedUnitBtn, setSelectedUnitBtn ] = useState(unitTypes.miles)

  const handleUnitClick = (unit) => {
    setSelectedUnitBtn(unit);
    handleUnitType(unit);
  }
  return (
    <div className={'toolBarWrapper'}>
      <img
        src={'/logo192.png'}
        alt={'Komoot Logo'}
        style={{ width: '70px', height: '70px', objectFit: 'contain' }}
      />
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
    </div>
  );
}

export default ToolBar;