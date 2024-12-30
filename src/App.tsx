import { Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./router/router";
import SpinnerComponet from "./components/spinner/spinner.componet";

function App() {
    return (
        <Router>
            <Suspense fallback={<SpinnerComponet />}>
                <AppRouter />
            </Suspense>
        </Router>
    );
}

export default App;
