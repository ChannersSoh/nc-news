import { Link } from "react-router-dom"


function ArticleCards({article}) {
return (
    <div className="article-card">
      <Link to={`/articles/${article.article_id}`}>
        <img src={article.article_img_url} alt={article.title} className="article-image" />
        <h3>{article.title}</h3>
        <p>Author: {article.author}</p>
        <p>Topic: {article.topic}</p>
        <p>Date Written: {new Date(article.created_at).toLocaleDateString()}</p>
        <p>Votes: {article.votes}</p>
        <p>Comments: {article.comment_count}</p>
      </Link>
    </div>
)
}

export default ArticleCards