import { useState, useEffect } from 'react';
import { getMainArticle, getSideArticles } from './utils/utils'; 
import ArticleCards from './ArticleCards'

function Home() {
  const [mainArticle, setMainArticle] = useState(null);
  const [sideArticles, setSideArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMainArticle()
      .then((data) => {
        setMainArticle(data);
        return getSideArticles(null, data.article_id);
      })
      .then((data) => setSideArticles(data))
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setError("Error fetching articles. Please try again later.");
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="home-container">
      <h1>Home</h1>
      <div className="articles-layout">
        {mainArticle && (
          <div className="main-article">
            <ArticleCards article={mainArticle} />
          </div>
        )}
        <div className="side-articles">
          {sideArticles.map((article) => (
            <div key={article.article_id} className="side-article">
              <ArticleCards article={article} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;