import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this for navigation
import API from "../services/authService";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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

  // Validation function for registration
  const validateRegistration = () => {
    const { email, password, confirmPassword } = registerData;
    
    // Check if email is valid
    if (!email.includes("@")) {
      alert("Please enter a valid email address (must contain @)");
      return false;
    }
    
    // Check password length
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return false;
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return false;
    }
    
    return true;
  };

  // Handle login form submission
  const handleLoginSubmit = async (e) => {  
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await API.post("/api/auth/login", loginData);
      console.log("Login Success:", response.data);
      
      // ✅ STEP 3: Save token and user info
      const { token, ...userData } = response.data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      
      alert(response.data.message || "Login Successful");
      
      // ✅ Redirect based on role
      const role = userData.role;
      if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "STAFF") {
        navigate("/staff");
      } else if (role === "CUSTOMER") {
        navigate("/customer");
      } else {
        navigate("/"); // Fallback
      }
      
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
          "Login Failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle registration form submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    // ✅ Validate form before submission
    if (!validateRegistration()) {
      return;
    }
    
    setIsLoading(true);

    try {
      const response = await API.post("/api/auth/register", {
        email: registerData.email,
        password: registerData.password,
        confirmPassword: registerData.confirmPassword,
      });

      console.log("Register Success:", response.data);
      alert(response.data.message || "Registration successful! You can now login.");
      
      // ✅ Switch to login form
      setIsLogin(true);
      
      // ✅ Clear registration form fields
      setRegisterData({
        email: "",
        password: "",
        confirmPassword: "",
      });
      
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
          "Registration Failed. Please try again."
      );
    } finally {
      setIsLoading(false);
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
          <form onSubmit={handleLoginSubmit} className="space-y-5">
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full text-white py-3 rounded-lg font-semibold transition ${
                isLoading 
                  ? "bg-blue-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        ) : (
          // Registration form
          <form onSubmit={handleRegisterSubmit} className="space-y-5">
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
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500 mt-1">Must contain @</p>
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
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
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
                disabled={isLoading}
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full text-white py-3 rounded-lg font-semibold transition ${
                isLoading 
                  ? "bg-blue-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
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
                className="text-blue-600 font-semibold hover:underline"
                disabled={isLoading}
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
                className="text-blue-600 font-semibold hover:underline"
                disabled={isLoading}
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