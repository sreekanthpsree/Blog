import { updateDoc } from "firebase/firestore/lite";
// import { useNavigate } from "react-router-dom";

export const updateBlog = async (formData, documentRef, Naviagte) => {
  await updateDoc(documentRef, {
    author: formData.blogAuthor,
    title: formData.blogName,
    content: formData.blogContent,
    createdDate: new Date(),
  });
  Naviagte("/");
};
