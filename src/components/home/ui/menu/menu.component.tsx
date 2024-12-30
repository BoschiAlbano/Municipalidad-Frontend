import { useContext } from "react";
import ReactDOM from "react-dom";
import { MenuContext } from "./context/menu.context";
import { AbmContext } from "../abm/context/abm.context";
import AbmModalComponent from "../abm/abm.component";
import { Link } from "react-router-dom";

const MenuModalComponent = () => {
    const contexto = useContext(MenuContext);

    if (!contexto?.OpenClose) return null;

    const modalRoot = document.getElementById("modal-menu-root");
    if (!modalRoot) {
        return;
    }

    return <ModalComponent modalRoot={modalRoot} />;
};

function ModalComponent({ modalRoot }: { modalRoot: HTMLElement }) {
    const contexto = useContext(MenuContext);

    return ReactDOM.createPortal(
        <section
            className={`${
                contexto?.show ? "showCarrito" : "showNotCarrito"
            } bg-transparent shadow-2xl rounded-r-[15px] fixed top-0 left-0  sm:m-0  w-[65px] h-full z-[99]`}
        >
            <Menu />
        </section>,
        modalRoot
    );
}

function Menu() {
    const letra = getFirstLetterOfEmail("session");
    const context = useContext(AbmContext);
    function getFirstLetterOfEmail(name: string): string | null {
        const value = `${document.cookie}`;
        const parts = value.split(`${name}=`);

        // Verifica si la cookie existe
        if (parts.length === 2) {
            // Decodifica y limpia el valor de la cookie
            const cookieValorDecodificado = decodeURIComponent(parts[1]);
            const jsonString = cookieValorDecodificado.replace(/^j:/, "");

            // Intenta parsear el JSON
            try {
                const objeto = JSON.parse(jsonString);
                return objeto.email.charAt(0); // Retorna la primera letra del email
            } catch (error) {
                console.error("Error al parsear JSON:", error);
                return null; // O maneja el error como prefieras
            }
        }

        return null; // Si la cookie no existe
    }

    async function salir() {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
    }

    return (
        <div className=" fixed top-0 left-0 flex h-screen w-16 flex-col justify-between border-e bg-gradient-to-b from-blue-200 to-purple-200">
            <div>
                <Link
                    to={"/"}
                    className="inline-flex size-16 items-center justify-center group relative"
                >
                    <span className="grid size-10 place-content-center rounded-lg shadow-lg text-base font-extrabold text-gray-600">
                        {letra?.toLocaleUpperCase()}
                    </span>
                    <span className="invisible absolute start-full top-1/2 ms-2 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                        Inicio
                    </span>
                </Link>

                <div className="border-t border-gray-100">
                    <div className="px-2">
                        <ul className="space-y-1 border-t border-gray-100 pt-4">
                            <li>
                                <Link
                                    to="/contactos"
                                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                >
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-5 opacity-75"
                                    >
                                        <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z"></path>
                                    </svg>

                                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                                        Contactos
                                    </span>
                                </Link>
                            </li>

                            <li>
                                <a
                                    onClick={() => {
                                        context?.setCurrentContact({
                                            id: -1,
                                            Apellido: "",
                                            Direccion: "",
                                            Email: "",
                                            Nombre: "",
                                            Nota: "",
                                            Telefono: "",
                                        });
                                        context?.setOperationType("new");
                                        context?.handleClose(
                                            !context.openClose
                                        );
                                    }}
                                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                >
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 640 512"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-5 opacity-75"
                                    >
                                        <path d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                                    </svg>

                                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                                        Nuevo
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 p-2">
                <form action="#">
                    <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        onClick={() => salir()}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-5 opacity-75"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>

                        <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                            Logout
                        </span>
                    </button>
                </form>
            </div>
            <AbmModalComponent />
        </div>
    );
}

export default MenuModalComponent;
