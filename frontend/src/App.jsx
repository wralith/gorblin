import Goblin from './components/goblin'
import Layout from './components/UI/Layout'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <Goblin />
      </QueryClientProvider>
    </Layout>
  )
}

export default App
