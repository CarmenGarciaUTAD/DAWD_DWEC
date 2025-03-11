"use client";

import { ProductBlockProps } from "@/shared/types/Product";
import { useMemo } from "react";

interface TotalCardProps {
    products: ProductBlockProps[];
    type: "product";
}

const TotalCard: React.FC<TotalCardProps> = ({ products, type }) => {
    const total = useMemo(() => {
        return products
            .reduce((acc, product) => {
                const price = Number(product.price);
                return isNaN(price) ? acc : acc + price;
            }, 0)
    }, [products, type]);

    const config = {

        product: {
            label: "Productos",
            color: "text-red-600",
        }
    };

    return (
        <article>
            <p className="text-sm text-gray-500">{config[products].label}</p>
            <p className={`text-2xl font-medium ${config[products].color}`}>
                {total.toFixed(2)}€
            </p>
        </article>
    );
};

export default TotalCard;
