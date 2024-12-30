import React, { useState, createContext } from "react";
import { contacto } from "../../../../contactos/model/contacto";
import UseDisableScroll from "../../../../../hook/useDisableScroll";

// Define la interfaz para el contexto
interface AuthContextType {
    openClose: boolean;
    handleClose: (isOpenClose: boolean) => void;
    show: boolean;
    operationType: "new" | "update"; // Tipo de operación
    currentContact: contacto; // Objeto del contacto actual (puedes definir un tipo más específico)
    setOperationType: (type: "new" | "update") => void; // Función para establecer el tipo de operación
    setCurrentContact: (contact: contacto) => void; // Función para establecer el contacto actual
}

// Crea el contexto con un valor predeterminado
export const AbmContext = createContext<AuthContextType | undefined>(undefined);

export const AbmContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [openClose, setOpenClose] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const [operationType, setOperationType] = useState<"new" | "update">("new"); // Inicializa como 'new'
    const [currentContact, setCurrentContact] = useState<contacto>({
        id: -1,
        Nombre: "",
        Apellido: "",
        Telefono: "",
        Direccion: "",
        Email: "",
        Nota: "",
    });

    const scroll = UseDisableScroll(false);

    const handleClose = (isOpenClose: boolean) => {
        scroll.SetIsShowCarrito(isOpenClose);
        setShow(isOpenClose);
        setTimeout(() => {
            setOpenClose(isOpenClose);
        }, 200);
    };

    return (
        <AbmContext.Provider
            value={{
                handleClose,
                openClose,
                show,
                operationType,
                currentContact,
                setOperationType,
                setCurrentContact,
            }}
        >
            {children}
        </AbmContext.Provider>
    );
};
