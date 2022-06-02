import React, {useRef} from "react";

const EditableElement = (props) => {
  const { onChange } = props;
  const element = useRef();
  let elements = React.Children.toArray(props.children);

  if (elements.length > 1) {
    throw Error("Can't have more than one child");
  }

  const handleChange = () => {
    const value = element.current?.value || element.current?.innerText;
    onChange({ id: +element.current.id, name: value });
  };

  // useEffect(() => {
  //   const value = element.current?.value || element.current?.innerText;
  //   onChange({id: +element.current.id, name: value});
  // }, [onChange]);

  elements = React.cloneElement(elements[0], {
    contentEditable: true,
    suppressContentEditableWarning: true,
    ref: element,
    onKeyUp: handleChange
  });
  return elements;
};

export default EditableElement;