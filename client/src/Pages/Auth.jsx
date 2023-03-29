import React, { useState } from "react";

//* Import components
import CarouselFood from "../Components/Carousel";
import FormAuth from "../Components/FormAuth";
import Header from "../Components/Header";

function Auth() {
  const [form, setForm] = useState("Login");

  const infoForm = {
    value: form === "Login" ? "login" : "register",
    title: form === "Login" ? "Login" : "Register",
    infoForm1:
      form === "Login" ? "Don't have an account?" : "Already registered?",
    infoForm2: form === "Login" ? "Register!" : "Log in!",
    valueChangeForm: form === "Login" ? "Register" : "Login",
    button: form === "Login" ? "Login" : "Register",
  };

  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col h-screen">
        <Header navbar={false} />
        <div className="flex flex-row px-10 justify-evenly items-center w-full h-5/6">
          <CarouselFood />
          <div className="px-5 py-2 md:p-10 rounded-md bg-third bg-opacity-30 shadow-lg shadow-third">
            <FormAuth info={infoForm} changeForm={setForm} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
