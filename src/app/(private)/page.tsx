"use client";

import ProductBlock from "@/app/components/product-block";
import TotalCard from "@/app/components/total-card";
import { getProductsService } from "@/shared/services/getProduct.service";
import { ProductBlockProps } from "@/shared/types/Product";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [products, setproducts] = useState<ProductBlockProps[]>([]);

    useEffect(() => {
        const fetchproducts = async () => {
            try {
                const resultData = await getProductsService()
                setproducts(resultData)
            } catch (error) {
                console.log(error)
            }
        }

        fetchproducts();
    }, [products]);

    const updateproduct = (updatedproduct: ProductBlockProps) => {
        setproducts((prevproducts) =>
            prevproducts.map((product) =>
                product.id === updatedproduct.id ? updatedproduct : product
            )
        );
    };

    return (
        <div className="max-w-screen-xl mx-auto px-6 ">
            <div className="flex flex-wrap gap-20 mt-8 rounded-lg border border-pink-100 bg-pink-50 p-6 max-w-fit">
                <TotalCard products={products} type="product" />
            </div>

            <div className="flex flex-col gap-4 py-8">
                {products.map((product) => (
                    <ProductBlock
                        key={product.user_id}
                        {...product}
                        onUpdate={updateproduct}
                    />
                ))}
            </div>
        </div>
    );
}