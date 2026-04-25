import { useEffect } from 'react';
import SplashScreen from "react-native-splash-screen";
import RootNavigator from './navigation/RootNavigator';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RootNavigator />
      </QueryClientProvider>
    </>
  );
}

export default App;
