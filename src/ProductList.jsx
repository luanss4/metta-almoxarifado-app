import React, { useEffect, useState } from "react";
import { getProdutos, deleteProduto } from "./api"; // Certifique-se de que a API está funcionando corretamente
import { toast } from 'react-toastify';
const ProductList = () => {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);

    const carregarProdutos = async () => {
        try {
            const produtosData = await getProdutos();
            setProdutos(produtosData);
        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarProdutos();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteProduto(id);
            toast.success('Produto excluído com sucesso!');
            carregarProdutos();
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            toast.error('Erro ao excluir produto.');
        }
    };

    if (loading) {
        return <p>Carregando produtos...</p>;
    }

    return (
        <div>
            <h1>Lista de Produtos</h1>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {produtos.map((produto) => (
                    <tr key={produto.id}>
                        <td>{produto.id}</td>
                        <td>{produto.nome}</td>
                        <td>R$ {produto.preco.toFixed(2)}</td>
                        <td>
                            <button onClick={() => handleDelete(produto.id)}>
                                Excluir
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
