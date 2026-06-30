import React, { useState } from "react";
import API from "../services/authService";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  // State for login form fields
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // State for registration form fields 
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle login form submission
  const handleLoginSubmit = async (e) => {  
    e.preventDefault(); // Prevent default form submission

    try {
      // Send POST request to login endpoint with loginData
      const response = await API.post("/api/auth/login", loginData);
      console.log("Login Success:", response.data); 
      alert(response.data.message || "Login Successful"); // Show success message to the user

  
    } catch (error) {
      console.log(error); 
      alert(
        error.response?.data?.message ||
          "Login Failed. Please try again."
      );
    }
  };

  // Handle registration form submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to register endpoint with registerData
      const response = await API.post(
        "/api/auth/register",
        registerData
      );

      console.log("Register Success:", response.data);

      // Show success message
      alert(response.data.message);
      setIsLogin(true);

      // Clear registration form fields
      setRegisterData({
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
          "Registration Failed."
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-2">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <p className="text-gray-500 text-center mb-8">
          {isLogin
            ? "Login to continue"
            : "Register as a customer"}
        </p>
        {isLogin ? (
          // Login form
          <form
            onSubmit={handleLoginSubmit}
            className="space-y-5"
          >
            {/* Email input */}
            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* Password input */}
            <div>
              <label className="block mb-2 font-medium">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    password: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        ) : (
          // Registration form
          <form
            onSubmit={handleRegisterSubmit}
            className="space-y-5"
          >
            {/* Email input */}
            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* Password input */}
            <div>
              <label className="block mb-2 font-medium">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    password: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* Confirm Password input */}
            <div>
              <label className="block mb-2 font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={registerData.confirmPassword}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    confirmPassword: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Create Account
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          {isLogin ? (
            <p>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="text-blue-600 font-semibold"
              >
                Register
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="text-blue-600 font-semibold"
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;