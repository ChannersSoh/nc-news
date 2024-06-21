import axios from 'axios';

const ncNewsApi = axios.create({
    baseURL: "https://nc-news-6t8x.onrender.com/api"
});

export const getArticles = (topic_slug, sort_by = 'created_at', order = 'desc') => {
  return ncNewsApi.get(`/articles`, { params: { topic: topic_slug, sort_by, order } })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching articles for this topic:", error);
      throw error;
    });
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
    const { username, body } = commentData
    return ncNewsApi.post(`/articles/${article_id}/comments`, { username, body })
      .then((response) => {
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

  export const getTopics = () => {
    return ncNewsApi.get("/topics").then((response) => {
      return response.data;
    }) .catch((error) => {
        console.error("Error fetching topics:", error);
        throw error;
      });
  };

  

 