import React, { useEffect, useState } from "react";
import { getProdutos, deleteProduto } from "./api";
import { toast } from "react-toastify";

const ProductList = () => {
    const [produtos, setProdutos] = useState([]); // Array inicial
    const [loading, setLoading] = useState(true);

    const carregarProdutos = async () => {
        try {
            const produtosData = await getProdutos();
            console.log("Dados retornados pela API:", produtosData); // Verifique o que é retornado
            // Certifique-se de que é uma array antes de usar setProdutos
            setProdutos(Array.isArray(produtosData) ? produtosData : []);
        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
            setProdutos([]); // Em caso de erro, mantemos uma array vazia
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
            toast.success("Produto excluído com sucesso!");
            carregarProdutos(); // Recarregar produtos após exclusão
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            toast.error("Erro ao excluir produto.");
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
                {Array.isArray(produtos) && produtos.length > 0 ? (
                    produtos.map((produto) => (
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
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">Nenhum produto encontrado</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;