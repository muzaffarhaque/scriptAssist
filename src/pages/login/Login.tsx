import React, { useState, FormEvent, ChangeEvent } from "react";
import loginImage from "../../styles/images/sideLogin-removebg-preview.png";
import camera from "../../styles/images/camera.png";
import spaceX from "../../styles/images/spacX.jfif";
import { InputsBox } from "../../components/inputs";
import { commonAllApi, loginPostApi } from "../../server/Api";
import { toast } from "react-toastify";
import { isOk } from "../../utils/reusablefunctions";
import { NavLink } from "react-router-dom";
import "../../styles/abstracts/login.scss";

interface FormData {
  userName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}
type LoginData = {
  username: string;
  password: string;
  expiresInMins: number;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
};
export default function Login(): JSX.Element {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [isWelcome, setIsWelcome] = useState<boolean>(false);
  const [isShowProfileDetails, setIsShowProfileDetails] =
    useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    userName: "emilys",
    email: "",
    phone: "",
    password: "emilyspass",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApiResponse = (response: any): void => {
    if (isOk(response?.status)) {
      if (!isSignUp) {
        toast.success("Login successfully");
        localStorage.setItem("token_script", response?.data?.accessToken);
        setIsWelcome(true);
      } else {
        setIsSignUp(false);
        toast.success("Registered successfully");
      }
    } else {
      toast.error(response?.response?.data?.message || "Something went wrong!");
    }
  };

  const resetForm = (): void => {
    setFormData({
      userName: "emilys",
      email: "",
      phone: "",
      password: "emilyspass",
      confirmPassword: "",
    });
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    const formData2: LoginData = {
      username: formData.userName,
      password: formData.password,
      expiresInMins: 30,
    };
    if (isSignUp) {
      toast.warn("We don't have a registration API, so we're using DummyJSON auth for login only.");
      setLoading(false);
      setIsSignUp(false);

      formData2.fullName = formData.userName;
      formData2.firstName = formData.userName.split(" ")[0];
      formData2.lastName = formData.userName.split(" ")[1] || "";
      formData2.phone = formData.phone;
    } else {
      // const url = isSignUp ? "v1/admin/registration" : "v1/admin/login";

      try {
        const response = await loginPostApi("https://dummyjson.com/auth/login", formData2);
        handleApiResponse(response);
      } finally {
        setLoading(false);
        resetForm();
      }
    }
  };

  return (
    <section className="login-main-section">
      {/* <img src={bgImage} className="bg-img-wave" alt="" /> */}
      <div className="container text-center">
        {!isWelcome ? (
          <div className="login-main-container">
            <div className="left-part">
              <img
                src={loginImage}
                className="login_left_image"
                alt="loginImage"
              />
            </div>
            <div className="right-part">
              {/* <div className="vertical-divider"></div> */}
              <div className="form-wrapper">
                <div className="sub-form-wrapper">
                  <h1>{isSignUp ? "Create New Account" : "Login"}</h1>
                  <p className="welcome-para">
                    Welcome to Space-X expo controller
                  </p>
                  <form
                    className={
                      isSignUp
                        ? "login-form-wrapper update-margin-top"
                        : "login-form-wrapper"
                    }
                    onSubmit={handleSubmit}
                  >
                    <div className="form-group">
                      <label htmlFor="userName">User Name</label>
                      <input
                        type="text"
                        name="userName"
                        id="userName"
                        required
                        placeholder=""
                        value={formData.userName}
                        onChange={handleChange}
                      />
                    </div>
                    {isSignUp && (
                      <>
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            placeholder=""
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="phone">Phone No</label>
                          <input
                            type="number"
                            name="phone"
                            id="phone"
                            required
                            placeholder=""
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </>
                    )}
                    <InputsBox
                      classes="password-class"
                      label="Password"
                      value={formData.password}
                      onChange={(value: string) =>
                        setFormData({ ...formData, password: value })
                      }
                    />
                    {isSignUp && (
                      <InputsBox
                        classes=""
                        label="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={(value: string) =>
                          setFormData({ ...formData, confirmPassword: value })
                        }
                      />
                    )}
                    {!isSignUp && (
                      <p className="fs-14-12 fw-normal forgot-pass-text">
                        Forgot Password
                      </p>
                    )}
                    <div
                      className={isSignUp ? "btn-wrapper" : "btn-wrapper-up"}
                    >
                      <button
                        type="submit"
                        className="primary-btn"
                        disabled={loading}
                      >
                        {loading
                          ? "Loading..."
                          : isSignUp
                            ? "Create Account"
                            : "Login"}
                      </button>
                    </div>
                  </form>
                  <p
                    className={
                      isSignUp
                        ? "create-new-acc-text update-margin-top2"
                        : "create-new-acc-text"
                    }
                    onClick={() => setIsSignUp(!isSignUp)}
                  >
                    {isSignUp
                      ? "Already have an account? Login"
                      : "Create New Account"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="welcome-container">
            {!isShowProfileDetails && (
              <div className="welcome-form-wrapper">
                <img src={spaceX} alt="" className="logo_img" />
                <h1>
                  Welcome <br />
                  <span> To the SpaceX</span>
                </h1>
                <p>
                  Space Exploration Technologies Corp., commonly referred to as
                  SpaceX, is an American space technology company headquartered
                  at the Starbase development site near Brownsville, Texas.
                </p>
                <NavLink to="/">
                  <button className="primary-btn mx-auto" >Get start</button>
                </NavLink>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
