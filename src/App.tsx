import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { GlobalStyle } from './styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Media } from './pages/Media';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/media/:mediaId',
    element: <Media />
  }
])

function App() {

const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
