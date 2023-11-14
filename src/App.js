// DEPENDENCIES
import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//const Example = React.lazy(() => import("./components/Example/Example"));
import Loader from "./components/Loader/Loader";

const About = React.lazy(() => import("./components/About/About"));
const Login = React.lazy(() => import("./components/Login/Login"));
const Signup = React.lazy(() => import("./components/Signup/Signup"));
const Welcome = React.lazy(() => import("./components/Welcome/Welcome"));
const Lessons = React.lazy(() => import("./components/Lessons/Lessons"));
const Nav = React.lazy(() => import("./components/Nav/Nav"));
const ToggleNavBar = React.lazy(() =>
    import("./components/ToggleNavBar/ToggleNavBar")
);
const Home = React.lazy(() => import("./components/Home/Home"));
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
                <ToggleNavBar>
                    <Nav />
                </ToggleNavBar>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/sign-up" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/delay" element={<Delay />} />
                    <Route path="/lessons" element={<Lessons />} />
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
