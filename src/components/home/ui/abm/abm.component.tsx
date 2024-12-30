import { useContext } from "react";
import ReactDOM from "react-dom";
import { AbmContext } from "./context/abm.context";
import { toast } from "sonner";
import { useAgendaActions } from "../../../../redux/hook/agenda/useAgendaActions";

const AbmModalComponent = () => {
    const contexto = useContext(AbmContext);

    if (!contexto?.openClose) return null;

    const modalRoot = document.getElementById("modal-abm-root");
    if (!modalRoot) {
        return;
    }

    return <ModalComponent modalRoot={modalRoot} />;
};

function ModalComponent({ modalRoot }: { modalRoot: HTMLElement }) {
    const contexto = useContext(AbmContext);

    return ReactDOM.createPortal(
        <section
            onClick={() => contexto?.handleClose(false)}
            className={` fixed inset-0  w-full h-full z-[999] bg-[#0000002d] flex flex-col justify-center items-center`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`${
                    contexto?.show ? "showAbm" : "showNotAbm"
                }  bg-[#ffffff] shadow-2xl rounded-[10px] relative overflow-hidden sm:m-0  w-[auto] `}
            >
                <div
                    className="absolute top-0 right-0 p-2"
                    onClick={() => contexto?.handleClose(false)}
                >
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[20px] h-[20px] fill-[#A855F7] cursor-pointer"
                    >
                        <path d="M256 16C123.45 16 16 123.45 16 256s107.45 240 240 240 240-107.45 240-240S388.55 16 256 16zm0 60c99.41 0 180 80.59 180 180s-80.59 180-180 180S76 355.41 76 256 156.59 76 256 76zm-80.625 60c-.97-.005-2.006.112-3.063.313v-.032c-18.297 3.436-45.264 34.743-33.375 46.626l73.157 73.125-73.156 73.126c-14.63 14.625 29.275 58.534 43.906 43.906L256 299.906l73.156 73.156c14.63 14.628 58.537-29.28 43.906-43.906l-73.156-73.125 73.156-73.124c14.63-14.625-29.275-58.5-43.906-43.875L256 212.157l-73.156-73.125c-2.06-2.046-4.56-3.015-7.47-3.03z"></path>
                    </svg>
                </div>
                <Abm />
            </div>
        </section>,
        modalRoot
    );
}

function Abm() {
    const { agregar, actualizar } = useAgendaActions();

    const context = useContext(AbmContext);

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        context?.setCurrentContact({
            ...context.currentContact,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (context?.operationType === "new") {
            await newContact();
        } else {
            await UpdateContact();
        }
    };

    async function newContact() {
        // usar api.
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/agenda`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${localStorage.getItem("acceso")}`,
            },
            body: JSON.stringify(context?.currentContact),
            //credentials: "include",
        })
            .then(async (res) => {
                const data = await res.json();
                if (res.ok) {
                    agregar(data.datos);
                    toast.success(data.mensaje);
                    context?.setCurrentContact({
                        id: -1,
                        Nombre: "",
                        Apellido: "",
                        Telefono: "",
                        Direccion: "",
                        Email: "",
                        Nota: "",
                    });
                } else {
                    // si existe detalles mostrar mesanje de error.
                    if (!data?.detalles) {
                        return toast.error(data.mensaje);
                    }
                    data?.detalles?.map((error: any) => {
                        toast.error(`${error.campo}: ${error.mensaje}`);
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Error de conexion");
            });
    }

    async function UpdateContact() {
        // usar api.
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/agenda`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${localStorage.getItem("acceso")}`,
            },
            body: JSON.stringify(context?.currentContact),
            //credentials: "include",
        })
            .then(async (res) => {
                const data = await res.json();
                if (res.ok) {
                    actualizar(data.datos);
                    toast.success(data.mensaje);
                    context?.handleClose(false);
                } else {
                    // si existe detalles mostrar mesanje de error.
                    if (!data?.detalles) {
                        return toast.error(data.mensaje);
                    }
                    data?.detalles?.map((error: any) => {
                        toast.error(`${error.campo}: ${error.mensaje}`);
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Error de conexion");
            });
    }

    return (
        <div className="flex h-auto w-[300px] p-4 flex-col justify-center border-e bg-gradient-to-b from-blue-200 to-purple-200">
            <p className=" w-full text-center text-2xl mt-2 mb-6">
                {context?.operationType === "new"
                    ? "Nuevo Contacto"
                    : "Actualizar Contacto"}
            </p>
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="space-y-6 flex flex-col justify-center items-center"
            >
                <div
                    className={`relative lg:w-[75%] w-full ${
                        context?.operationType === "new" && "hidden"
                    }`}
                >
                    <input
                        onChange={(e) => handleChange(e)}
                        placeholder="id"
                        className="peer h-10 w-full border-b-2 border-black text-black bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                        required
                        id="id"
                        name="id"
                        type="text"
                        value={context?.currentContact?.id}
                        disabled
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                        htmlFor="id"
                    >
                        id
                    </label>
                </div>

                <div className="relative lg:w-[75%] w-full">
                    <input
                        onChange={(e) => handleChange(e)}
                        placeholder="Nombre"
                        className="peer h-10 w-full border-b-2 border-black text-black bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                        required
                        id="Nombre"
                        name="Nombre"
                        type="text"
                        value={context?.currentContact?.Nombre}
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                        htmlFor="Nombre"
                    >
                        Nombre
                    </label>
                </div>
                <div className="relative lg:w-[75%] w-full">
                    <input
                        onChange={(e) => handleChange(e)}
                        placeholder="Apellido"
                        className="peer h-10 w-full border-b-2 border-black text-black bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                        required
                        id="Apellido"
                        name="Apellido"
                        type="text"
                        value={context?.currentContact?.Apellido}
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                        htmlFor="apellido"
                    >
                        Apellido
                    </label>
                </div>
                <div className="relative lg:w-[75%] w-full">
                    <input
                        onChange={(e) => handleChange(e)}
                        placeholder="Telefono"
                        className="peer h-10 w-full border-b-2 border-black text-black bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                        required
                        id="Telefono"
                        name="Telefono"
                        type="text"
                        value={context?.currentContact?.Telefono}
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                        htmlFor="Telefono"
                    >
                        Telefono
                    </label>
                </div>
                <div className="relative lg:w-[75%] w-full">
                    <input
                        onChange={(e) => handleChange(e)}
                        placeholder="Direccion"
                        className="peer h-10 w-full border-b-2 border-black text-black bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                        required
                        id="Direccion"
                        name="Direccion"
                        type="text"
                        value={context?.currentContact?.Direccion}
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                        htmlFor="Direccion"
                    >
                        Direccion
                    </label>
                </div>
                <div className="relative lg:w-[75%] w-full">
                    <input
                        onChange={(e) => handleChange(e)}
                        placeholder="Email"
                        className="peer h-10 w-full border-b-2 border-black text-black bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                        required
                        id="Email"
                        name="Email"
                        type="Email"
                        value={context?.currentContact?.Email}
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                        htmlFor="email"
                    >
                        Correo Electronico
                    </label>
                </div>

                <div className="relative lg:w-[75%] w-full">
                    <textarea
                        onChange={(e) => handleChange(e)}
                        placeholder="Nota"
                        className="peer h-10 w-full border-b-2 border-black text-black bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                        required
                        id="Nota"
                        name="Nota"
                        value={context?.currentContact?.Nota}
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                        htmlFor="Nota"
                    >
                        Nota
                    </label>
                </div>

                <button
                    className="w-[75%] py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
                    type="submit"
                >
                    {context?.operationType === "new"
                        ? "Agregar"
                        : "Actualizar"}
                </button>
            </form>
        </div>
    );
}

export default AbmModalComponent;
