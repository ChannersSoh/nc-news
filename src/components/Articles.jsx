import { useState } from "react"
import { getArticles } from "./utils/utils"
import { useEffect } from "react"
import ArticleCards from "./ArticleCards"

function Articles() {
const [articles, setArticles] = useState([])
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
    setIsLoading(true);
    getArticles().then((data) => {
        setArticles(data.articles);
        setIsLoading(false)
    });
}, []);
 
if(isLoading) {
    return <p className="Loading">Loading...</p>
}

return(
    <div>
    <h1>List Of Articles</h1>
    <div className="article-cards">
    {articles.map((article) => {
        return <ArticleCards key={article.article_id} article={article}/>
})}
</div>
    </div>
)
}
export default Articles