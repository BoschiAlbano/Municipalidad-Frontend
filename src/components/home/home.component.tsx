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
                <center className="sombras">
                    <h1 className=" lg:text-3xl text-xl">
                        Agenda de contactos
                    </h1>
                </center>
                <p className=" text-2xl">Descripcion del proyecto.</p>

                <p className=" text-xl">Proyecto CRUD agenda de contactos.</p>

                <p className=" text-xl">Base de datos SQL SERVER</p>
                <p className=" text-xl">Front-end React js</p>
                <p className=" text-xl">Banck-end Node js</p>
                <p className=" text-xl">Despliegue Vercel</p>
                <p className=" text-xl">Repositorios</p>
                <a
                    className=" text-xl text-blue-400"
                    href={
                        "https://github.com/BoschiAlbano/Municipalidad-Backend"
                    }
                >
                    - Municipaliad Backend -
                </a>
                <a
                    className=" text-xl text-blue-400"
                    href={
                        "https://github.com/BoschiAlbano/Municipalidad-Frontend"
                    }
                >
                    - Municipaliad Frontend -
                </a>
                <p className=" text-xl">
                    Autenticacion de usuario JWT y Cookies
                </p>
            </div>
        </section>
    );
};

export default HomeComponent;
