import { collection, doc, deleteDoc } from "firebase/firestore/lite";
import "./Post.css";
import { db } from "../../firebase/config";

import { useNavigate } from "react-router-dom";
const navigate = useNavigate;
const BlogCard = (props) => {
  console.log(props);
  console.log(typeof props.date);

  const deleteHandler = (e) => {
    console.log(e.target);
    console.log(props.id);
    const deletRef = doc(collection(db, "blog"), props.id);
    deleteDoc(deletRef).then(() => {
      alert("Deleted successfully");
      window.location.href = "/";
    });
  };

  return (
    <div className="blog-card">
      <div>
        <div className="blog-card-content" onClick={(e) => {}}>
          <h2>{props.title}</h2>
          <p className="blog-card-author">{props.author}</p>
          <p className="blog-card-date">{props.date}</p>

          <p className="blog-card-date"></p>
          <p className="blog-card-text">{props.content}</p>
        </div>
        {localStorage.getItem("name") === props.author && (
          <div className="blog_card-buttons">
            <button className="delete" onClick={deleteHandler}>
              Delete
            </button>
            <button
              className="edit"
              onClick={() => {
                window.location.href = `/form/${props.id}`;
              }}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
