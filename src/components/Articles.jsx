import { useState } from "react";
import { getArticles } from "./utils/utils";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { useEffect } from "react";
import ArticleCards from "./ArticleCards";

function Articles() {
const { topic_slug } = useParams();
const [articles, setArticles] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);
const [searchParams, setSearchParams] = useSearchParams();
const sort_by = searchParams.get("sort_by");
const order = searchParams.get("order");

 useEffect(() => {
    setIsLoading(true);
    getArticles(topic_slug, sort_by, order)
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch(() => {
        setError("No articles available");
        setIsLoading(false);
      });
  }, [topic_slug, sort_by, order]);

  const handleSort = (event) => {
    const [sort_by, order] = event.target.value.split("-");
    setSearchParams({ sort_by, order });
  };

if(isLoading) {
    return <p className="Loading">Loading...</p>
}

if (error) {
  return <p>{error}</p>;
}

return(
    <div className="articles-container">
    <h1>Articles for {topic_slug ? topic_slug : "All Topics"}</h1>
    <Link to="/topics" className="topics-title">Topics</Link>
    <div>
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" onChange={handleSort} value={`${sort_by}-${order}`}>
          <option value="created_at-desc">Date (Newest)</option>
          <option value="created_at-asc">Date (Oldest)</option>
          <option value="votes-desc">Votes (High to Low)</option>
          <option value="votes-asc">Votes (Low to High)</option>
          <option value="comment_count-desc">Comments (Most)</option>
          <option value="comment_count-asc">Comments (Least)</option>
        </select>
      </div>
    <div className="article-cards">
    {articles.map((article) => {
        return <ArticleCards key={article.article_id} article={article}/>
})}
</div>
    </div>
)
}
export default Articles