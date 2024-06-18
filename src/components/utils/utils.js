import axios from 'axios';

const ncNewsApi = axios.create({
    baseURL: "https://nc-news-6t8x.onrender.com/api"
});

export const getArticles = () => {
    return ncNewsApi.get("/articles").then((response) => {
        return response.data
    }).catch((error) => {
            console.log(error);
        })
        
};

export const getArticleById = (id) => {
    return ncNewsApi.get(`/articles/${id}`).then((response) => {
        return response.data
    }).catch((error) => {
            console.log(error);
        })
        
};

export const getCommentsByArticleId = (id) => {
    return ncNewsApi.get(`/articles/${id}/comments`).then((response) => {
        return response.data
    }).catch((error) => {
            console.log(error);
        })
        
};
