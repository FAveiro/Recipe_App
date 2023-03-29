import React from "react";

//* Components
import Header from "../Components/Header";

function Home() {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col h-screen">
        <Header navbar={true}/>
      </div>
    </div>
  );
}

export default Home;
