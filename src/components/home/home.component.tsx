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

            <div className=" w-full min-h-svh h-full  lg:p-20 p-5 flex flex-col justify-start items-center">
                <center className="sombras">
                    <h1 className=" lg:text-3xl text-xl">
                        Agenda de contactos
                    </h1>

                    <p>Descripcion del proyecto.</p>

                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Obcaecati minima maiores vero, veniam perferendis
                        laboriosam quis? Animi provident hic maiores dolor
                        minima eius deleniti voluptates? Necessitatibus impedit
                        ipsa nobis qui.
                    </p>
                </center>
            </div>
        </section>
    );
};

export default HomeComponent;
