import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App';

const client = new QueryClient();

const app = (
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(app);
