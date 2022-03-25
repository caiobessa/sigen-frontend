import {Box} from '@mui/material';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {mostrarMensagemErro, mostrarMensagemSucesso} from "../store/snackbar-reducer";
import {useDispatch} from "react-redux";
import axiosSemAutorizacao from "../util/axios/axiosSemAutorizacao";
import FormUsuario from "../components/usuario/FormUsuario";


export default function UsuarioPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const cadastrarUsuario = async (event) => {
        try {
            const newUsuario = {...event};
            delete newUsuario.repetirSenha;
            await axiosSemAutorizacao.post("/usuarios", {...newUsuario});
            dispatch(mostrarMensagemSucesso('Usuário cadastrado com sucesso.'));
            navigate('/')
        } catch (error) {
            console.error(error);
            dispatch(mostrarMensagemErro('Erro ao cadastrar usuário.'));
        }
    }

    const cancelar = async () => {
        navigate('/')
    }

    return (
       <Box>
           <h1>Usuario</h1>
           <FormUsuario cadastrar={cadastrarUsuario} mostraBotaoCancelar={true} cancelar={cancelar} />
       </Box>
    );
}

