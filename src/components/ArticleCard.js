import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function ArticleCard({ article }) {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {article.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {article.resume}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          component={Link} 
          to={`/article/${article.slug}`}
        >
          Ler mais
        </Button>
      </CardActions>
    </Card>
  );
}

export default ArticleCard;