import { Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./router/router";
import SpinnerComponet from "./components/spinner/spinner.componet";

function App() {
    return (
        <Router>
            <Suspense
                fallback={
                    <section className=" w-full min-h-svh h-full flex flex-col justify-center items-center">
                        <SpinnerComponet />
                    </section>
                }
            >
                <AppRouter />
            </Suspense>
        </Router>
    );
}

export default App;
