import { useEffect, useState } from "react";
import { getCommentsByArticleId } from "./utils/utils";

function Comments({ article_id, singleArticle }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getCommentsByArticleId(article_id)
      .then((data) => {
        setComments(data.comments);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching comments: ", error);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    return <p>Loading comments...</p>;
  }

console.log(singleArticle)

  return (
    <div className="comments">
      <h2>Comments</h2>
      <p>Comments: {singleArticle.comment_count}</p>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.comment_id} className="comment-card">
              <p>Author: {comment.author}</p>
              <p>{comment.body}</p>
              <p>Date: {new Date(comment.created_at).toLocaleDateString()}</p>
              <p>Votes: {comment.votes}</p>
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