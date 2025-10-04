// import axios from "axios";
import Api from "../services/axios";
import agentRoute from "../services/endPoints/agentEndpoints";
import errorHandle from "./error";

// interface adminFormData {
//   name?: string;
//   email?: string;
//   mobile?: string;
//   password?: string;
// }

interface loginData {
  email?: string;
  password?: string;
}

// interface ChangePasswordResponse {
//   status: number;
//   message: string; // Ensure this matches what your API returns
// }

export const login = async (agentData: loginData) => {
  try {
    const response = await Api.post(agentRoute.login, agentData);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const getAgentOrders = async (agentId: string) => {
  try {
    const response = await Api.post(agentRoute.getAgentOrders, {
      agentId: agentId,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const acceptOrder = async (_id: string) => {
  try {
    const response = await Api.post(agentRoute.acceptOrder, { id: _id });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const deliveredOrder = async (_id: string) => {
  try {
    const response = await Api.post(agentRoute.deliveredOrder, { id: _id });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const getAgentData = async (_id: string) => {
  try {
    const response = await Api.post(agentRoute.getAgentData, { id: _id });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const getMapData = async (_id: string) => {
  try {
    const response = await Api.post(agentRoute.getMapData, { id: _id });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const oldPasswordcheck = async (Agent: string, oldPassword: string) => {
  try {
    const response = await Api.post(agentRoute.oldPasswordcheck, {
      id: Agent,
      password: oldPassword,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const changePassword = async (Agent: string, newPassword: string) => {
  try {
    const response = await Api.post(agentRoute.changePassword, {
      id: Agent,
      password: newPassword,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const sendOtp = async (Agentemail: string, otp: string) => {
  try {
    const response = await Api.post(agentRoute.sendOtp, {
      email: Agentemail,
      otp: otp,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
