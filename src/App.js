// DEPENDENCIES
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Loader from "./components/Loader/Loader";
// COMPONENTS
import Synth from './components/Synth/Synth'
function App() {
  return (
    <React.Suspense fallback={<Loader />}>
      <Router>
        <Routes>
          <Route path="/" element={<h1>Hello world!</h1>} />
          <Route path='/synth' element={<Synth/>}/>
        </Routes>
      </Router>
    </React.Suspense>
  )
}

export default App