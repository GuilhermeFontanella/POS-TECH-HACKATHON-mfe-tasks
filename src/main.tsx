import { createRoot } from 'react-dom/client'
import Tasks from './Tasks/Tasks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { store } from './store/index.ts';
import { Provider as ReduxProvider } from 'react-redux';
import { SettingsInitializer } from './components/SettingsInitializer.tsx';


const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <SettingsInitializer />
        <Tasks />
      </QueryClientProvider>
  </ReduxProvider>
)
