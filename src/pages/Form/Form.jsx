import { doc, updateDoc } from "firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, db, getDocs } from "../../firebase/config";

import "./Form.css";

const Form = () => {
  const blogData = collection(db, "blog");
  // let date = new Date();
  const Naviagte = useNavigate();
  const [formData, setFormData] = useState({
    blogName: "",
    blogContent: "",
    blogAuthor: "",
    createdDate: new Date(),
  });

  const [errorValues, setErrorvalues] = useState({});
  useEffect(() => {
    setFormData({ blogAuthor: localStorage.getItem("name") });
  }, []);
  useEffect(() => {
    let url = new URL(window.location.href).toString().split("/");
    url = url[url.length - 1];
    (async () => {
      getBlogs(url);
    })();
  }, []);
  const getBlogs = async (url) => {
    await getDocs(blogData).then((response) => {
      const allPosts = response.docs.map((obj) => {
        return {
          ...obj.data(),
          id: obj.id,
        };
      });
      const list = allPosts.filter(function (el) {
        return el.id === url;
      });
      console.log(list);
      setFormData({
        blogName: list[0].title,
        blogContent: list[0].content,
        blogAuthor: list[0].author,
        createdDate: new Date(),
      });
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target.value);
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const validate = (values) => {
    const errors = {};

    if (!formData.title) {
      errors.title = "Please enter a title";
    }
    if (!formData.content) {
      errors.content = "Content is required";
    }
    if (!formData.author) {
      errors.author = "Enter authors name";
    }
    console.log(errorValues);
    return errors;
  };
  const blogs = collection(db, "blog");
  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = new URL(window.location.href).toString().split("/");
    url = url[url.length - 1];
    if (url !== "0" && url) {
      console.log("1...", formData);
      console.log(new Date());
      const documentRef = doc(collection(db, "blog"), url);
      console.log(documentRef);
      // const documentRef = doc(firestore, "blog", url);
      await updateDoc(documentRef, {
        author: formData.blogAuthor,
        title: formData.blogName,
        content: formData.blogContent,
        createdDate: new Date(),
      }).then(() => {
        Naviagte("/");
      });
    } else {
      // alert("2...");
      // console.log("asdasd");
      e.preventDefault();
      console.log(formData.blogName, formData.blogAuthor, formData.blogContent);
      addDoc(blogs, {
        author: formData.blogAuthor,
        title: formData.blogName,
        content: formData.blogContent,
        createdDate: new Date(),
      }).then(() => {
        Naviagte("/");
      });
    }

    console.log(formData);
    // setErrorvalues(validate(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="blogName"
          value={formData.blogName}
          onChange={handleInputChange}
        />
        <p>{errorValues.title}</p>
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
      <p>{errorValues.content}</p>

      <label>
        Author:
        <input
          type="text"
          name="blogAuthor"
          value={formData.blogAuthor}
          onChange={handleInputChange}
        />
      </label>
      <p>{errorValues.author}</p>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
