import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticleId } from "./utils/utils";
import { voteOnArticle } from "./utils/utils";
import Comments from "./Comments";
import AddComment from "./AddComment";

function SingleArticle() {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [commentSuccessMessage, setCommentSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [voteChange, setVoteChange] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then((data) => {
        setSingleArticle(data.articles);
        return getCommentsByArticleId(article_id);
      }) 
      .then((data) => {
        setComments(data.comments);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Unable to fetch article details");
        setIsLoading(false);
      });
  }, [article_id]);

  const handleVote = (increment) => {
    setVoteChange((vote) => vote + increment);
    voteOnArticle(article_id, increment).catch(() => {
      setVoteChange((vote) => vote - increment);
      setError("Something went wrong, please try again.");
    });
  };

  const handleCommentAdded = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
    setCommentSuccessMessage("Your comment has been posted!");
    setTimeout(() => {
      setCommentSuccessMessage("");
    }, 3000); 
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="single-article">
      <h1>{singleArticle.title}</h1>
      <img src={singleArticle.article_img_url} alt={singleArticle.title} />
      <p>Author: {singleArticle.author}</p>
      <p>Topic: {singleArticle.topic}</p>
      <p>{singleArticle.body}</p>
      <p>Date Written: {new Date(singleArticle.created_at).toLocaleDateString()}</p>
      <p>Votes: {singleArticle.votes + voteChange}</p>
      <button onClick={() => handleVote(1)}>Upvote</button>
      <button onClick={() => handleVote(-1)}>Downvote</button>
      {commentSuccessMessage && <p className="success-message">{commentSuccessMessage}</p>}
      <AddComment article_id={article_id} onCommentAdded={handleCommentAdded} />
      <Comments comments={comments} singleArticle={singleArticle}/>
    </div>
  );
}

export default SingleArticle;
