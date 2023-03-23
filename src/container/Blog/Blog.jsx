import React, { useState } from "react";
import Post from "../../components/Post/BlogPost";
import "./Blog.css";
import { collection, db, getDocs } from "../../firebase/config";
import { useEffect } from "react";
import { sort } from "../../helpers/Sorting";

const blogCollection = collection(db, "blog");

function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    (async () => {
      getBlogs();
    })();
  }, [blogPosts]);

  const getBlogs = async () => {
    const response = await getDocs(blogCollection);
    const blogs = response.docs.map((blogData) => {
      return {
        ...blogData.data(),
        id: blogData.id,
      };
    });
    sort(blogs);
    setBlogPosts(blogs);
  };

  return (
    <div className="blog">
      <div className="blog_post">
        {blogPosts.map((obj) => {
          const options = { year: "numeric", month: "2-digit", day: "2-digit" };
          const date = obj.createdDate
            .toDate()
            .toLocaleDateString("en-in", options);
          return (
            <Post
              id={obj.id}
              key={obj.id}
              title={obj.title}
              content={obj.content}
              author={obj.author}
              date={date}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Blog;
