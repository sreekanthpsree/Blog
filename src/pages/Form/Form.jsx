import { doc } from "firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addBlog } from "../../blogManager/addBlog";
import { collection, db, getDocs } from "../../firebase/config";
import { updateBlog } from "../../blogManager/updateBlog";

import "./Form.css";

const Form = () => {
  const { id: blogId } = useParams();
  const Naviagte = useNavigate();
  const blogData = collection(db, "blog");
  const blogCollection = doc(collection(db, "blog"), blogId);

  const [formData, setFormData] = useState({
    blogName: "",
    blogContent: "",
    blogAuthor: "",
    createdDate: new Date(),
  });

  useEffect(() => {
    (async () => {
      getBlogs(blogId);
      setFormData({ blogAuthor: localStorage.getItem("name") });
    })();
  }, [blogId]);

  const getBlogs = async (blogId) => {
    const response = await getDocs(blogData);

    const allBlogPosts = response.docs.map((obj) => {
      return {
        ...obj.data(),
        id: obj.id,
      };
    });
    const blogPost = allBlogPosts.filter(function (blog) {
      return blog.id === blogId;
    });
    if (blogPost[0]) {
      setFormData({
        blogName: blogPost[0].title,
        blogContent: blogPost[0].content,
        blogAuthor: blogPost[0].author,
        createdDate: new Date(),
      });
    }
  };

  function isEditBlog() {
    return blogId !== "0" && blogId;
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isEditBlog()) {
      updateBlog(formData, blogCollection, Naviagte);
    } else {
      addBlog(formData, Naviagte);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="blogName"
          value={formData.blogName}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Content:
        <textarea
          className="blog_content"
          type="text"
          name="blogContent"
          value={formData.blogContent}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Author:
        <input
          type="text"
          name="blogAuthor"
          value={formData.blogAuthor}
          onChange={handleInputChange}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
