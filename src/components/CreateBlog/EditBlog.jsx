import { React, useEffect, useState } from "react";
import { MdOutlineSubtitles, MdAddPhotoAlternate } from "react-icons/md";
import { GiJourney } from "react-icons/gi";
import { Rating } from "flowbite-react";
import image_backi from "../../assets/baktash.jpg";
import useCreateBlog from "../../hooks/useCreateBlog";
import { toast } from "react-toastify";
import { useEditBlog } from "../../hooks/useEditBlog";


const EditBlog = ({ onClose, Data , fetchData, data }) => {
  const [TitleValue, setTitleValue] = useState("");
  const [BodyValue, setBodyValue] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [StarValue, setStarValue] = useState(0);

  const Chips = ({ text }) => {
    return (
      <div className="flex justify-center items-center m-1 font-medium py-2 px-3 bg-white rounded-lg text-indigo-600 border border-gray-900/25 ">
        <div className="text-s font-semibold leading-none max-w-full flex-initial">
          {text}
        </div>
      </div>
    );
  };


const [formData, setFormData] = useState({
  PostId: data.PostId,
  PostTitle: data.PostTitle,
  HostRating: data.HostRating,
  PostBody: data.PostBody,
});




const handleEdit = async (e) => {
  e.preventDefault();
  const updatedFormData = { ...formData };
  if (
    !formData.PostTitle ||
    !formData.PostBody||
    !formData.HostRating
  ){
    toast.error("Please fill in all required fields.", {
      position: toast.POSITION.TOP_LEFT,
    });
    return false;
  }
  try {
    const response = await useEditBlog(updatedFormData);
    if (response.status >= 200 && response.status < 300) {
      toast.success("Blog is edited successfully !", {
        autoClose: 1000,
        position: toast.POSITION.TOP_LEFT,
      });
      setTimeout(() => {}, 1500);
    } else {
      toast.error(response.data["message"], {
        position: toast.POSITION.TOP_LEFT,
      });
    }
    
  } catch (error) {
    toast.error(error.response.data.message, {
      position: toast.POSITION.TOP_LEFT,
    });
    throw error;
  }
  onClose();
  await fetchData();

  return;
};

  useEffect(() => {
    console.log(Data);
  }, []);

  const [stars, setStars] = useState([false, false, false, false, false]);

  const handle5star = () => {
    setStars([true, true, true, true, true]);
  };
  const handle4star = () => {
    setStars([true, true, true, true, false]);
  };
  const handle3star = () => {
    setStars([true, true, true, false, false]);
  };
  const handle2star = () => {
    setStars([true, true, false, false, false]);
  };
  const handle1star = () => {
    setStars([true, false, false, false, false]);
  };

  const handleRatePost = (Rate) => {
    console.log(Rate);
    setStarValue(Rate);
  };

  const submitButtonBlog = async (e) => {
    const formData = new FormData();
    formData.append("ImageData", image);
    formData.append("PostTitle", TitleValue);
    formData.append("HostRating", StarValue);
    formData.append("AnnouncementId", Data.CardId);
    formData.append("PostBody", BodyValue);
    try {
      const response = await useCreateBlog(formData);
      console.log(response.status);
      if (response.status >= 200 && response.status < 300) {
        toast.success("Your blog has been successfully created", {});
      }
    } catch (error) {
      toast.error(error.response.data.message, {});
      throw error;
    }
  };

  const handleClicks = async () => {
    submitButtonBlog();
    onClose();
  };
  const handleCancel = () => {
    onClose();
  };

  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
      setPreviewImage(URL.createObjectURL(img));
    }
  };

  return (
    <div>
      <h2 className="m-0 text-center text-black text-2xl leading-9 tracking-tight ">
        Edit your own blog post
      </h2>
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 ">
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
              <div className="col-span-full">
                <div className="flex items-center">
                  <MdOutlineSubtitles className="text-2xl" />
                  <label
                    for="title"
                    className="block text-sm font-semibold leading-6 text-gray-900 ml-1"
                  >
                    Title
                  </label>
                </div>

                <div className="mt-1">
                  <input
                    type="text"
                    name="title"
                    value = {TitleValue}
                    id="title"
                    onChange={(e)=>{
                      setTitleValue(e.target.value);
                    }}
                    autocomplete="title"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <div className="flex items-center">
                  <MdAddPhotoAlternate className="text-2xl" />
                  <label
                    for="cover-photo"
                    className="block text-sm font-semibold leading-6 text-gray-900 ml-1"
                  >
                    Cover photo
                  </label>
                </div>
                <div className="mt-1 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-6">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <MdAddPhotoAlternate className="text-2xl" />
                    </svg>
                    <div className="mt-1 flex text-sm leading-6 text-gray-600">
                      <label
                        for="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none  hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          accept="image/*"
                          onChange={handleImageUpload}
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                    {image && (
                      <div>
                        <img className="w-96 h-96 rounded-xl" src={previewImage} alt="Preview" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <div className="mt-1 flex items-center gap-x-3">
                  <div className="items-center block sm:flex">
                    <img
                      className="w-12 h-12 mb-3 mr-1 rounded-full sm:mb-0"
                      src={image_backi}
                    />
                    <div className="flex-grow">
                      <div className="text-base font-normal text-gray-600">
                        <span className="font-medium text-black">
                          <p className="text-gray-600">
                            <div className="flex flex-wrap">
                              <Chips text="Pooria rahimi" />
                              <Chips text="Host" />
                              <Rating className="ml-14 md:ml-20" size="lg">
                                <Rating.Star
                                  className="cursor-pointer"
                                  filled={stars[0]}
                                  onMouseEnter={handle1star}
                                  onClick={() => handleRatePost(1)}
                                />
                                <Rating.Star
                                  className="cursor-pointer"
                                  filled={stars[1]}
                                  onMouseEnter={handle2star}
                                  onClick={() => handleRatePost(2)}
                                />
                                <Rating.Star
                                  className="cursor-pointer"
                                  filled={stars[2]}
                                  onMouseEnter={handle3star}
                                  onClick={() => handleRatePost(3)}
                                />
                                <Rating.Star
                                  className="cursor-pointer"
                                  filled={stars[3]}
                                  onMouseEnter={handle4star}
                                  onClick={() => handleRatePost(4)}
                                />
                                <Rating.Star
                                  className="cursor-pointer"
                                  filled={stars[4]}
                                  onMouseEnter={handle5star}
                                  onClick={() => handleRatePost(5)}
                                />
                              </Rating>
                            </div>
                          </p>
                        </span>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <div className="flex items-center">
                  <GiJourney className="text-2xl" />
                  <label
                    for="about"
                    className="block text-sm font-medium leading-6 text-gray-900 ml-1"
                  >
                    About journey
                  </label>
                </div>

                <div className="mt-1">
                  <textarea
                    id="about"
                    name="about"
                    value = {BodyValue}
                    onChange={(e)=>{
                      setBodyValue(e.target.value);
                    }}
                    rows="3"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    style={{ resize: "none", overflow: "auto" }}
                    placeholder="Write a few sentences about journey..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-x-6">
          <button
            type="cancel"
            className="w-1/3 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-1/3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleClicks}
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
