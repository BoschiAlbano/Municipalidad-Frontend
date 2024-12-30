import { Outlet, Navigate } from "react-router-dom";
import { AbmContextProvider } from "../components/home/ui/abm/context/abm.context";
import { Provider } from "react-redux";
import { store } from "../redux/store/store";
import AbmModalComponent from "../components/home/ui/abm/abm.component";

const ProtectedRoutes = () => {
    const getTokenFromCookies = () => {
        const token = localStorage.getItem("acceso");
        return token ? true : false;
    };

    // Verificar si el token existe
    const user = getTokenFromCookies();
    return user ? (
        <Provider store={store}>
            <AbmContextProvider>
                <Outlet />
                <AbmModalComponent />
            </AbmContextProvider>
        </Provider>
    ) : (
        <Navigate to="/login" />
    );
};

export default ProtectedRoutes;
