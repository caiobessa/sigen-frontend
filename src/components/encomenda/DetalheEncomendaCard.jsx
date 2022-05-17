import {Box} from "@mui/system";
import ButtonGroupEncomenda from "./ButtonGroupEncomenda";

export default function DetalheEncomendaCard({ produtos, handleAdicionarItemQuantidade }) {

    const normalizarItensProduto = (lista) => {
        let result = {}

        lista.forEach((itemProduto) => {
            const opcao = itemProduto.itemOpcao.opcao;
            const itemNome = itemProduto.itemOpcao.item.descricao;

            const itemAtualDoMap = result[itemNome] ? result[itemNome] : [];
            result[itemNome] = [...itemAtualDoMap, opcao]
        })
        return result;
    }


    function handleEvento(qtdSelecionada, valor, indexProduto, indexItem) {
        const total = valor * qtdSelecionada;
        handleAdicionarItemQuantidade({total, indexProduto, indexItem})
    }


    return (
        <Box sx={{
            display: 'flex',
            paddingLeft: '20%',
        }}>
            {produtos.map((produto, indexProduto) => (
                <Box
                    key={produto.id}
                    sx={{
                        background: 'white',
                        margin: '5px',
                        width: '25vw',
                    }}
                    elevation={3}
                >
                    <h2>{produto.nome}</h2>
                    <h3>{produto.unidadeMedida.descricao}</h3>
                    <h3>Valor Base {produto.valorBase}</h3>
                    {
                        Object.entries(normalizarItensProduto(produto.itensProduto)).map(([opcao, item]) => (
                            <Box key={opcao}>
                                <Box >{opcao}</Box>
                                <Box key={opcao}>
                                    {item.map((item, indexItem) => (
                                        <Box key={item.id}>
                                            <Box>{item.nome}</Box>
                                            <ButtonGroupEncomenda
                                                handleEvent={(evento) => handleEvento(evento, item.valor, indexProduto, indexItem)}
                                            />
                                            <Box>R${item.total || item.valor}</Box>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        ))
                    }

                    <label>Total produto R$ {produto.total || produto.valorBase}</label>
                </Box>
            ))}
        </Box>
    )
}
