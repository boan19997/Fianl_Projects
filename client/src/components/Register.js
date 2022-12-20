import React, { useState } from "react";
import images from "../assets/images";
import { register } from "../api";
import { NavLink, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordc, setpasswordc] = useState("");
  const [name, setname] = useState("");
  const [role, setrole] = useState("user");

  const clickRegister = () => {
    if (password !== passwordc) {
      alert("sai rồi");
    } else {
      register(email, password, name, role).then((data) => {
        if (data.success) {
          navigate("/login");
        }
      });
    }
  };

  return (
    <div className="relative w-screen h-screen">
      <img
        src={images.backgruond}
        alt=""
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create and account
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  onChange={(e) => setemail(e.target.value)}
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your name
                </label>
                <input
                  onChange={(e) => setname(e.target.value)}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your name"
                  required=""
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  onChange={(e) => setpassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm password
                </label>
                <input
                  onChange={(e) => setpasswordc(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <button
                onClick={clickRegister}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <div className="flex text-sm font-light text-gray-500 dark:text-gray-200">
                Already have an account?{" "}
                <NavLink to={"/login"}>
                  <div className="font-medium ml-1 text-cartNumBg hover:underline dark:text-cartNumBg"
                  >
                    Login here
                  </div>
                
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
