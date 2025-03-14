import { productSchema } from "../schemas/product.schema";

export async function createProductService(product: productSchema) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/rest/v1`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(product),
        }
    );

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear producto")
    }

    const data = await response.json()

    return data;
}