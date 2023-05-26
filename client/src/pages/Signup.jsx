import React, { useState, useEffect } from "react";
import { signup } from "../helpers/api/lingapp/authentication";
import logo from "../images/lingapp-logo-reverse.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getItem } from "../helpers/localStorage";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const DIMENSIONS_CLASS =
  "py-2 px-4 h-14 w-4/5 text-xl rounded-md max-w-lg md:w-1/2 lg:w-1/2";

const initSignupForm = {
  firstName: "",
  lastName: "",
  role: "volunteer",
  email: "",
  password: "",
  passwordConfirmation: "",
  city: "",
  barangay: "",
  house: "",
  landmark: "",
};

const Signup = () => {
  const [signupForm, setSignupForm] = useState(initSignupForm);
  const [currentStep, setCurrentStep] = useState(1);
  const TOTAL_STEPS = 4;

  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getItem("Authorization");

    if (currentUser) {
      navigate("/");
    }
  }, [navigate]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setSignupForm({ ...signupForm, [name]: value });
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSignup = async () => {
    const response = await signup(signupForm);

    if (response.status === 201) {
      toast.success("Registration successful!");
      navigate("/login");
    } else {
      console.log(response);
      Object.keys(response?.errors).forEach((key) => {
        const col = key ? key.toUpperCase() : "";
        toast.error(`${col.to_i === 0 ? "" : col}  ${response.errors[key]}`);
      });
    }
  };

  const RegistrationStepTitle = ({ title }) => {
    return <h2 className="font-bold text-white">{title}</h2>;
  };

  const transformAddress = (city, barangay, house, landmark) => {
    if (!city && !barangay && !house && !landmark) {
      return "null";
    }
    return `${house}, Barangay ${barangay}, ${city} City`;
  };
  console.log(signupForm);
  return (
    <div className="bg-red-400 h-screen min-w-full flex flex-col place-items-center pt-12 gap-4">
      <div className="py-4 flex flex-col place-items-center fixed top-0 left-4">
        <img src={logo} alt="lingapp-logo" className="h-16 w-16" />
        <h1 className="text-xl text-white">Lingapp</h1>
      </div>

      {/* Carousel container */}
      <div className="h-content w-full mt-24 bg-red-400 flex flex-col place-items-center">
        <h1 className="font-extrabold text-white text-2xl">
          REGISTRATION FORM
        </h1>
        {/* 1 User Info */}
        {currentStep === 1 && (
          <div className="w-full flex flex-col place-items-center py-4 gap-4">
            <RegistrationStepTitle title="User Information" />
            <input
              type="text"
              className={DIMENSIONS_CLASS}
              placeholder="First Name"
              name="firstName"
              onChange={handleFormChange}
            />
            <input
              type="text"
              className={DIMENSIONS_CLASS}
              placeholder="Last Name"
              name="lastName"
              onChange={handleFormChange}
            />
          </div>
        )}

        {/* 2 Account Info */}
        {currentStep === 2 && (
          <div className="w-full flex flex-col place-items-center py-4 gap-4">
            <RegistrationStepTitle title="Account Information" />
            <div className="py-2 h-14 w-4/5 text-xl rounded-md max-w-lg md:w-1/2 lg:w-1/2">
              <div className="flex text ">
                <input
                  id="volunteer"
                  className="peer/volunteer hidden"
                  type="radio"
                  name="role"
                  value="volunteer"
                  onChange={handleFormChange}
                  checked={signupForm.role === "volunteer"}
                />
                <label
                  htmlFor="volunteer"
                  className="w-1/2 cursor-pointer peer-checked/volunteer:bg-red-800 py-3 grow text-white bg-gray-400 rounded-l-md text-center"
                >
                  VOLUNTEEER
                </label>

                <input
                  id="organizer"
                  className="peer/organizer hidden"
                  type="radio"
                  name="role"
                  value="organizer"
                  onChange={handleFormChange}
                  checked={signupForm.role === "organizer"}
                />
                <label
                  htmlFor="organizer"
                  className="w-1/2 cursor-pointer peer-checked/organizer:bg-red-800 py-3 grow text-white bg-gray-400 rounded-r-md text-center"
                >
                  ORGANIZER
                </label>
              </div>
            </div>
            <input
              type="text"
              className={`${DIMENSIONS_CLASS}`}
              placeholder="Email"
              name="email"
              onChange={handleFormChange}
            />
            <input
              type="password"
              className={DIMENSIONS_CLASS}
              placeholder="Password"
              name="password"
              onChange={handleFormChange}
            />
            <input
              type="password"
              className={DIMENSIONS_CLASS}
              placeholder="Password Confirmation"
              name="passwordConfirmation"
              onChange={handleFormChange}
            />
          </div>
        )}

        {/* 3 Additional Info */}
        {currentStep === 3 && (
          <div className="w-full flex flex-col place-items-center py-4 gap-4">
            <RegistrationStepTitle title="Additional Information" />
            <input
              type="text"
              className={DIMENSIONS_CLASS}
              placeholder="City"
              name="city"
              onChange={handleFormChange}
            />
            <input
              type="text"
              className={DIMENSIONS_CLASS}
              placeholder="Barangay"
              name="barangay"
              onChange={handleFormChange}
            />
            <input
              type="text"
              className={DIMENSIONS_CLASS}
              placeholder="House No. / Street"
              name="house"
              onChange={handleFormChange}
            />
            <input
              type="text"
              className={DIMENSIONS_CLASS}
              placeholder="Landmark"
              name="landmark"
              onChange={handleFormChange}
            />
          </div>
        )}

        {/* 4 Review */}
        {currentStep === 4 && (
          <div className="w-full flex flex-col place-items-center py-4 gap-2 md:w-1/2 md:px-10">
            <RegistrationStepTitle title="Review" />
            <div className="w-4/5 flex flex-col gap-2">
              <div className="w-full flex flex-col place-items-center gap-1">
                <span className="w-full text-sm px-2 text-white rounded-xl text-center ">
                  User Information
                </span>
                <span className="w-full bg-gray-200 px-4 py-1 rounded-xl">
                  {signupForm.firstName && signupForm.lastName
                    ? `${signupForm?.firstName} ${signupForm?.lastName}`
                    : "null"}
                </span>
              </div>

              <div className="w-full flex flex-col place-items-center gap-1">
                <span className="w-full text-sm px-2 text-white rounded-xl text-center ">
                  Account Information
                </span>
                <span className="w-full bg-gray-200 px-4 py-1 rounded-xl">
                  {signupForm?.email || "null"}
                </span>
                <span className="w-full bg-gray-200 px-4 py-1 rounded-xl">
                  {signupForm?.role?.toUpperCase() || "null"}
                </span>
              </div>

              <div className="w-full flex flex-col place-items-center  gap-1">
                <span className="w-full text-sm px-2 text-white rounded-xl text-center ">
                  Additional Information
                </span>
                <span className="w-full bg-gray-200 px-4 py-1 rounded-xl">
                  {transformAddress(
                    signupForm.city,
                    signupForm.barangay,
                    signupForm.house,
                    signupForm.land
                  )}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="py-2 h-14 w-4/5 text-xl rounded-md max-w-lg md:w-1/2 lg:w-1/2 flex flex-cols place-items-center gap-4 mt-1 ">
          <button
            name="back"
            className={`w-full bg-red-300 text-white flex justify-center align-center py-2 px-4 h-14 text-xl rounded-md max-w-lg`}
            onClick={handleBack}
          >
            <ChevronLeftIcon className="h-10 w-10 font-bold" />
          </button>
          {currentStep < TOTAL_STEPS ? (
            <button
              name="next"
              className={`w-full bg-red-300 text-white flex justify-center align-center py-2 px-4 h-14 text-xl rounded-md max-w-lg`}
              onClick={handleNext}
            >
              <ChevronRightIcon className="h-10 w-10 font-bold" />
            </button>
          ) : (
            <button
              name="login"
              className={`w-full bg-red-700 text-white flex justify-center align-center py-2 px-4 h-14 text-2xl rounded-md max-w-lg`}
              onClick={handleSignup}
            >
              SIGN UP!
            </button>
          )}
        </div>
      </div>

      <div className="fixed bottom-10">
        <span className="text-white text-lg" onClick={() => navigate("/login")}>
          Already have an account? Login
        </span>
      </div>
    </div>
  );
};

export default Signup;
