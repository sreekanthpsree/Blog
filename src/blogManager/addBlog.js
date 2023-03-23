import { collection, db, addDoc } from "../firebase/config";

const blogData = collection(db, "blog");
export const addBlog = async (formData, Naviagte) => {
  await addDoc(blogData, {
    author: formData.blogAuthor,
    title: formData.blogName,
    content: formData.blogContent,
    createdDate: new Date(),
  });
  Naviagte("/");
};
