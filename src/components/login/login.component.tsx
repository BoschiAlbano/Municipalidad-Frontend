import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const LoginComponent = () => {
    return (
        <section className=" flex flex-col justify-center items-center h-screen p-2">
            <Form />
        </section>
    );
};

export default LoginComponent;

function Form() {
    const [data, setData] = useState({ Email: "", Password: "" });
    const [passwordShow, setpasswordShow] = useState<boolean>(false);

    const [loading, setloading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setloading(true);
        // usar api.
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            // //credentials: "include",
        })
            .then(async (res) => {
                const data = await res.json();
                if (res.ok) {
                    localStorage.setItem("acceso", data.datos.acceso);
                    toast.success(data.mensaje);

                    setTimeout(() => {
                        window.location.href = "/";
                    }, 2000);
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
        setloading(false);
    };

    return (
        <div
            style={{ animation: "slideInFromLeft 1s ease-out" }}
            className="max-w-md w-full bg-gradient-to-r from-blue-200 to-purple-200 rounded-xl shadow-2xl overflow-hidden p-4 space-y-8"
        >
            <h2
                style={{ animation: "appear 2s ease-out" }}
                className="text-center text-4xl font-extrabold text-black"
            >
                Login
            </h2>
            <p
                style={{ animation: "appear 3s ease-out" }}
                className="text-center text-black"
            >
                Inicia sesión en tu cuenta
            </p>

            <form
                className="space-y-6 flex flex-col justify-center items-center"
                onSubmit={(e) => handleSubmit(e)}
            >
                <div className="relative lg:w-[75%] w-full">
                    <input
                        placeholder="john@example.com"
                        className="peer h-10 w-full border-b-2 border-black text-black bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                        required
                        id="Email"
                        name="Email"
                        type="email"
                        onChange={(e) => handleChange(e)}
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                        htmlFor="email"
                    >
                        Correo Electrónico
                    </label>
                </div>
                <div className="relative lg:w-[75%] w-full">
                    <input
                        placeholder="Password"
                        className="peer h-10 w-full border-b-2 border-black text-black bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                        required
                        id="Password"
                        name="Password"
                        type={passwordShow ? "text" : "password"}
                        onChange={(e) => handleChange(e)}
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <button
                        type="button"
                        onClick={() => setpasswordShow(!passwordShow)}
                    >
                        {passwordShow ? (
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 1024 1024"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-black absolute right-0 top-2"
                            >
                                <path d="M396 512a112 112 0 1 0 224 0 112 112 0 1 0-224 0zm546.2-25.8C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z"></path>
                            </svg>
                        ) : (
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 512 512"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-black absolute right-0 top-2"
                            >
                                <path d="M256.1 144.8c56.2 0 101.9 45.3 101.9 101.1 0 13.1-2.6 25.5-7.3 37l59.5 59c30.8-25.5 55-58.4 69.9-96-35.3-88.7-122.3-151.6-224.2-151.6-28.5 0-55.8 5.1-81.1 14.1l44 43.7c11.6-4.6 24.1-7.3 37.3-7.3zM52.4 89.7l46.5 46.1 9.4 9.3c-33.9 26-60.4 60.8-76.3 100.8 35.2 88.7 122.2 151.6 224.1 151.6 31.6 0 61.7-6.1 89.2-17l8.6 8.5 59.7 59 25.9-25.7L78.2 64 52.4 89.7zM165 201.4l31.6 31.3c-1 4.2-1.6 8.7-1.6 13.1 0 33.5 27.3 60.6 61.1 60.6 4.5 0 9-.6 13.2-1.6l31.6 31.3c-13.6 6.7-28.7 10.7-44.8 10.7-56.2 0-101.9-45.3-101.9-101.1 0-15.8 4.1-30.7 10.8-44.3zm87.8-15.7l64.2 63.7.4-3.2c0-33.5-27.3-60.6-61.1-60.6l-3.5.1z"></path>
                            </svg>
                        )}
                    </button>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="text-sm text-black hover:underline"
                        onClick={() => alert("no implementado")}
                        type="button"
                    >
                        ¿Olvidaste tu contraseña?
                    </button>
                </div>
                <button
                    className="w-[75%] py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Cargando..." : "Ingresar"}
                </button>
            </form>
            <div className="text-center text-black">
                ¿No tienes una cuenta?
                <Link
                    to={"/register"}
                    className="text-purple-700 hover:underline ml-2"
                >
                    Registrate Ahora !!!
                </Link>
            </div>
        </div>
    );
}
