import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { signup } from "../../api/user";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

const UserSignup = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});

  const navigate = useNavigate();

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const validateForm = () => {
    const newErrors: Errors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!email.trim() || !validator.isEmail(email)) {
      newErrors.email = "Valid email is required";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (phone.length < 10 || phone.length > 10) {
      newErrors.phone = "Phone number must contain 10 numbers";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must contain at least 6 characters";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    try {
      e.preventDefault();
      const isValid = validateForm();
      if (isValid) {
        const userData = {
          name: name,
          email: email,
          phone: phone,
          password: password,
        };

        const response = await signup(userData);
        if (response?.data?.success == true) {
          toast.success(response.data.message);
          navigate("/user/otp", {
            state: {
              email: email,
              name: name,
              password: password,
              phone: phone,
            },
          });
        } else {
          console.log(response);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Create an Account
        </h1>
        <form onSubmit={submitHandler} className="max-w-md mx-auto space-y-6">
          <div className="mb-4">
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="phone"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your number"
              required
            />
          </div>

          <div className="mb-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={handlePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <IoEyeOffSharp /> : <IoEyeSharp />}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={handleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showConfirmPassword ? <IoEyeOffSharp /> : <IoEyeSharp />}
              </button>
            </div>
          </div>

          {errors.confirmPassword && (
            <p className="text-sm text-red-600 text-center mb-4">
              {errors.confirmPassword}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="login" className="text-blue-600 hover:underline">
              Log In here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
