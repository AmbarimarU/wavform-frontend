// DEPENDENCIES
import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// COMPONENTS
//const Example = React.lazy(() => import("./components/Example/Example"));

import Loader from "./components/Loader/Loader";
import useAuthHooks from "./components/Hooks/Auth/useAuthHooks";

const Footer = React.lazy(() => import("./components/Footer/Footer"));
const About = React.lazy(() => import("./components/About/About"));
const Login = React.lazy(() => import("./components/Login/Login"));
const Signup = React.lazy(() => import("./components/Signup/Signup"));
const Welcome = React.lazy(() => import("./components/Welcome/Welcome"));
const Lessons = React.lazy(() => import("./components/Lessons/Lessons"));
const Nav = React.lazy(() => import("./components/Nav/Nav"));
const ToggleNavBar = React.lazy(() =>
    import("./components/ToggleNav/ToggleNavBar")
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
const GetAllUsers = React.lazy(() =>
  import("./components/GetAllUsers/GetAllUsers")
);
const Profile = React.lazy(() => import("./components/Profile/Profile"));
const PrivateRoute = React.lazy(() =>
  import("./components/PrivateRoute/PrivateRoute")
);
const Topics = React.lazy(() => import("./components/Topics/Topics"));
const TopicsDetails = React.lazy(() =>
  import("./components/Topics/TopicsDetails")
);
const FourOFour = React.lazy(() => import("./components/FourOFour/FourOFour"));
// const Sidebar = React.lazy(() => import("./components/Sidebar/Sidebar"));
const MusicBar = React.lazy(() => import("./components/MusicBar/MusicBar"));
// const MusicNotes = React.lazy(() => import("./components/MusicBar/MusicNotes"));

function App() {
    const [user, setUser] = useAuthHooks();

    function logout() {
        window.localStorage.removeItem("jwtToken");
        setUser(null);
        console.log("click me");
    }

    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    return (
        <React.Suspense fallback={<Loader />}>
            <Router>
                <ToggleNavBar>
                    <Nav
                        user={user}
                        logout={logout}
                        showSidebar={showSidebar}
                        sidebar={sidebar}
                        setSidebar={setSidebar}
                    />
                </ToggleNavBar>
                <div
                    onClick={() => {
                        setSidebar(false);
                    }}
                >
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/welcome" element={<Welcome />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route
                            path="/login"
                            element={<Login setUser={setUser} />}
                        />
                        <Route path="/delay" element={<Delay />} />
                        <Route path="/lessons" element={<Lessons />} />
                        <Route path="/synth" element={<Synth />} />
                        <Route path="/sampler" element={<Sampler />} />
                        <Route path="/reverb" element={<Reverb />} />
                        <Route path="/musictool" element={<MusicTool />} />
                        <Route path="/sequencer" element={<Sequencer />} />
                        <Route path="/piano" element={<Piano />} />
                        <Route
                            path="/get-all-users"
                            element={
                                <PrivateRoute>
                                    {" "}
                                    <GetAllUsers />{" "}
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <PrivateRoute>
                                    {" "}
                                    <Profile user={user} />{" "}
                                </PrivateRoute>
                            }
                        />
                        <Route path="/topics/:lessonId" element={<Topics />} />
                        <Route
                            path="/topics/topic/:id"
                            element={<TopicsDetails user={user} />}
                        />
                        <Route path="/*" element={<FourOFour />} />
                        {/* // <Route path="/musicnotes" element={<MusicNotes />} /> */}
                    </Routes>
                </div>
                <ToggleNavBar>
                    <Footer />
                </ToggleNavBar>
            </Router>{" "}
        </React.Suspense>
    );
}

export default App;
