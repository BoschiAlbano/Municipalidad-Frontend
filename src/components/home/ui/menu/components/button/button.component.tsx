import { useContext } from "react";
import { MenuContext } from "../../context/menu.context";

export default function ButtonMenu() {
    const context = useContext(MenuContext);

    return (
        <section className="fixed top-0  p-2 right-0 w-auto h-auto flex flex-row lg:gap-4 gap-2 justify-center lg:mx-3 items-center">
            <button
                className=" rounded-md color text-white p-2 Saltar  w-[36px] h-[36px]"
                onClick={() => {
                    context?.handleClose(!context.OpenClose);
                }}
            >
                <label className="bar" htmlFor="check">
                    <input
                        type="checkbox"
                        defaultChecked={false}
                        checked={context?.OpenClose}
                        id="check"
                    />

                    <span className="top"></span>
                    <span className="middle"></span>
                    <span className="bottom"></span>
                </label>
            </button>
        </section>
    );
}
