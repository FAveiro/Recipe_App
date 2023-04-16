import React from "react";

import {MagnifyingGlass} from 'react-loader-spinner'


function Loading() {
  return (
    <div className="flex justify-center items-center">
      <MagnifyingGlass
        visible={true}
        height="200"
        width="60"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#ff0076"
      />
    </div>
  );
}

export default Loading;
