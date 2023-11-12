// DEPENDENCIES
import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Loader from "./components/Loader/Loader";
// COMPONENTS
  import Home from './components/Home/Home' 
  import Synth from './components/Synth/Synth'
//const Example = React.lazy(() => import("./components/Example/Example"));
const Delay = React.lazy(() => import("./components/Delay/Delay"));
function App() {
    return (
        <React.Suspense fallback={<Loader />}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/delay" element={<Delay />} />
                    <Route path='/synth' element={<Synth/>}/>
                </Routes>
            </Router>
        </React.Suspense>
    );

}

export default App;
