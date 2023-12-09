import React, { Suspense, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import "./App.css";
import Colors from "./sharingcolors.jsx";
import ShoeModel from "./ShoeModel.jsx";
import Customize from "./customize.jsx";
import { Timer } from "./Callserver.jsx";
import Exit from "./Exit.jsx";

function App() {
  const navigate = useNavigate();
  const [color, setColor] = useState("black");
  const [mesh, setMesh] = useState("shoe_1");
  const [surveyCompleted, setSurveyCompleted] = useState(false);

  Timer({ color, mesh });

  const handleSubmit = () => {
    setSurveyCompleted(true);
    navigate("/exit");
  };

  if (surveyCompleted) {
    return <Exit />;
  }

  return (
    <Colors.Provider value={{ color, setColor, mesh, setMesh }}>
      <div className="container">
        <div className="component left">
          <Customize />
          <button onClick={handleSubmit} className="Submit-button">
            Submit
          </button>
        </div>
        <div className="component right">
          <Canvas shadows>
            <PerspectiveCamera makeDefault position={[0, 2, 5]} />
            <OrbitControls />
            <ambientLight intensity={0.3} />
            <directionalLight
              position={[2, 4, 5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
            />
            <pointLight position={[2, 2, -3]} intensity={0.5} />
            <hemisphereLight
              skyColor={"#ffffff"}
              groundColor={"#000000"}
              intensity={0.3}
              position={[0, 50, 0]}
            />
            <Suspense fallback={null}>
              <ShoeModel />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </Colors.Provider>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/exit" element={<Exit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppWrapper;
