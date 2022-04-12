import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { mostrarMensagemErro, mostrarMensagemSucesso } from '../../store/snackbar-reducer';
import axiosComAutorizacao from '../../util/axios/axiosComAutorizacao';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';

export default function MedidaAbreviacaoDialog(props) {
    const dispatch = useDispatch();

    const validacaoAbreviacaoMedida = Yup.object().shape({
        abreviacao: Yup.string()
            .required('campo obrigatório')
    })

    const cadastrarMedidaAbreviacao = async (abreviacao) => {
        try {
            await axiosComAutorizacao.post("/unidades-medida", abreviacao)
            dispatch(mostrarMensagemSucesso('Abreviação de unidade de medida cadastrada com sucesso.'))
            props.fecharDialog();
            await props.atualizarAbreviacaoMedida();
        } catch (error) {
            console.log(error);
            dispatch(mostrarMensagemErro('Erro ao tentar cadastrar de unidade de medida'))
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validacaoAbreviacaoMedida)
    });

    return (
        <Dialog
            open={props.mostrarDialog}
            onClose={props.fecharDialog}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {"Escreva o nome da nova abreviação de unidade de medida"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <TextField
                        required
                        variant="standard"
                        id="nome-abreviacaoMedida"
                        label="Abreviação de unidade de medida"
                        type="text"
                        {...register('abreviacao')}
                        error={errors.abreviacao ? true : false}
                    />
                    <Typography variant="inherit" color="#d32f2f">
                        {errors.abreviacao?.message}
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={props.fecharDialog}>
                    Cancelar
                </Button>
                <Button onClick={handleSubmit(cadastrarMedidaAbreviacao)} autoFocus>
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

