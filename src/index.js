import React from 'react';
import './index.css';
import App from './App';
import LoginPage from './pages/LoginPage'
import reportWebVitals from './reportWebVitals';
import { render } from "react-dom";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UsuarioPage from './pages/UsuarioPage';
import {Provider} from "react-redux";
import store from "./store/store";
import SnackbarMensagem from "./components/snackbar/SnackbarMensagem";
import CadastroUnidadeMedidaPage from "./pages/CadastroUnidadeMedidaPage";
import HomePage from "./pages/HomePage";
import {Box} from "@mui/material";
import ProdutoPage from "./pages/ProdutoPage";
import AdministradorPage from "./pages/AdministradorPage";


const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Provider store={store}>
        <SnackbarMensagem />
        <App />
        <Box sx={{ pt: 5}} >
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/usuario" element={<UsuarioPage />} />
                <Route path="/unidade-medida" element={<CadastroUnidadeMedidaPage />} />
                <Route path="/produto" element={<ProdutoPage />} />
                <Route path="/administrador" element={<AdministradorPage />} />
            </Routes>
        </Box>
    </Provider>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
