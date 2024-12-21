import { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import ArticleForm from '../components/ArticleForm';
import articleService from '../services/articleService'; 

function Dashboard() {
  const [articles, setArticles] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [error, setError] = useState(null);

  const loadArticles = async () => {
    try {
      const response = await articleService.getAll();
      setArticles(response.data);
    } catch (error) {
      setError('Erro ao carregar artigos.');
      console.error(error);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleSubmit = async (data) => {
    try {
      if (editingArticle) {
        await articleService.update(editingArticle.id, data);
      } else {
        await articleService.create(data);
      }
      loadArticles();
      setOpen(false);
      setEditingArticle(null);
    } catch (error) {
      setError('Erro ao salvar artigo.');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      if (articleToDelete) {
        await articleService.delete(articleToDelete.id);
        loadArticles();
        setOpenDeleteDialog(false);
        setArticleToDelete(null);
      }
    } catch (error) {
      setError('Erro ao excluir artigo.');
      console.error(error);
    }
  };



  return (
    <>
      <Button 
        variant="contained" 
        onClick={() => setOpen(true)}
        sx={{ mb: 2 }}
      >
        Novo Artigo
      </Button>
      

      {error && <Alert severity="error">{error}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Resumo</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell>{article.title}</TableCell>
                <TableCell>{article.resume}</TableCell>
                <TableCell>
                  <Button 
                    onClick={() => {
                      setEditingArticle(article);
                      setOpen(true);
                    }}
                  >
                    Editar
                  </Button>
                  <Button 
                    color="error"
                    onClick={() => {
                      setArticleToDelete(article);
                      setOpenDeleteDialog(true);
                    }}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={open} 
        onClose={() => {
          setOpen(false);
          setEditingArticle(null);
        }}
      >
        <DialogTitle>
          {editingArticle ? 'Editar Artigo' : 'Novo Artigo'}
        </DialogTitle>
        <DialogContent>
          <ArticleForm 
            onSubmit={handleSubmit}
            initialData={editingArticle}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={openDeleteDialog} 
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          Tem certeza que deseja excluir este artigo?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>
            Cancelar
          </Button>
          <Button 
            color="error" 
            onClick={handleDelete}
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Dashboard;
