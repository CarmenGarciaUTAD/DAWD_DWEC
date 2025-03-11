"use client";

import { Modal, ModalContent, ModalBody, ModalHeader, Button, Input, Select, SelectItem, Textarea } from "@heroui/react";
import { ModalComponentProps } from "@/shared/types/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/shared/schemas/product.schema";
import { Controller, useForm } from "react-hook-form";
import { editproductService } from "@/shared/services/editProductService";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, onClose, onConfirm, title, type, product }) => {

    const router = useRouter();
    const productuser_id = product?.user_id;

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<productSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: product?.name || "",
            price: product?.amount || 0,
            description: product?.description || "",
        }
    });

    const handleDelete = async () => {
        // Verificar si existe el token en localStorage
        const token = localStorage.getItem("token");
        if (!token) {
            // Si no hay token, redirigir a la página principal
            router.replace("/");
            toast.error("Sesión expirada");
            return;
        }
    };

    const onSubmit = async (dataProduct: productSchema) => {
        // Verificar si existe el token en localStorage
        const token = localStorage.getItem("token");
        if (!token) {
            // Si no hay token, redirigir a la página principal
            router.replace("/");
            toast.error("Sesión expirada");
            return;
        }

        try {
            if (type === "edit") {
                if (dataProduct && productuser_id) {
                    const updatedExpense = { ...dataProduct };
                    console.log("Operación actualizada:", updatedExpense);

                    const result = await editproductService(updatedproduct, productuser_id);
                    console.log("Resultado de la actualización:", result);
                    onConfirm(result);  // Llamamos a onConfirm con los datos actualizados
                    onClose();
                    toast.success("Operación actualizada correctamente")
                } else {
                    console.log("Error recibiendo los datos de la operación")
                }
            }
        } catch (error) {
            console.error("Error al guardar:", error);
            toast.error("Error al guardar los datos");
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="mx-auto items-center justify-center bg-black bg-opacity-100">
            <ModalContent className="bg-white rounded-lg shadow-lg w-full max-w-xl mx-4 p-6">
                <ModalHeader className="text-xl font-semibold text-gray-800 mx-auto">{title}</ModalHeader>
                <ModalBody className="w-full mx-auto p-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="number"
                                    autoFocus
                                    label="Cantuser_idad (€)"
                                    placeholder="0.00"
                                    isInvald={!!errors.name}
                                    errorMessage={errors.name?.message}
                                    value={(field.value !== undefined ? String(Math.round(field.value)) : "0")}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    onBlur={(e) => field.onChange(Number(e.target.value))}
                                />
                            )}
                        />

                        <Controller
                            name="price"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    label="Tipo"
                                    placeholder="Tipo de operación"
                                    selectedKeys={field.value ? [field.value] : []}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    isInvalid={!!errors.price}
                                    errorMessage={errors.price?.message}
                                >

                                </Select>
                            )}
                        />

                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <Textarea
                                    label="Descripción"
                                    placeholder="Describe la operación"
                                    isInvalid={!!errors.description}
                                    errorMessage={errors.description?.message}
                                    {...field}
                                />
                            )}
                        />
                        <div className="flex justify-center space-x-4 pt-6">
                            <Button
                                onPress={onClose}
                                className="px-6 py-2 text-gray-600 border border-pink-200 rounded-lg bg-white hover:bg-pink-200"
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="soluser_id"
                                type="submit"
                                isLoading={isSubmitting}
                                className={`px-6 py-2 rounded-lg focus:outline-none bg-pink-300`}
                            >
                                Guardar cambios
                            </Button>
                        </div>
                    </form>
                </div>
            </ModalBody>

        </ModalContent>
        </Modal >

    );
};

export default ModalComponent;
