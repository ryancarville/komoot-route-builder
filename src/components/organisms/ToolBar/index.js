import React, { useEffect, useState } from "react";
import { unitTypes } from "../../../constants/common";
import Button from "../../atoms/Button";
import "../../../styles/toolBar.css";
import clsx from "clsx";

// tool bar functional component
const ToolBar = (props) => {
  const { handleUnitType, currUnitType } = props;
  const [ selectedUnitBtn, setSelectedUnitBtn ] = useState(currUnitType);

  const handleUnitClick = (unit) => handleUnitType(unit);

  useEffect(() => {
    setSelectedUnitBtn(currUnitType)
  }, [currUnitType]);

  return (
    <div className={"toolBarWrapper"}>
      <div className={"unitBar"}>
        <Button
          cls={clsx([
            "unitBtn",
            selectedUnitBtn === unitTypes.miles && "selectedUnitBtn"
          ])}
          text={unitTypes.miles}
          onClick={() => handleUnitClick(unitTypes.miles)}
        />
        <Button
          cls={clsx([
            "unitBtn",
            selectedUnitBtn === unitTypes.km && "selectedUnitBtn"
          ])}
          text={unitTypes.km}
          onClick={() => handleUnitClick(unitTypes.km)}
        />
      </div>
    </div>
  );
}

export default ToolBar;