import { useEffect, useState } from "react";

const UseDisableScroll = (start: boolean) => {
    const [isShowCarrito, SetIsShowCarrito] = useState<boolean>(start);

    // bloquear el body para que el menu no se mueva
    useEffect(() => {
        // Cuando el componente se monta
        const bloquearScroll = () => {
            document.body.classList.add("menu-open");
        };

        // Cuando el componente se desmonta
        const habilitarScroll = () => {
            document.body.classList.remove("menu-open");
        };

        if (isShowCarrito) {
            bloquearScroll();
        } else {
            habilitarScroll();
        }

        // Asegurarse de eliminar la clase cuando el componente se desmonta
        return () => {
            habilitarScroll();
        };
    }, [isShowCarrito]);

    return { isShowCarrito, SetIsShowCarrito };
};

export default UseDisableScroll;
