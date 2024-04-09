import { useState } from "react";

import toast from "react-hot-toast";
function usePreviewImage() {
  const [img, setImg] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("invalid file format,pls select image file");
      setImg(null);
    }
  };
  return { handleImageChange, img, setImg };
}

export default usePreviewImage;
