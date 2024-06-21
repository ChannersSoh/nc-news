import { deleteCommentById, getCommentsByArticleId } from "./utils/utils"; 
import { useState, useEffect } from "react";

function Comments({ comments, setComments, singleArticle, user }) {
  const [deletingComment, setDeletingComment] = useState(null);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    getCommentsByArticleId(singleArticle.article_id)
      .then((data) => {
        if (data && data.comments) {
          setComments(data.comments);
        } 
      })
      .catch(() => {
        setError("Unable to retrieve comments");
      });
  }, []);
  

  const handleDelete = (comment_id) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.comment_id !== comment_id)
    );

    setDeletingComment(comment_id);

    deleteCommentById(comment_id)
      .then(() => {
        setDeletingComment(null);
        setDeleteSuccessMessage("Your comment has been deleted!");
        setTimeout(() => {
          setDeleteSuccessMessage("");
        }, 3000);
      })
      .catch(() => {
        setError("Unable to delete comment");
        setDeletingComment(null); 
      });
  };

  return (
    <div className="comments">
      <h2>Comments</h2>
      {error && <p className="error-message">{error}</p>}
      {deleteSuccessMessage && <p className="success-message">{deleteSuccessMessage}</p>}
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.comment_id} className="comment-card">
              <p>{comment.body}</p>
              <p>Posted by {comment.author}</p>
              <p>Created on: {new Date(comment.created_at).toLocaleString()}</p>
              <p>Votes: {comment.votes}</p>
              {deleteSuccessMessage && <p className="success-message">{deleteSuccessMessage}</p>}
              {user && user.username === comment.author && (
                <button
                  onClick={() => handleDelete(comment.comment_id)}
                  disabled={deletingComment === comment.comment_id}
                >
                  {deletingComment === comment.comment_id ? "Deleting..." : "Delete"}
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No Comments</p>
      )}
    </div>
  );
}

export default Comments;