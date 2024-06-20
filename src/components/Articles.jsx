import { useState } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "./utils/utils";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getArticlesByTopic } from "./utils/utils";
import ArticleCards from "./ArticleCards";

function Articles() {
const { topic_slug } = useParams();
const [articles, setArticles] = useState([])
const [isLoading, setIsLoading] = useState(true)


useEffect(() => {
    setIsLoading(true);
    getArticlesByTopic(topic_slug).then((data) => {
      setArticles(data.articles);
      setIsLoading(false);
    });
  }, [topic_slug]);

if(isLoading) {
    return <p className="Loading">Loading...</p>
}

return(
    <div className="articles-container">
    <h1>Articles for {topic_slug ? topic_slug : "All Topics"}</h1>
    <Link to="/topics" className="topics-title">Topics</Link>
    <div className="article-cards">
    {articles.map((article) => {
        return <ArticleCards key={article.article_id} article={article}/>
})}
</div>
    </div>
)
}
export default Articles