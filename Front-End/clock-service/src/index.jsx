import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import { store } from "./utils/store/store";
import "./assets/fontawesome/css/fontawesome.css";
import "./assets/fontawesome/css/brands.css";
import "./assets/fontawesome/css/solid.css";
import "./assets/fontawesome/css/v5-font-face.css";
import "./assets/fontawesome/css/all.css";
import "./assets/fontawesome/css/v4-shims.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
