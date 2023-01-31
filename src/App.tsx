import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "components/Header";
import { StoryList } from "components/StoryList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-screen-lg h-full mx-auto px-4 flex flex-col gap-8">
        <Header />
        <StoryList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
