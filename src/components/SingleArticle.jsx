import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "./utils/utils";
import Comments from "./Comments";

function SingleArticle() {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then((data) => {
        setSingleArticle(data.articles);
        setIsLoading(false);
      }) 
      .catch(() => {
        setError("Unable to fetch article details");
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
console.log(singleArticle)
  return (
    <div className="single-article">
      <h1>{singleArticle.title}</h1>
      <img src={singleArticle.article_img_url} alt={singleArticle.title} />
      <p>Author: {singleArticle.author}</p>
      <p>Topic: {singleArticle.topic}</p>
      <p>{singleArticle.body}</p>
      <p>Date Written: {new Date(singleArticle.created_at).toLocaleDateString()}</p>
      <p>Votes: {singleArticle.votes}</p>
      <Comments article_id={article_id} singleArticle={singleArticle}/>
    </div>
  );
}

export default SingleArticle;
