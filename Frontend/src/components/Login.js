import React from "react";
import "./reg.css";
import { Formik } from "formik";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const loginsubmit = async (formdata, { resetForm }) => {
    console.log(formdata);

    const response = await fetch("http://localhost:5000/user/authenticate", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      sessionStorage.setItem('user', JSON.stringify(data));
      Swal.fire({
        icon: "success",
        title: "success",
        text: "Loggedin successfully",
      });
      navigate('/editor');
    } else if (response.status === 401) {
      Swal.fire({
        icon: "error",
        title: "failed",
        text: "Loggedin Failed",
      });
    } else {
      console.log("unknown error occured");
    }
  };
  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={loginsubmit}
      >
        {({ handleSubmit, values, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <div className="main">
              <div className="container">
                <div className="row">
                  <div className="heading">
                    <h3>Register here</h3>
                    <p> Register here for free</p>
                  </div>
                  <div className="form">
                    <input
                      type="email"
                      className="form-control email"
                      id="email"
                      value={values.email}
                      onChange={handleChange}
                      placeholder="Email"
                    />

                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                      placeholder="Password"
                    />

                    <button type="submit" className=" hi">
                      submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
export default Login;
