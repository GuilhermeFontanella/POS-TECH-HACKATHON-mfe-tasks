import React from "react";
import ReactDOM from "react-dom/client";
import Tasks from "./Tasks/Tasks";
//import App from "./App";


class SettingsMFE extends HTMLElement {
    private root: ReactDOM.Root | null = null;

    // O nome correto é connectedCallback (b minúsculo)
    connectedCallback() {
        //const shadow = this.attachShadow({ mode: 'open' });
        
        if (!this.root) {
            this.root = ReactDOM.createRoot(this);
        }
        this.root.render(
            <React.StrictMode>
                <Tasks />
            </React.StrictMode>
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