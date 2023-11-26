import axios from "axios";
import api from "./api";
import { stringify } from "postcss";

const useCreateOffer = async (id) => {
  try {
    const response = await api.post("/create-offer", {"AnnouncementId" : id});
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default useCreateOffer;
