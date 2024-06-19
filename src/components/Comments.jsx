function Comments({ comments, singleArticle }) {

  return (
    <div className="comments">
      <h2>Comments</h2>
      <p>Comments: {singleArticle.comment_count}</p>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.comment_id} className="comment-card">
              <p>{comment.body}</p>
              <p>Posted by {comment.author}</p>
              <p>created on: {new Date(comment.created_at).toLocaleString()}</p>
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