// DEPENDENCIES
import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Loader from "./components/Loader/Loader";
// COMPONENT
  import About from './components/About/About'
  import Login from './components/Login/Login'
  import Signup from './components/Signup/Signup'
  import Welcome from './components/Welcome/Welcome'
  import Lessons from './components/Lessons/Lessons'
  import Nav from './components/Nav/Nav'
  import ToggleNavbar from './components/ToggleNavBar/ToggleNavBar'
  import Home from './components/Home/Home'
  import Synth from './components/Synth/Synth'
//const Example = React.lazy(() => import("./components/Example/Example"));
const Delay = React.lazy(() => import("./components/Delay/Delay"));
function App() {
    return (
        <React.Suspense fallback={<Loader />}>
            <Router>
                <ToggleNavbar>
                <Nav />
                </ToggleNavbar>
                
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/delay" element={<Delay />} />
                    <Route path='/synth' element={<Synth/>}/>
                    <Route path='/lessons' element={<Lessons/>}/>
                    
                </Routes>
            </Router>
        </React.Suspense>
    );

}

export default App;
