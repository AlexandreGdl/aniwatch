import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Home } from './Pages/Home';
import { Media } from './Pages/Media/Media';
import { ThemeProvider } from 'styled-components';
import { myTheme } from './styles/theme';

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
