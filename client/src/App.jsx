import React from "react";
import {Routes , Route } from 'react-router-dom'
import {Home, Layout , Deshboard, ResumeBuilder, Preview, Login} from './pages/index.js'
const App = () => {
  return (
    <>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Login and Preview outside app */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/view/:resumeId" element={<Preview />} />

        {/* App Routes */}
        <Route path="app" element={<Layout />}>
          <Route index element={<Deshboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>
      </Routes>

      
    </>
  );
};

export default App;
