import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StoriesList } from "./components/StoriesList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StoriesList />
    </QueryClientProvider>
  );
}

export default App;
