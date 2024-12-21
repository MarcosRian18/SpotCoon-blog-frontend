import { useState, useEffect } from 'react';
import { Grid, Typography, CircularProgress } from '@mui/material';
import ArticleCard from '../components/ArticleCard';
import api from '../services/api';

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/articles')
      .then(response => {
        setArticles(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar artigos:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Artigos Recentes
      </Typography>
      <Grid container spacing={3}>
        {articles.map(article => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <ArticleCard article={article} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Home;