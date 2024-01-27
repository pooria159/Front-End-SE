import axios from "axios";
import api from "./api";
import { stringify } from "postcss";

const useOffer = async (formData) => {
  try {
    const response = await api.get(`/get-offer?announcement_id=${formData.AnnouncementId}`);
    console.log("the response of the post request: ", response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default useOffer;
