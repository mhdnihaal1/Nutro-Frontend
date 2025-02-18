import axios from "axios";
import Api from "../services/axios";
import userRoute from "../services/endPoints/userEndpoitns";
import errorHandle from "./error";

interface userFormData {
  name?: string;
  email?: string;
  mobile?: string;
  password?: string;
  fromGoogle?: boolean;
}

interface Address {
  id: number;
  address: string;
}

interface loginData {
  email?: string;
  password?: string;
}
interface ChangePasswordResponse {
  status: number;
  message: string; // Ensure this matches what your API returns
}

interface Item {
  id: number;
  name: string;
  price: string;
  quantity?: number;
  service?:string
}

interface addresss{
userId:string,
_id:string,
nearBy: string,
street: string,
city: string,
state: string,
postalCode: string
}

export const signup = async (userData: userFormData) => {
  try {
    const response = await Api.post(userRoute.signup, userData);

    return response;
  } catch (error) {
    const err: Error = error as Error;
    console.log('not ready')
    return errorHandle(err );
  }
};

export const otpVerify = async (otp:{otp:number},email:{email:string}) => {
  try {
    const response = await Api.post(userRoute.verifyotp, {otp,email});
    console.log(response)

    return response;
  } catch (error) {
    const err: Error = error as Error;
    console.log('not ready')
    return errorHandle(err );
  }
};


export const login = async (userData: loginData) => {
  try {
    const response = await Api.post(userRoute.login, userData);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const getItems = async () => {
  try {
    const response = await Api.get(userRoute.getItems);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  } 
};


export const AddToCart = async (cartData: Item[]) => {
  try {
    const response = await Api.post(userRoute.addtocart , cartData);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}


export const getCart = async (User:string) => {
  try {
    
    const response = await Api.get(userRoute.getCart, {
      params: { User }, 
    });   
    

    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}

export const deleteCartItem = async (cartItemId:string,User:string) => {
  try {    
    const response = await Api.post(userRoute.deleteCartItem, {
      cartItemId, 
      userId: User 
    });    

    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}


export const quantityChange = async (cartItemId:string,action:string,User:string) => {
  try {    
    const response = await Api.post(userRoute.quantityChange, {
      cartItemId, 
      action,
      User
    });    

    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}


export const AddAddress = async (formattedAddress:object) => {
  try {    
    const response = await Api.post(userRoute.AddAddress, formattedAddress);    

    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}


export const getAddress = async (User:string) => {
  try {
    
    const response = await Api.get(userRoute.getAddress,{
      params: { User }, 
    });    
    
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}

export const EditAddress = async (formattedAddress:addresss) => {
  try {
    
    const response = await Api.post(userRoute.editAddress,formattedAddress);    
    
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}

export const deleteAddress = async (_id: string, User: any) => {
  try {
    
    const response = await Api.post(userRoute.deleteAddress,{_id,User});    
    
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}


export const getDeliveryMode = async () => {
  try {
    
    const response = await Api.get(userRoute.getDeliveryMode);    
    
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}


interface Order {
  userId: string;
  address: string;
  totalPrice: number;
  deliveryMode: string;
}

export const placeOrder = async (userId:string,selectedAddress:string,cartTotal:number,selectedMode:string,paymentMethod:string) => {
  try {
    
    const response = await Api.post(userRoute.placeOrder ,{userId,selectedAddress,cartTotal,selectedMode,paymentMethod});    
    
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}


export const getOrders = async (UserId : string) => {
  try {
    const response = await Api.post(userRoute.getOrders ,{_id:UserId});
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}






export const changePassword = async (UserId:string,currentPassword:string,newPassword:string) => {
  try {
    const response = await Api.post(userRoute.changePassword  ,{_id:UserId,currentPassword,newPassword});
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}



export const handleCancelorder = async (_id:string) => {
  try {
    const response = await Api.post(userRoute.handleCancelorder,{id:_id});
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}


export const sendConcern = async (UserId:string,subject:string,summary:string) => {
  try {
    const response = await Api.post(userRoute.sendConcern,{id:UserId,subject:subject,summary:summary});
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}

export const sendEmail = async (email:string,otp:string) => {
  try {
    const response = await Api.post(userRoute.sendEmail,{email:email,otp:otp});
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}


export const SavePassword = async (password:string,email:string) => {
  try {
    const response = await Api.post(userRoute.SavePassword,{password:password,email:email});
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}