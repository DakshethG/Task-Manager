import React, { useContext, useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const {updateUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if(!validateEmail(email)){
            setError("Email is required");
            return;
        }

        if(!password || password.length < 8){
            setError("Password must be at least 8 characters long");
            return;
        }

        setError(""); // Clear previous errors
        try{
          const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
            name: fullName,
            email,
            password,
            adminInviteToken
          });

          const { token, role} = response.data;

          if(token){
            localStorage.setItem("token", token);
            updateUser(response.data);

            //Redirect based on role
            if (role === "admin"){
              navigate("/admin/dashboard");
            }else{
              navigate("/user/dashboard");
            }
          }
        }catch(error){
          if(error.response && error.response.data.message){
            setError(error.response.data.message);
          } else {
            setError("Something went wrong. Please try again.")
          }
        }
      }
    return (
      <AuthLayout>
        <div className="w-full flex justify-center items-center">
          <div className="w-full max-w-md bg-white/30 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-10">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Welcome Back</h2>
              <p className="text-sm text-gray-500 mt-1">
                Please enter your email and password to continue.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm mt-2">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2 rounded-full bg-gradient-to-b from-gray-900 to-black text-white font-semibold shadow hover:opacity-90 transition"
              >
                Log In
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Don't have an account?{" "}
                <Link className="text-blue-500 hover:underline" to="/signup">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </AuthLayout>
    )
}

export default Login;