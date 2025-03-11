import { productSchema } from "../schemas/product.schema";

export async function editproductService(product: productSchema, id: number) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/rest/v1/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(product),
        }
    );

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar producto")
    }

    const data = await response.json()

    return data;
}