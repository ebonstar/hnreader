import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StoryList } from "components/StoryList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StoryList />
    </QueryClientProvider>
  );
}

export default App;
