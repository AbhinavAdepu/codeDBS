import React from "react";
import Menu from './Menu';
import Blanket from './Blanket';
function Dropdown({ children, isOpen, target, onClose }) {
  return (
    <div css={{ position: "absolute" }}>
      {target}
      {isOpen ? <Menu>{children}</Menu> : null}
      {isOpen ? <Blanket onClick={onClose} /> : null}
    </div>
  );
}

export default Dropdown;
