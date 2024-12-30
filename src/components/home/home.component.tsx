import { MenuContextProvider } from "./ui/menu/context/menu.context";
import MenuModalComponent from "./ui/menu/menu.component";
import ButtonMenu from "./ui/menu/components/button/button.component";

const HomeComponent = () => {
    return (
        <section className=" w-full h-full flex flex-row justify-center items-center">
            <MenuContextProvider>
                <ButtonMenu />
                <MenuModalComponent />
            </MenuContextProvider>

            <div className=" w-full min-h-svh h-full  lg:p-20 p-5 flex flex-col justify-start items-center gap-3">
                <center className="sombras mb-14">
                    <h1 className=" lg:text-3xl text-xl">
                        Agenda de contactos
                    </h1>
                </center>
                <p className=" text-center text-2xl mb-4">
                    Descripcion del proyecto.
                </p>

                <p className=" text-center text-xl">
                    Proyecto CRUD agenda de contactos con autenticación
                </p>

                <p className=" text-center text-xl">
                    Front-end React js - Tailwind CSS ✔
                </p>
                <p className=" text-center text-xl">
                    Banck-end Node js - Express - Sql Server ✔
                </p>
                <p className=" text-center text-xl">Repositorios ✔</p>
                <a
                    className=" text-center text-xl text-blue-400"
                    href={
                        "https://github.com/BoschiAlbano/Municipalidad-Backend"
                    }
                >
                    - Municipaliad Backend -
                </a>
                <a
                    className=" text-center text-xl text-blue-400"
                    href={
                        "https://github.com/BoschiAlbano/Municipalidad-Frontend"
                    }
                >
                    - Municipaliad Frontend -
                </a>
                <p className=" text-center text-xl">Deploy ✔</p>
                <a
                    className=" text-center text-xl text-blue-400"
                    href={"https://municipalidad-backend.vercel.app"}
                >
                    - Municipaliad Backend Deploy -
                </a>
                <a
                    className=" text-center text-xl text-blue-400"
                    href={"https://municipalidad-frontend.vercel.app/login"}
                >
                    - Municipaliad Frontend Deploy -
                </a>
                <p className=" text-center text-xl">
                    Autenticacion de usuario JWT ✔
                </p>
            </div>
        </section>
    );
};

export default HomeComponent;
