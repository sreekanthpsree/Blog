import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import { useState } from "react";
const Modal = ({ title, content, onClose, author }) => {
  const modalRoot = document.createElement("div");
  const [modalvalues, setModalValues] = useState({
    author: author,
    title: title,
    content: content,
  });
  const editSubmitHandler = () => {};
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setModalValues((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = () => {};

  useEffect(() => {
    document.body.appendChild(modalRoot);
    return () => {
      document.body.removeChild(modalRoot);
    };
  }, [modalRoot]);

  return ReactDOM.createPortal(
    <div className="modal-container">
      <div className="modal">
        <div className="modal-header">
          <h2>Edit your blog</h2>
          <button className="close-button">&times;</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                name="blogName"
                value={modalvalues.title}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Content:
              <input
                type="text"
                name="blogContent"
                value={modalvalues.content}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Author:
              <input
                type="text"
                name="blogAuthor"
                value={modalvalues.author}
                onChange={handleInputChange}
              />
            </label>

            <button type="submit" onClick={editSubmitHandler}>
              Submit
            </button>
          </form>
        </div>
        <div className="modal-footer">
          <button className="cancel-button">Cancel</button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
