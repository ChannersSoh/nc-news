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

export const voteOnArticle = (id, voteChange) => {
    return ncNewsApi.patch(`/articles/${id}`, { inc_votes: voteChange }).then((response) => {
        return response.data
    }).catch((error) => {
            console.log(error);
        })
        
};

export const postComment = (article_id, commentData) => {
    const { username, body } = commentData;
    console.log("Posting comment:", commentData);
    return ncNewsApi.post(`/articles/${article_id}/comments`, { username, body })
      .then((response) => {
        console.log("Response:", response.data);
        return response.data.comment;
      }) 
      .catch((error) => {
        console.error("Error posting comment:", error);
        throw error; 
      });
  };

  export const deleteCommentById = (comment_id) => {
    return ncNewsApi.delete(`/comments/${comment_id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };

  export const getUserByUsername = (username) => {
    return ncNewsApi.get('/users')
      .then((response) => {
        const user = response.data.users.find(user => user.username === username);
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        throw error;
      });
  };