import React from "react";
// import HomeComponent from "../components/home/home.component";
// export { HomeComponent as Home };

export const Login = React.lazy(
    () => import("../components/login/login.component")
);
export const Register = React.lazy(
    () => import("../components/register/register.component")
);

export const ErrorComponent = React.lazy(
    () => import("../components/404/error.component")
);

export const Contacto = React.lazy(
    () => import("../components/contactos/contactos.component")
);

export const Home = React.lazy(
    () => import("../components/home/home.component")
);
