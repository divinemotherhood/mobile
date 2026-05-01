import RootNavigator from './navigation/RootNavigator';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "../i18n";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <RootNavigator />
        </LanguageProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
