import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getProducts = async () => {
    try {
        const response = await api.get("/products");
        return response.data.products;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const getWarehouses = async () => {
    try {
        const response = await api.get("/wh");
        return response.data.warehouses;
    } catch (error) {
        console.error("Error fetching warehouses:", error);
        throw error;
    }
};

export const getWarehouseProducts = async (warehouseId) => {
    try {
        const response = await api.get(`/wh/${warehouseId}/products`);
        return response.data.warehouseProducts;
    } catch (error) {
        console.error(`Error fetching products for warehouse ${warehouseId}:`, error);
        throw error;
    }
};

export const createProduct = async (productData) => {
    try {
        const response = await api.post("/products", productData);
        return response.data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
}

export const createWarehouse = async (warehouseData) => {
    try {
        const response = await api.post("/wh", warehouseData);
        return response.data;
    } catch (error) {
        console.error("Error creating warehouse:", error);
        throw error;
    }
}
