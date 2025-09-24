import React from "react";
import { RotatingLines } from "react-loader-spinner";

function AuthLoader({ size = 25, color = "#fff" }) {
  return (
    <div className="flex items-center justify-center">
      <RotatingLines
        strokeColor={color} // white by default to match button text
        strokeWidth="4"
        animationDuration="0.75"
        width={size}
        height={size}
        visible={true}
        ariaLabel="loading"
      />
    </div>
  );
}

export default AuthLoader;
