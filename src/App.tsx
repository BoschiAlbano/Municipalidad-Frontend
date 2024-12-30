import { Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./router/router";

function App() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <AppRouter />
            </Suspense>
        </Router>
    );
}

export default App;
