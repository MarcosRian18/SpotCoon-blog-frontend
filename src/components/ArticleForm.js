import { useState, useEffect } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import articleService from '../services/articleService';

function ArticleForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    title: '',
    resume: '',
    article: '',
    _token: ''
  });

  
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await articleService.getCsrfToken()
    console.log(token)

    if(!localStorage.getItem('crsf_token')){
     localStorage.setItem('crsf_token', token)
    }

      formData._token = localStorage.getItem('crsf_token')
    onSubmit(formData);
  };



  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} sx={{ mt: 2 }}>
        <TextField
          name="title"
          label="Título"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          name="resume"
          label="Resumo"
          value={formData.resume}
          onChange={handleChange}
          fullWidth
          multiline
          rows={2}
          required
        />
        <TextField
          name="article"
          label="Artigo"
          value={formData.article}
          onChange={handleChange}
          fullWidth
          multiline
          rows={6}
          required
        />
        <Button type="submit" variant="contained">
          {initialData ? 'Atualizar' : 'Criar'}
        </Button>
      </Stack>
    </form>
  );
}

export default ArticleForm;