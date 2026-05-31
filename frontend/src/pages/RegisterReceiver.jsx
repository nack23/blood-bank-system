import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import API_URL from "../config";

function RegisterReceiver() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (!bloodGroup) {
      setErrorMessage("Please select blood group");
      return;
    }

    try {
      const response = await axios.post(
        API_URL,
        {
          name: fullName,
          email: email,
          password: password,
          role: "receiver",
          blood_group: bloodGroup,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setSuccessMessage(
          "✅ Receiver Registered Successfully. Redirecting to Login..."
        );

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setErrorMessage(
          response.data.message || "Registration Failed"
        );
      }
    } catch (error) {
      console.error(error);

      if (error.response) {
        setErrorMessage(
          error.response.data.message || "Backend Error"
        );
      } else {
        setErrorMessage("Server Error");
      }
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-red-700 via-red-600 to-red-500 text-white flex-col justify-center px-16">

        <h1 className="text-6xl font-black mb-6">
          BloodBank
        </h1>

        <h2 className="text-4xl font-bold leading-tight">
          Find Blood
          <br />
          When You Need It
        </h2>

        <p className="mt-6 text-lg text-red-100">
          Register as a receiver and request compatible
          blood samples from hospitals quickly and securely.
        </p>

        <div className="mt-10 space-y-4">

          <div className="flex items-center gap-3">
            <span className="text-2xl">✓</span>
            <span>Search Available Blood</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl">✓</span>
            <span>Request Compatible Blood</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl">✓</span>
            <span>Track Request Status</span>
          </div>

        </div>

      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 bg-slate-100 flex items-center justify-center p-6">

        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">

          <h1 className="text-4xl font-bold text-center text-red-600 mb-2">
            Receiver Register
          </h1>

          <p className="text-center text-gray-500 mb-6">
            Create your receiver account
          </p>

          {successMessage && (
            <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl text-center">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />

            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">Select Blood Group</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold transition"
            >
              Register Receiver
            </button>

          </form>

          <div className="text-center mt-6">

            <p className="text-gray-600">
              Already have an account?
            </p>

            <Link
              to="/login"
              className="text-red-600 font-semibold hover:underline"
            >
              Login Here
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default RegisterReceiver;