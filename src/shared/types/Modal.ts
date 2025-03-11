import { productSchema } from "../schemas/product.schema";
import { ProductBlockProps } from "./Product";

export interface ModalComponentProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (updatedExpense: productSchema) => void;
    title: string;
    type: "edit";
    expense?: ProductBlockProps;
}