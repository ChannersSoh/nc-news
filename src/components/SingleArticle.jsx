import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticleId, voteOnArticle } from "./utils/utils";
import Comments from "./Comments";
import AddComment from "./AddComment";

function SingleArticle({ user }) {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [commentSuccessMessage, setCommentSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [voteChange, setVoteChange] = useState(0);
  const [currentVotes, setCurrentVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false); 

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then((data) => {
        setSingleArticle(data.articles);
        setCurrentVotes(data.articles.votes); 
        const hasVotedInSession = sessionStorage.getItem(`voted_${article_id}`);
        if (hasVotedInSession) {
          setHasVoted(true);
        }
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

  useEffect(() => {
    console.log("Hello")
    if (voteChange !== 0) {
      setHasVoted(true);
      sessionStorage.setItem(`voted_${article_id}`, true);
    }
  }, [voteChange, article_id]); 

  const handleVote = (increment) => {
    if (hasVoted) {
      setError("You have already voted on this article during this session.");
      return;
    }
  
    const newVote = currentVotes + increment;
  
  
    setVoteChange(voteChange + increment); 
  
    voteOnArticle(article_id, increment)
      .then(() => {
        setCurrentVotes(newVote); 
        setHasVoted(true); 
        sessionStorage.setItem(`voted_${article_id}`, true); 
      })
      .catch(() => {
        setVoteChange(voteChange - increment); 
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
      <p>Votes: {currentVotes + voteChange}</p>
      <button onClick={() => handleVote(1)} disabled={hasVoted}>
        Upvote
      </button>
      <button onClick={() => handleVote(-1)} disabled={hasVoted}>
        Downvote
      </button>
      {commentSuccessMessage && <p className="success-message">{commentSuccessMessage}</p>}
      <AddComment article_id={article_id} handleCommentAdded={handleCommentAdded} user={user} />
      <Comments comments={comments} setComments={setComments} singleArticle={singleArticle} user={user} />
    </div>
  );
}

export default SingleArticle;