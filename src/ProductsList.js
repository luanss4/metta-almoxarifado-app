import React, { useEffect, useState } from "react";
import { getProdutos, deleteProduto } from "./api";
import { useNavigate } from "react-router-dom";

const ProductsList = () => {
    const [produtos, setProdutos] = useState([]);
    const navigate = useNavigate();

    // Carregar a lista de produtos ao montar o componente
    useEffect(() => {
        const fetchProdutos = async () => {
            const data = await getProdutos();
            setProdutos(data);
        };
        fetchProdutos();
    }, []);

    // Função para deletar produto
    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este produto?")) {
            await deleteProduto(id);
            setProdutos(produtos.filter((produto) => produto.id !== id));
        }
    };

    // Navegar para a página de criação/edição de produto
    const handleEdit = (id) => {
        navigate(`/produtos/${id}`);
    };

    return (
        <div>
            <h1>Lista de Produtos</h1>
            <button onClick={() => navigate("/produtos/novo")}>Novo Produto</button>
            <table border="1">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Quantidade</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {produtos.map((produto) => (
                    <tr key={produto.id}>
                        <td>{produto.id}</td>
                        <td>{produto.name}</td>
                        <td>
                            <button onClick={() => handleEdit(produto.id)}>Editar</button>
                            <button onClick={() => handleDelete(produto.id)}>Excluir</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsList;