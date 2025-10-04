import { createSlice } from "@reduxjs/toolkit";

const getStoredAgentInfo = () => {
  const storedAgentInfo = localStorage.getItem("agentInfo");
  try {
    return storedAgentInfo ? JSON.parse(storedAgentInfo) : null;
  } catch (error) {
    console.error("Error parsing stored agent info:", error);
    localStorage.removeItem("agentInfo");
    return null;
  }
};

const initialState = {
  agentInfo: getStoredAgentInfo(),
};

const agentAuthSlice = createSlice({
  name: "agentAuth",
  initialState,
  reducers: {
    setAgentCredentials: (state, action) => {
      if (action.payload) {
        state.agentInfo = action.payload;
        localStorage.setItem("agentInfo", JSON.stringify(action.payload));
      } else {
        console.warn(
          "setAgentCredentials received invalid data:",
          action.payload
        );
      }
    },
    agentLogout: (state) => {
      state.agentInfo = null;
      localStorage.removeItem("agentInfo");
    },
  },
});

export const { setAgentCredentials, agentLogout } = agentAuthSlice.actions;
export default agentAuthSlice.reducer;
