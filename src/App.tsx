import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "components/Header";
import { StoryList } from "components/StoryList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <StoryList />
    </QueryClientProvider>
  );
}

export default App;
