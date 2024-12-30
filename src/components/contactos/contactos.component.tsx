import { MenuContextProvider } from "../home/ui/menu/context/menu.context";
import ButtonMenu from "../home/ui/menu/components/button/button.component";
import MenuModalComponent from "../home/ui/menu/menu.component";
import { contacto } from "./model/contacto";
import { toast } from "sonner";
import { useContext, useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hook/useStore";
import { useAgendaActions } from "../../redux/hook/agenda/useAgendaActions";
import { AbmContext } from "../home/ui/abm/context/abm.context";
import SpinnerComponet from "../spinner/spinner.componet";
import { debounce } from "ts-debounce";

const ContactosComponent = () => {
    const store = useAppSelector((store) => store.agenda);
    const { agregarTodos } = useAgendaActions();
    const [loading, setLoading] = useState<boolean>(true);

    const [buscar, setBuscar] = useState(store);

    useEffect(() => {
        setBuscar(store);
    }, [store]);

    const fitroBuscar = debounce((buscar: string) => {
        if (buscar !== "") {
            const result = store.filter(
                (item) =>
                    item.Nombre.toLowerCase().includes(buscar.toLowerCase()) ||
                    item.Apellido.toLowerCase().includes(buscar.toLowerCase())
            );

            setBuscar(result);
        } else {
            setBuscar(store);
        }
    }, 800);

    useEffect(() => {
        async function GETAll() {
            setLoading(true);
            if (!store.length) {
                await fetch(`${import.meta.env.VITE_BACKEND_URL}/agenda`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `bearer ${localStorage.getItem(
                            "acceso"
                        )}`,
                    },
                    //credentials: "include",
                })
                    .then(async (res) => {
                        const data = await res.json();
                        if (res.ok) {
                            agregarTodos(data?.datos);
                            // toast.success(data.mensaje);
                        } else {
                            return toast.error(data?.mensaje);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        toast.error("Error de conexion");
                    });
            }
            setLoading(false);
        }

        GETAll();
    }, []);

    return (
        <section className=" w-full h-full flex flex-row justify-center items-center">
            <MenuContextProvider>
                <ButtonMenu />
                <MenuModalComponent />
            </MenuContextProvider>

            <div className=" w-full min-h-svh h-full  lg:p-20 p-5 flex flex-col justify-start items-center gap-10">
                <center className="sombras">
                    <h1 className=" lg:text-3xl text-xl">Contactos</h1>
                </center>

                <section className=" flex flex-row justify-center items-center gap-3">
                    <input
                        className=" w-[350px] p-1 text-lg border-[2px] border-purple-300 rounded-xl outline-none"
                        type="text"
                        onChange={(e) => fitroBuscar(e.target.value)}
                    />
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                        className=" aspect-square w-[25px] fill-[#d8b4fe]"
                    >
                        <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                    </svg>
                </section>
                <section className=" w-full">
                    {loading ? (
                        <SpinnerComponet />
                    ) : (
                        <section className="Grilla-Contactos w-full">
                            {buscar.map((item) => {
                                return <Tarjetas key={item.id} item={item} />;
                            })}
                        </section>
                    )}
                </section>
            </div>
        </section>
    );
};

export default ContactosComponent;

function Tarjetas({ item }: { item: contacto }) {
    const context = useContext(AbmContext);
    const { eliminar } = useAgendaActions();
    const [loading, setLoading] = useState<boolean>(false);

    const btnDelete = async ({ id }: { id: number }) => {
        setLoading(true);
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/agenda/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${localStorage.getItem("acceso")}`,
            },
            //credentials: "include",
        })
            .then(async (res) => {
                const data = await res.json();
                if (res.ok) {
                    eliminar(id);
                    toast.success(data.mensaje);
                } else {
                    return toast.error(data.error);
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Error de conexion");
            });

        setLoading(false);
    };

    const btnUpdate = async () => {
        context?.setCurrentContact(item);
        context?.handleClose(!context.openClose);
        context?.setOperationType("update");
    };

    return (
        <div className=" flex flex-col justify-center items-center border border-purple-300 p-4 rounded-[20px] gap-2">
            <p className=" text-xl font-semibold">{`${item.Nombre.toUpperCase()} ${item.Apellido.toUpperCase()}`}</p>
            <p>{item.Direccion}</p>
            <p>{item.Email}</p>
            <p>{item.Telefono}</p>
            <p>{item.Nota}</p>
            <ul className=" flex flex-row w-full justify-center items-center gap-0">
                <li>
                    <button
                        type="button"
                        className="group relative flex justify-center rounded px-2 py-1.5 text-yellow-600 hover:bg-gray-50 hover:text-gray-700"
                        onClick={() => btnUpdate()}
                        disabled={loading}
                    >
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 640 512"
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-5 opacity-75"
                        >
                            <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h274.9c-2.4-6.8-3.4-14-2.6-21.3l6.8-60.9 1.2-11.1 7.9-7.9 77.3-77.3c-24.5-27.7-60-45.5-99.9-45.5zm45.3 145.3l-6.8 61c-1.1 10.2 7.5 18.8 17.6 17.6l60.9-6.8 137.9-137.9-71.7-71.7-137.9 137.8zM633 268.9L595.1 231c-9.3-9.3-24.5-9.3-33.8 0l-37.8 37.8-4.1 4.1 71.8 71.7 41.8-41.8c9.3-9.4 9.3-24.5 0-33.9z"></path>
                        </svg>

                        <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 translate-x-[-195%] rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                            Actualizar
                        </span>
                    </button>
                </li>

                <li>
                    <button
                        type="button"
                        className="group relative flex justify-center rounded px-2 py-1.5 text-red-500 hover:bg-gray-50 hover:text-gray-700"
                        onClick={() => btnDelete({ id: item.id })}
                        disabled={loading}
                    >
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 640 512"
                            className="size-5 opacity-75"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M624 208H432c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h192c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                        </svg>

                        <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                            Eliminar
                        </span>
                    </button>
                </li>
            </ul>
            {loading && <SpinnerComponet />}
        </div>
    );
}
