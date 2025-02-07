import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loader = ({ height, width }) => {
  return (
    <div>
      <DotLottieReact
        src="https://lottie.host/e16377d0-e817-4107-ba53-7109faabb2e9/ZnEZlPqmVm.lottie"
        loop
        autoplay
        className="w-24 h-24"
        // className={`w-${width} h-${height}`}
      />
    </div>
  );
};

export default Loader;
