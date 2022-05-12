import {Box, FormControl, InputLabel, MenuItem, Select, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import axiosComAutorizacao from '../../../util/axios/axiosComAutorizacao';
import ItemProdutoDialog from './ItemProdutoDialog';
import {useDispatch} from "react-redux";
import {atualizarItensOpcao} from "../../../store/produto-reducer";

export default function ItemProdutoSelect(props) {
    const [open, setOpen] = useState(false);
    const [itensProduto, setItensProduto] = useState([]);
    const dispatch = useDispatch();

    useEffect(async () => {
        await recuperarDescricaoProduto();
      }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const atualizarValorItemProduto = (evento) => {
        dispatch(atualizarItensOpcao(evento.target.value))
    }

    const recuperarDescricaoProduto = async () => {
        try {
          const { data } = await axiosComAutorizacao.get("/itens-opcao");
          setItensProduto(data);
        } catch (error) {
          console.log(error);
        }
      }



    return (
        <Box sx={{ width: '140%' }}>

            <Typography>
                Itens do produto:
            </Typography>
            <ItemProdutoDialog
            mostrarDialog={open}
            fecharDialog={handleClose}
            atualizarDescricaoItemProduto={recuperarDescricaoProduto}
            />
            <FormControl sx={{ width: '140%' }} >
                <InputLabel id="demo-simple-select-label" >
                    Descrição
                </InputLabel>
                <Select
                    required
                    variant="filled"
                    id="descricao-do-produto"
                    label="Descrição do produto"
                    type="text"
                    onChange={atualizarValorItemProduto}
                // {...register('descricao')}
                // error={errors.descricao ? true : false}
                >
                    <MenuItem onClick={handleClickOpen}>Criar Descrição</MenuItem>
                    {itensProduto.map((itemProduto) =>
                    (
                        <MenuItem
                            key={itemProduto.id}
                            value={itemProduto.id}>
                            {itemProduto.item.descricao} - { itemProduto.opcao.nome }
                        </MenuItem>
                    )
                    )}
                </Select>
                {/* <Typography variant="inherit" color="#d32f2f">
                    {errors.descricao?.message}
                </Typography> */}
            </FormControl>
        </Box >
    );
}


