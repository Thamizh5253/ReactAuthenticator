import React, { useState } from "react";
import "./login1.scss";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

// const history = useHistory();

const Login = () => {
  const [credentials, setCredentials] = useState({ uid: "", password: "" });
  const navigate = useNavigate();
  const handleUidChange = (event) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      uid: event.target.value,
    }));
  };

  const handlePasswordChange = (event) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      password: event.target.value,
    }));
  };
  const [udata, setData] = useState({ ruid: "", rpassword: "" });
  const [cpass, SetCpass] = useState("");
  const handleUid = (event) => {
    setData((prevCredentials) => ({
      ...prevCredentials,
      ruid: event.target.value,
    }));
  };
  const handlePassSame = (event) => {
    SetCpass(event.target.value);
  };

  const workingOn = () => {
    toast.error("🛠️ We are working on this module", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handlePassword = (event) => {
    setData((prevCredentials) => ({
      ...prevCredentials,
      rpassword: event.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        credentials
      );
      console.log(response.status);
      if (response.status === 200) {
        toast.success("😍 Login successful", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });
        navigate("/like");
        setCredentials({ uid: "", password: "" });
      } else {
        toast.warn("😒 Invalid Credentials", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });
      }
    } catch (error) {
      toast.error("🪲 There is a BUG in backend", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    // setCredentials(uid, password);
    if (udata.rpassword.length >= 8) {
      if (udata.rpassword === cpass) {
        // console.log(udata);
        // You can perform login logic here using uid and password
        // console.log("Login clicked with UID:", uid, "and Password:", password);
        try {
          const response = await axios.post(
            "http://localhost:5000/signup",
            udata
          );
          // You can handle the login success here
          if (response.status === 200) {
            console.log("Registered Successfully", response.data);

            toast.success("User created successfully", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              // transition: Bounce,
            });

            SetCpass("");
            setData({ ruid: "", rpassword: "" });
          } else {
            console.log("User Already Exist", response.data);

            toast.warn("User Already Exist", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              // transition: Bounce,
            });
          }
        } catch (error) {
          toast.error("🪲 There is a BUG in backend", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
          });
        }
      } else {
        toast.warn("Password doesn't match ⚔️", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });
      }
    } else {
      toast.warn("Password must be 8 characters 😎", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
    }
  };

  return (
    <div>
      <Link to="/like">Blogs</Link>;
      <section className="main">
        <div className="form_wrapper">
          <input
            type="radio"
            className="radio"
            name="radio"
            id="login"
            defaultChecked="login"
          />
          <input type="radio" className="radio" name="radio" id="signup" />
          <div className="tile">
            <h3 className="login">Login Form</h3>
            <h3 className="signup">Signup Form</h3>
          </div>
          <label className="tab login_tab" htmlFor="login">
            Login
          </label>
          <label className="tab signup_tab" htmlFor="signup">
            Signup
          </label>
          <span className="shape" />
          <div className="form_wrap">
            <div className="form_fild login_form">
              <form onSubmit={handleLogin}>
                <div className="input_group">
                  <input
                    type="text"
                    className="input"
                    placeholder="Email Address"
                    value={credentials.uid}
                    onChange={handleUidChange}
                  />
                </div>
                <div className="input_group">
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <a onClick={workingOn} className="forgot">
                  Forgot password?
                </a>
                <input type="submit" className="btn" defaultValue="Login" />

                <div className="not_mem">
                  <label htmlFor="signup">
                    Not a member? <span> Signup now</span>
                  </label>
                </div>
              </form>
            </div>
            <div className="form_fild signup_form">
              <form onSubmit={handleSignup}>
                <div className="input_group">
                  <input
                    type="email"
                    className="input"
                    placeholder="Email Address"
                    value={udata.ruid}
                    onChange={handleUid}
                  />
                </div>
                <div className="input_group">
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    value={udata.rpassword}
                    onChange={handlePassword}
                  />
                </div>
                <div className="input_group">
                  <input
                    type="password"
                    className="input"
                    placeholder="Confirm Password"
                    value={cpass}
                    onChange={handlePassSame}
                  />
                </div>

                <input
                  type="submit"
                  // onClick={handleSignup}
                  className="btn"
                  defaultValue="Signup"
                />
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
