import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Paper, CircularProgress } from '@mui/material';
import api from '../services/api';

function Article() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    api.get(`/articles/${slug}`)
      .then(response => {
        setArticle(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar artigo:', error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <CircularProgress />;
  if (!article) return <Typography>Artigo não encontrado</Typography>;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {article.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {article.resume}
      </Typography>
      <Typography variant="body1">
        {article.article}
      </Typography>
    </Paper>
  );
}

export default Article;