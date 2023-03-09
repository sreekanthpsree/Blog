import React, { useState } from "react";
import Post from "../../components/Post/Post";
import "./Blog.css";
import { collection, db, getDocs } from "../../firebase/config";
import { useEffect } from "react";

const blogData = collection(db, "blog");

function Blog() {
  const [blogDetails, setBlogDetails] = useState([]);
  useEffect(() => {
    (async () => {
      getBlogs();
    })();
  }, []);
  const getBlogs = async () => {
    await getDocs(blogData).then((response) => {
      const allPosts = response.docs.map((obj) => {
        return {
          ...obj.data(),
          id: obj.id,
        };
      });
      console.log(allPosts, "1");
      const dataPost = allPosts.sort(function (a, b) {
        var keyA = a.createdDate,
          keyB = b.createdDate;
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
      });
      console.log(dataPost, "3");
      setBlogDetails(allPosts);
    });
  };
  return (
    <div className="blog">
      <div className="blog_post">
        {blogDetails.map((obj) => {
          const options = { year: "numeric", month: "2-digit", day: "2-digit" };
          const date = obj.createdDate
            .toDate()
            .toLocaleDateString("en-in", options);
          // console.log(dateString);
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
