import { FormEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { setCredentials } from "../../redux/slices/authSlice";
import { RootState } from "../../redux/store";
import { login, sendEmail } from "../../api/user";
import { Toaster, toast } from "react-hot-toast";

interface Errors {
  email?: string;
  password?: string;
}

const UserLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { userInfo } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [userOtp, setUserOtp] = useState<string>("");
  const [errorotp] = useState("");

  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/user/home");
    }
  }, [userInfo]);

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

  const submitHandler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const isValid = validateForm();

    if (!isValid) return;

    const data = { email, password };

    try {
      const response = await login(data);

      if (response?.data?.status !== 400) {
        localStorage.setItem("token", response?.data?.data?.token);

        dispatch(setCredentials(response?.data?.data?.message));

        toast.success("Login successful!");
        navigate("/user/home");
      } else {
        toast.error(response?.data?.data?.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid credentials. Please try again.");
    }
  };

  function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  const forgetPassword = async () => {
    if (!email) {
      toast.error("Please enter your email and click login");
      return;
    }
    const otps = generateOTP();

    setOtp(otps);

    setIsModalOpen(true);

    const res = await sendEmail(email, otps);
    if (res) {
      toast.success("Email sended successful!");
    } else {
      toast.error("Error is happening");
    }
  };

  // for submit

  const handleVerifyOtp = async () => {
    if (userOtp === otp) {
      navigate("/user/");
      navigate("/user/forgetPassword", {
        state: {
          email: email,
        },
      });
    } else {
      toast.error("Wrong otp entered");
    }
  };

  const resendOtp = async () => {
    const ot = generateOTP();
    setOtp(ot);
    const res = await sendEmail(email, ot);
    if (res) {
      toast.success("Re-send Email sended successful!");
    } else {
      toast.error("Error is happening");
    }

    //email send later
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Welcome Back!
        </h1>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
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
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
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
              {showPassword ? (
                <IoEyeOffSharp size={20} />
              ) : (
                <IoEyeSharp size={20} />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mt-2">
            Don’t have an account?{" "}
            <Link to="/user/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            Forgot password?{" "}
            <span
              onClick={forgetPassword}
              className="text-blue-600 hover:underline"
            >
              Click here
            </span>
          </p>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md w-[400px] min-h-[200px]">
              <h2 className="text-xl font-bold mb-4 text-white text-center">
                Enter OTP
              </h2>

              <label className="block mb-2 text-white text-center">
                Enter the 6-digit OTP
              </label>
              <input
                type="text"
                maxLength={6}
                value={userOtp}
                onChange={(e) => setUserOtp(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white text-center tracking-widest"
              />

              {errorotp && (
                <p className="text-red-500 text-sm mt-2">{errorotp}</p>
              )}

              <button
                onClick={handleVerifyOtp}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
              >
                Verify OTP
              </button>

              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded"
              >
                Cancel
              </button>
              <p className="text-sm  text-center text-gray-600 mt-2">
                Re-send otp?{" "}
                <span
                  onClick={resendOtp}
                  className="text-blue-600 hover:underline"
                >
                  Click Here
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLogin;
