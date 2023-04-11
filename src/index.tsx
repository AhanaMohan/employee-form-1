import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import 'nprogress/nprogress.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import { HeaderProvider } from 'src/contexts/HeaderContext';

// React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Create a client
const queryClient = new QueryClient();

ReactDOM.render(
  // Provide the client to your App
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <SidebarProvider>
        <HeaderProvider>
          <BrowserRouter basename="/">
            <App />
          </BrowserRouter>
        </HeaderProvider>
      </SidebarProvider>
    </HelmetProvider>
  </QueryClientProvider>,
  document.getElementById('root')
);
