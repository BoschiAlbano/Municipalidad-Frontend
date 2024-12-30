import { useContext } from "react";
import { AbmContext } from "../context/abm.context";

export default function ButtonAbm() {
    const contextAbm = useContext(AbmContext);

    return (
        <section className=" top-0  p-2 right-0 w-auto h-auto flex flex-row lg:gap-4 gap-2 justify-center lg:mx-3 items-center">
            <button
                className=" rounded-md color text-white p-2 Saltar  w-[36px] h-[36px]"
                onClick={() => {
                    contextAbm?.handleClose(!contextAbm.OpenClose);
                }}
            >
                Boton
            </button>
        </section>
    );
}
