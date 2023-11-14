// DEPENDENCIES
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Loader from "./components/Loader/Loader";
// COMPONENTS

//const Example = React.lazy(() => import("./components/Example/Example"));

const Synth = React.lazy(() => import("./components/Synth/Synth"));
const MusicTool = React.lazy(() => import("./components/MusicTool/MusicTool"));
const Reverb = React.lazy(() => import("./components/Reverb/Reverb"));
const Sequencer = React.lazy(() =>
    import("./components/Step Sequencer/StepSequencer")
);
const Delay = React.lazy(() => import("./components/Delay/Delay"));
const Sampler = React.lazy(() => import("./components/Sampler/NotesSampler"));
const Piano = React.lazy(() => import("./components/Piano/Piano"));
function App() {
    return (
        <React.Suspense fallback={<Loader />}>
            <Router>
                <Routes>
                    <Route path="/" element={<h1>Hello world!</h1>} />
                    <Route path="/delay" element={<Delay />} />
                    <Route path="/synth" element={<Synth />} />
                    <Route path="/sampler" element={<Sampler />} />
                    <Route path="/reverb" element={<Reverb />} />
                    <Route path="/musictool" element={<MusicTool />} />

                    <Route path="/sequencer" element={<Sequencer />} />
                    <Route path="/piano" element={<Piano />} />
                </Routes>
            </Router>
        </React.Suspense>
    );
}

export default App;
