import React from "react";
import "./reg.css";
import { Formik } from "formik";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const userSubmit = async (formdata) => {
    console.log(formdata);

    const response = await fetch("http://localhost:5000/user/add", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      console.log("request sent");
      Swal.fire({
        icon: "success",
        title: "Nice",
        text: "user Registered!!",
      });
      navigate("/login");
    } else {
      console.log("some error occured");
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={userSubmit}
      >
        {({ values, handleSubmit, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <div className="main">
              <div className="container">
                <div className="row">
                  <div className="heading">
                    <h3>Sign Up form</h3>
                    <p>Hello, friend! .</p>
                  </div>
                  <div className="form">
                    <input
                      type="name"
                      placeholder="name"
                      id="name"
                      onChange={handleChange}
                      className="form-control"
                    />
                    <input
                      type="email"
                      placeholder="email"
                      id="email"
                      onChange={handleChange}
                      className="form-control "
                    />
                    <input
                      type="password"
                      placeholder="password"
                      id="password"
                      onChange={handleChange}
                      className="form-control"
                    />
                    <button type="submit" className="hi">
                      Sign up
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

export default Signup;
