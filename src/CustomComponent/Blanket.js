import React from "react";
function Blanket({ props }) {
  return (
    <div
      css={{
        bottom: 0,
        left: 0,
        top: 0,
        right: 0,
        position: "fixed",
        zIndex: 1
      }}
      {...props}
    />
  );
}
export default Blanket;
