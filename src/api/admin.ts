import axios from "axios";
import Api from "../services/axios";
import adminRoute from "../services/endPoints/adminEndpoints";
import errorHandle from "./error";

interface Map {
  _id:string ;
  sl_no: string;
  place: string;
  pincode: string;
  latitude_longitude: [number, number];
}
interface IMap {
  sl_no: string;
  place: string;
  pincode: string;
  latitude_longitude: [number, number];
}
interface adminFormData {
  name?: string;
  email?: string;
  mobile?: string;
  password?: string;
}

interface loginData {
  email?: string;
  password?: string;
}
interface Agents {
  name: string;
  email: string;
  password:string;
  phone: string;
}

interface IPrice {
  dryClean: number;
  wash: number;
  iron: number;
}

interface IClothItem {
  name: string;
  category: string;
  icon: number[];
  prices: IPrice;

}

interface IOffer {
  name: string;
  price: number;
  expirationDate:Date;
  isActive: boolean;
 
}

interface IPrice {
  dryClean: number;
  wash: number;
  iron: number;
}


// interface ChangePasswordResponse {
//   status: number;
//   message: string; // Ensure this matches what your API returns
// }

type Agent = {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  map: string;
};






export const login = async (adminData: loginData) => {
  try {
    const response = await Api.post(adminRoute.login, adminData);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};


export const addAgent = async (agentData: Agents) => {
  try {
    const response = await Api.post(adminRoute.addAgent, agentData);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};


export const getAgents = async () => {
  try {
    const response = await Api.get(adminRoute.getAgents);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};


export const getMaps = async () => {
  try {
    const response = await Api.get(adminRoute.getMaps);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const getItems = async () => {
  try {
    const response = await Api.get(adminRoute.getItems);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  } 
};


export const getOffers = async () => {
  try {
    const response = await Api.get(adminRoute.getOffers);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  } 
};


export const addClothItem = async (itemData: IClothItem) => {
  try {
    const response = await Api.post(adminRoute.addClothItem , itemData);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}

export const addOffer = async (offerData: IOffer) => {
  try {
    const response = await Api.post(adminRoute.addOffers , offerData);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}


export const getOrders = async () => {
  try {
    const response = await Api.get(adminRoute.getOrders );
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}


export const getUsers = async () => {
  try {
    const response = await Api.get(adminRoute.getUsers );
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}

export const addMap = async (mapData:IMap) => {
  try {
    const response = await Api.post(adminRoute.addMap ,mapData );
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}


export const deleteMap = async (_id:string) => {
  try {
    const response = await Api.post(adminRoute.deleteMap ,{id:_id} );
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}

export const editMap = async (newMap:Map) => {
  try {
    const response = await Api.post(adminRoute.editMap ,{newMap:newMap} );
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}


export const deleteItem = async (_id:string) => {
  try {
    const response = await Api.post(adminRoute.deleteItem ,{id:_id} );
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}



export const deleteOffer = async (_id:string) => {
  try {
    const response = await Api.post(adminRoute.deleteOffer ,{id:_id} );
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}


export const UserStatus = async (_id:string) => {
  try {
    const response = await Api.post(adminRoute.UserStatus ,{id:_id} );
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}

export const agentStatus = async (_id:string) => {
  try {
    const response = await Api.post(adminRoute.agentStatus ,{id:_id} );
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}


export const editAgent = async (agentData:Agent) => {
  try {
    const response = await Api.post(adminRoute.editAgent ,agentData );
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}


export const editClothItem = async (itemData:IClothItem) => {
  try {
    const response = await Api.post(adminRoute.editClothItem ,itemData );
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}

export const editOffer = async (offerData:IOffer) => {
  try {
    const response = await Api.post(adminRoute.editOffer ,offerData );
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}



export const getConcerns = async () => {
  try {
    const response = await Api.get(adminRoute.getConcerns );
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}


export const sendReply = async (concernId :string , userId:string , replyTextr:string) => {
  try {
    const response = await Api.post(adminRoute.sendReply ,{concernId :concernId , userId:userId , replyTextr:replyTextr} ); 
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}




export const deleteConcern = async (concernId:string) => {
  try {
    const response = await Api.post(adminRoute.deleteConcern ,{concernId:concernId} ); 
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}