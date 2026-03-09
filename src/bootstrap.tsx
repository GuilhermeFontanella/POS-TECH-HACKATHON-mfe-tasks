import ReactDOM from "react-dom/client";
import Tasks from "./Tasks/Tasks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//import App from "./App";

const queryClient = new QueryClient();

class SettingsMFE extends HTMLElement {
    private root: ReactDOM.Root | null = null;

    // O nome correto é connectedCallback (b minúsculo)
    connectedCallback() {
        //const shadow = this.attachShadow({ mode: 'open' });
        
        if (!this.root) {
            this.root = ReactDOM.createRoot(this);
        }
        this.root.render(
            <QueryClientProvider client={queryClient}>
                <Tasks />
            </QueryClientProvider>
        );
    }

    // Limpa o React quando o componente sai do DOM (Navegação do Angular)
    disconnectedCallback() {
        if (this.root) {
            this.root.unmount();
            this.root = null;
        }
    }
}

// Verifica se já não foi definido para evitar erro em Hot Reload
if (!customElements.get('mfe-tasks')) {
    customElements.define('mfe-tasks', SettingsMFE);
}