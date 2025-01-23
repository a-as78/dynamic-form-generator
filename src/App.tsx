
import { Routes, Route, Link } from 'react-router-dom';
import { Container, Box, Button, Typography } from '@mui/material';
import FormBuilder from './components/FormBuilder/FormBuilder';
import FormList from './components/FormList/FormList';
import FormViewer from './components/FormRenderer/FormViewer';

function App() {

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Button component={Link} to="/builder" variant="contained" sx={{ mr: 2 }}>
          Builder
        </Button>
        <Button component={Link} to="/forms" variant="contained">
          Forms
        </Button>
      </Box>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/builder" element={<FormBuilder />} />
        <Route path="/forms" element={<FormList />} />
        <Route path="/forms/:id" element={<FormViewer />} />
      </Routes>
    </Container>
  );
}

function HomePage() {
  return <Typography variant="h4">Welcome to the Dynamic Form Generator!</Typography>;
}

export default App;
