import { Home, Login, Register, Contacto } from "../pages";

export const routesPublic = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
];

export const routesProtected = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/contactos",
        element: <Contacto />,
    },
];
