import { FormEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { setAdminCredentials } from "../../redux/slices/adminSlice";
import { RootState } from "../../redux/store";
import { login } from "../../api/admin";
import { Toaster, toast } from "react-hot-toast";

interface Errors {
  email?: string;
  password?: string;
}

const UserLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { adminInfo } = useSelector((state: RootState) => state.adminAuth);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

   useEffect(() => {
    if (adminInfo) {
       navigate("/admin/dashboard");
    }
  }, [adminInfo, navigate]);

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!email.trim() || !validator.isEmail(email)) {
      newErrors.email = "Valid email is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must contain at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      const data = {
        email: email,
        password: password,
      };

 
      try {
        const response = await login(data);
         if (response?.data?.data?.message !== 'Invalid email or password') {
          toast.success("Login successful!");
          localStorage.setItem("token", response?.data?.data?.token);
          dispatch(setAdminCredentials(response?.data?.data?.message));
          navigate("/admin/dashboard");
        }else{
          toast.error("Invalid email or password!");
        }
      } catch (error) {
        toast.error("Invalid credentials. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster /> {/* Ensure Toaster is added for toast notifications */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Welcome Back!
        </h1>
        <form onSubmit={submitHandler}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={handlePasswordVisibility}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <IoEyeOffSharp size={20} /> : <IoEyeSharp size={20} />}
            </button>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Log In
          </button>
        </form>

        {/* Forgot Password and Sign-Up Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Forgot your password?{" "}
            <Link to="/forgot-password" className="text-blue-600 hover:underline">
              Reset it here
            </Link>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
