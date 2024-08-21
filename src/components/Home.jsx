import React, { useState, useEffect } from 'react';
import { getMainArticle, getSideArticles } from './utils/utils'; 
import ArticleCards from './ArticleCards';

function Home() {
  const [mainArticle, setMainArticle] = useState(null);
  const [sideArticles, setSideArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; 

    getMainArticle()
      .then((data) => {
        if (isMounted) {
          setMainArticle(data);
          return getSideArticles(null, data.article_id);
        }
      })
      .then((data) => {
        if (isMounted) {
          setSideArticles(data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Error fetching articles:", err);
          setError("Error fetching articles. Please try again later.");
        }
      });

    return () => { isMounted = false }; 
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="home-container">
      <h1>Home</h1>
      <div className="main-article">
        {mainArticle && <ArticleCards article={mainArticle} />}
      </div>
      <section className="carousel" aria-label="Gallery">
        <ol className="carousel__viewport">
          {sideArticles.map((article, index) => {
            // Calculate the previous and next slide indices
            const prevIndex = (index - 1 + sideArticles.length) % sideArticles.length;
            const nextIndex = (index + 1) % sideArticles.length;
            
            // Log the current state for debugging
            console.log(`Slide ${index + 1}: Previous: #carousel__slide${prevIndex + 1}, Next: #carousel__slide${nextIndex + 1}`);
            
            return (
              <li
                key={article.article_id}
                id={`carousel__slide${index + 1}`}
                className="carousel__slide"
              >
                <ArticleCards article={article} />
                <a
                  href={`#carousel__slide${prevIndex + 1}`}
                  className="carousel__prev"
                >
                  ‹
                </a>
                <a
                  href={`#carousel__slide${nextIndex + 1}`}
                  className="carousel__next"
                >
                  ›
                </a>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}

export default Home;