import Api from "../services/axios";
import userRoutes from "../services/endPoints/userEndpoitns";
import errorHandle from "./error";

interface userFormData {
  name?: string;
  email?: string;
  mobile?: string;
  password?: string;
  fromGoogle?: boolean;
}

interface loginData {
  email?: string;
  password?: string;
}
interface ChangePasswordResponse {
  status: number;
  message: string; // Ensure this matches what your API returns
}


export const signup = async (userData: userFormData) => {
  try {
    const response = await Api.post(userRoutes.signup, userData);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};