import axios from "axios";

// Base URL da API
const API_URL = process.env.REACT_APP_BACKEND_URL;

// Configuração com axios
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Funções para consumir o backend

// Buscar todos os produtos
export const getProdutos = async () => {
    try {
        const response = await axios.get("/api/produtos");
        return response.data  || [];
    } catch (error) {
        console.error("Erro ao obter os produtos:", error);
        throw error;
    }
};


// Buscar produto por ID
export const getProdutoById = async (id) => {
    const response = await api.get(`/produtos/${id}`);
    return response.data;
};

// Criar um novo produto
export const createProduto = async (produto) => {
    const response = await api.post("/produtos", produto);
    return response.data;
};

// Deletar um produto pelo ID
export const deleteProduto = async (id) => {
    await api.delete(`/produtos/${id}`);
};

export default api;