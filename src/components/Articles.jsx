import { useState } from "react"
import { getArticles } from "./utils/utils"
import { useEffect } from "react"
import ArticleCards from "./ArticleCards"

function Articles() {
const [articles, setArticles] = useState([])
const [isLoading, setisLoading] = useState(true)

useEffect(() => {
    getArticles().then((data) => {
        setArticles(data.articles)
        console.log(data.articles)
    });
}, []);
 
return(
    <div>
    <h2>List Of Articles</h2>
    <div className="article-cards">
    {articles.map((article) => {
        return <ArticleCards key={article.article_id} article={article}/>
})}
</div>
    </div>
)
}
export default Articles