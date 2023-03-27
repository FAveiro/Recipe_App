import React, { useState, useEffect } from "react";

//* Import validation
import { useFormik } from "formik";
import { SignUpSchema, LoginSchema } from "../Validations/AuthValidation";

//* Import axios and cookie
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastSucess } from "./Toast";
import { ToastContainer } from "react-toastify";

function FormAuth({ info, changeForm }) {
  const [error, setError] = useState("");

  const [_, setCookies] = useCookies("access_token");

  const navigate = useNavigate();

  const messageLogin = "Successful login.";
  const messageRegister = "Successful registration.";

  //* Validation formik user
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConf: "",
    },
    validationSchema: info.value === "login" ? LoginSchema : SignUpSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `http://localhost:3001/auth/${info.value}`,
          values
        );

        if (info.value === "login") {
          const { userID, token } = response.data;
          console.log(userID);
          console.log(token);
          setCookies("acess_token", token);
          localStorage.setItem("userID", userID);
          navigate("/");
          ToastSucess(messageLogin);
        } else {
          changeForm(info.valueChangeForm);
          ToastSucess(messageRegister);
        }
      } catch (err) {
        setError(err.response.data.message);
      }
    },
  });

  useEffect(() => {
    formik.resetForm();
    setError("");
  }, [info.value]);

  return (
    <div className="w-[18em] flex flex-col gap-3">
      <h1 className="font-montserrat text-2xl text-secondary pb-3">
        {info.title}
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
        className="flex flex-col gap-3"
      >
        {/* Username */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="username"
            className="font-montserrat text-sm md:text-base text-secondary"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={formik.handleChange}
            value={formik.values.username}
            className="bg-secondary border border-third text-white text-sm font-light rounded-lg w-full p-2 font-montserrat"
          />
          {/* Error */}
          {(formik.touched.username && formik.errors.username) || error ? (
            <span className="text-primary text-opacity-90 text-xs">
              {error ? error : formik.errors.username}
            </span>
          ) : null}
        </div>
        {/* Password */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="font-montserrat text-sm md:text-base text-secondary"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="bg-secondary border border-third text-white font-light text-sm rounded-lg w-full p-2 font-montserrat"
          />
          {/* Error */}
          {formik.touched.password && formik.errors.password ? (
            <span className="text-primary text-opacity-90 text-xs">
              {formik.errors.password}
            </span>
          ) : null}
        </div>
        {/* Confirm Password */}
        {info.value != "login" && (
          <div className="flex flex-col gap-1">
            <label
              htmlFor="passwordConf"
              className="font-montserrat text-sm md:text-base text-secondary"
            >
              Confirm password
            </label>
            <input
              type="password"
              name="passwordConf"
              placeholder="Password confirmation"
              onChange={formik.handleChange}
              value={formik.values.passwordConf}
              className="bg-secondary border border-third text-white text-sm font-light rounded-lg w-full p-2 font-montserrat"
            />
            {/* Error */}
            {formik.touched.passwordConf && formik.errors.passwordConf ? (
              <span className="text-primary text-opacity-90 text-xs">
                {formik.errors.passwordConf}
              </span>
            ) : null}
          </div>
        )}
        {/* Adicional information */}
        <label className="flex justify-end pr-2 text-sm font-montserrat font-medium text-third">
          {info.infoForm1}
          <span
            className="text-secondary hover:text-primary active:scale-90"
            onClick={() => changeForm(info.valueChangeForm)}
          >
            {info.infoForm2}
          </span>
        </label>
        {/* Button submit */}
        <div className="flex justify-center items-center">
          <button
            className="py-2 px-3 rounded-lg bg-secondary text-white text-md active:scale-95"
            type="submit"
            onClick={() => setError("")}
          >
            {info.button}
          </button>
        </div>
      </form>
      {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        toastStyle={{ backgroundColor: "#37373f", color: "#ffffff" }}
      />
    </div>
  );
}

export default FormAuth;
