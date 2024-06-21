import { useState } from "react";
import { postComment } from "./utils/utils";

function AddComment({ article_id, user, handleCommentAdded }) {
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!commentText) {
      setError("Please enter your comment.");
      return;
    };

    if (!user) {
      setError("You must be logged in to post a comment.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const username = user.username;

    postComment(article_id, { body: commentText, username })
      .then((newComment) => {
        setCommentText("");
        setIsSubmitting(false);
        handleCommentAdded(newComment);
      })
      .catch((error) => {
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
        <textarea
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
          placeholder="Write your comment here..."
          required
        />
      </div>
      <button type="submit" disabled={isSubmitting}>
      {error && <p className="error-message">{error}</p>}
        {isSubmitting ? "Submitting..." : "Submit Comment"}
      </button>
    </form>
  );
}

export default AddComment;