import api from './api';
import axios from 'axios';

const articleService = {
   
     getCsrfToken: async () => {
        try {
            
            const response = await api.get('/get-csrf-token');
            
           
            console.log(response.data.csrf_token)
            return response.data.csrf_token

          } catch (error) {
            console.error("Erro ao obter o CSRF Token:", error);
            return null;
          }
      },

    
    getAll: () => {
        return api.get('/articles');
    },

   
    getById: (id) => {
        return api.get(`/articles/${id}`);
    },

    
    create:   (data) => {
      
        return api.post('/articles', data);
    },

    
    update: (id, data) => {
        return api.put(`/articles/${id}`, data);
    },

    
    delete: (id) => {
        return api.delete(`/articles/${id}`);
    }
};

export default articleService;
