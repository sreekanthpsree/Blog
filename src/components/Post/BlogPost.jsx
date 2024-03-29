import { collection, doc, deleteDoc } from "firebase/firestore/lite";
import "./Post.css";
import { db } from "../../firebase/config";

const BlogCard = (props) => {
  const blogDeleteHandler = () => {
    const deletRef = doc(collection(db, "blog"), props.id);
    deleteDoc(deletRef).then(() => {
      alert("Deleted successfully");
    });
  };

  return (
    <div className="blog-card">
      <div>
        <div className="blog-card-content">
          <h2>{props.title}</h2>
          <p className="blog-card-author">{props.author}</p>
          <p className="blog-card-date">{props.date}</p>

          <p className="blog-card-date"></p>
          <p className="blog-card-text">{props.content}</p>
        </div>
        {localStorage.getItem("name") === props.author && (
          <div className="blog_card-buttons">
            <button className="delete" onClick={blogDeleteHandler}>
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
