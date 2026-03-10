import ReactDOM from "react-dom/client";
import Tasks from "./Tasks/Tasks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SettingsInitializer } from "./components/SettingsInitializer";
import { store } from "./store";
import { Provider as ReduxProvider } from 'react-redux';

const queryClient = new QueryClient();

class SettingsMFE extends HTMLElement {
    private root: ReactDOM.Root | null = null;

    connectedCallback() {
        
        if (!this.root) {
            this.root = ReactDOM.createRoot(this);
        }
        this.root.render(
            <ReduxProvider store={store}>
                <QueryClientProvider client={queryClient}>
                    <SettingsInitializer />
                    <Tasks />
                </QueryClientProvider>
            </ReduxProvider>
        );
    }

    disconnectedCallback() {
        if (this.root) {
            this.root.unmount();
            this.root = null;
        }
    }
}

if (!customElements.get('mfe-tasks')) {
    customElements.define('mfe-tasks', SettingsMFE);
}