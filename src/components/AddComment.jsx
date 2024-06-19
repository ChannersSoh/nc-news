import { useState } from "react";
import { postComment } from "./utils/utils";

function AddComment({ article_id, onCommentAdded }) {
  const [commentText, setCommentText] = useState("");
  const [username, setUsername] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!commentText || !username) {
      setError("Please fill out all fields.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    postComment(article_id, { body: commentText, username })
      .then((newComment) => {
        setCommentText("");
        setUsername("");
        setIsSubmitting(false);
        onCommentAdded(newComment);
      })
      .catch(() => {
        console.error("Post comment error:", error);
        setError("Unable to post comment. Please try again."); 
        setIsSubmitting(false);
      });
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <h2>Add a Comment</h2>
      <div>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Your Username here..."
          required
        />
      </div>
      <div>
        <textarea
          value={commentText}
          onChange={(event) => {setCommentText(event.target.value)}}
          placeholder="Write your comment here..."
          required
        />
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Comment"}
      </button>
    </form>
  );
}

export default AddComment