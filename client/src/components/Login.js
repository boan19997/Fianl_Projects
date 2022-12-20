import React, { useEffect, useState } from "react";

import { app } from "../config/firebase.config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";

import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { validateUser, login } from "../api";
import images from "../assets/images";

function Login({ setAuth }) {
  //
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();

  const [{ user }, dispatch] = useStateValue();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  //đăng nhập bằng gg nhờ thư viện firebase đây là nút hiện bảng gg để đăng nhập
  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");

        firebaseAuth.onAuthStateChanged((userCred) => {
          if (userCred) {
            userCred.getIdToken().then((token) => {
              validateUser(token).then((data) => {
                dispatch({
                  type: actionType.SET_USER,
                  user: data,
                });
              });
            });
            navigate("/", { replace: true });
          } else {
            setAuth(false);
            dispatch({
              type: actionType.SET_USER,
              user: null,
            });
            navigate("/login");
          }
        });
      }
    });
  };
  //Đăng nhập
  const ClickLogin = () => {
    login(email, password)
      .then((data) => {
        window.localStorage.setItem("auth", "true")
        window.localStorage.setItem("tokene", data.accessToken)
        console.log(data);
        dispatch({
          type: actionType.SET_USER,
          user: data,
        });
        navigate("/", { replace: true });
      })
      .catch((error) => {
      });
  };

  //khi login rồi ko thể vào trang login đc nữa
  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true") {
      navigate("/", { replace: true });
    }
  }, []);

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
              Sign in to your account
            </h1>
            <div className="space-y-4">
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  onChange={(e) => setemail(e.target.value)}
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@gmail.com"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setpassword(e.target.value)}
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Password"
                />
              </div>
              
              <button
                onClick={ClickLogin}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <div className="flex text-sm font-light text-gray-500 dark:text-gray-200">
                Don’t have an account yet?{" "}
                <NavLink to={"/register"}>
                  <div
                    className="font-medium ml-1 text-primary-700 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </div>
                </NavLink>
              </div>
            </div>
        <div
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all"
          onClick={loginWithGoogle}
        >
          <FcGoogle className="text-xl" />
          Sign in with Google
        </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
