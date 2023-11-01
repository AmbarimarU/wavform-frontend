// DEPENDENCIES
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Loader from "./components/Loader/Loader";
// COMPONENTS
//const Example = React.lazy(() => import("./components/Example/Example"));
const Sequencer = React.lazy(() => import("./components/Step Sequencer/StepSequencer"))

function App() {
    return (
        <React.Suspense fallback={<Loader />}>
            <Router>
                <Routes>
                    <Route path="/" element={<h1>Hello world!</h1>} />
                    <Route path="/sequencer" element={<Sequencer />} />
                </Routes>
            </Router>
        </React.Suspense>
    );
}

export default App;
