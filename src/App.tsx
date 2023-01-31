import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "components/Header";
import { StoryList } from "components/StoryList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-screen-xl h-100 mx-auto px-16 py-8 flex flex-col gap-8 bg-white">
        <Header />
        <StoryList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
