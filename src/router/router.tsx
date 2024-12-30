import { Route, Routes } from "react-router-dom";
import { routesProtected, routesPublic } from "./routerConfig";
import ProtectedRoutes from "./protectedRoutes.router";
import { ErrorComponent } from "../pages";

export const AppRouter = () => {
    return (
        <Routes>
            {/* Rutas Publicas */}
            {routesPublic.map((route, index) => {
                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={route.element}
                    />
                );
            })}

            {/* Rutas Protegidas */}
            <Route element={<ProtectedRoutes />}>
                {routesProtected.map((route, index) => {
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={route.element}
                        />
                    );
                })}
            </Route>
            <Route path="*" element={<ErrorComponent />} />
        </Routes>
    );
};
