import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HomePage } from './Pages/Home/HomePage';
import { MediaPage } from './pages/Media/MediaPage';
import { ThemeProvider } from 'styled-components';
import { myTheme } from './styles/theme';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/media/:mediaId',
    element: <MediaPage />
  }
])

function App() {

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
})
  return (
    <ThemeProvider theme={myTheme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
