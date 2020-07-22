import React from "react";
function Svg({ p }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      focusable="false"
      role="presentation"
      {...p}
    />
  );
}
export default Svg;
