import { useRoutes } from 'react-router-dom';
import router from 'src/router';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import { AuthGuard } from './content/auth/authGuard';

function App() {
  const content = useRoutes(router);
  return (
    <ThemeProvider>
      <CssBaseline />
      <AuthGuard>{content}</AuthGuard>
    </ThemeProvider>
  );
}
export default App;
