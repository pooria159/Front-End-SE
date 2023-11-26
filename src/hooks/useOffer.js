import axios from "axios";
import api from "./api";
import { stringify } from "postcss";

const useOffer = async (formData) => {
  try {
    const response = await api.post("/get-offer", formData);
    console.log("the response of the post request: ", response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default useOffer;
