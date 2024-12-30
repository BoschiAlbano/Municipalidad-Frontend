import React, { useState, createContext } from "react";

// Define la interfaz para el contexto
interface AuthContextType {
    OpenClose: boolean;
    handleClose: (isOpenClose: boolean) => void;
    show: boolean;
}

// Crea el contexto con un valor predeterminado
export const MenuContext = createContext<AuthContextType | undefined>(
    undefined
);

export const MenuContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [OpenClose, setOpenClose] = useState<boolean>(true);
    const [show, setshow] = useState<boolean>(true);

    const handleClose = (isOpenClose: boolean) => {
        setshow(isOpenClose);

        setTimeout(() => {
            setOpenClose(isOpenClose);
        }, 200);
    };

    return (
        <MenuContext.Provider value={{ handleClose, OpenClose, show }}>
            {children}
        </MenuContext.Provider>
    );
};
