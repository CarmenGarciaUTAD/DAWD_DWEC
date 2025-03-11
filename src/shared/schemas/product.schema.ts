import { z } from "zod";

export const productSchema = z.object({
    name: z
        .string()
        .min(1, "El nombre del producto es requerido")
        .max(200, "El nombre no puede tener más de 200 caracteres"),
    price: z
        .number({
            required_error: "El precio es requerido",
            invalid_type_error: "El precio debe ser un número"
        })
        .positive("El precio debe ser un número positivo"),
    description: z
        .string()
        .min(1, "La descripción es requerida")
        .max(200, "La descripción no puede tener más de 200 caracteres"),
    user_id: z
        .number({
            required_error: "El ID es requerido",
            invalid_type_error: "El ID debe ser un número"
        })
        .positive("El ID debe ser un número positivo"),
});

export type productSchema = z.infer<typeof productSchema>;
