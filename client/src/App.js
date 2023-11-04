import "./App.css";
import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Colors from "./sharingcolors.jsx";
import ShoeModel from "./ShoeModel";
import Customize from "./customize";

function App() {
  const [color, setColor] = useState("black");
  const [mesh, setMesh] = useState("shoe_1");

  return (
    <Colors.Provider value={{ color, setColor, mesh, setMesh }}>
      <div className="container">
        <div className="component left">
          <Customize />
          <button
            onClick={() => {
              alert("Submit???!! You Cannot enter the survey");
            }}
            className="Submit-button"
          >
            Sumit
          </button>
        </div>

        <div className="component right">
          <Canvas shadows>
            {/* Camera Setup */}
            <PerspectiveCamera makeDefault position={[0, 2, 5]} />
            <OrbitControls />

            {/* Lighting */}
            {/* Ambient Light */}
            <ambientLight intensity={0.3} />

            {/* Directional Light */}
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

            {/* Point Light */}
            <pointLight position={[2, 2, -3]} intensity={0.5} />

            {/* Hemisphere Light */}
            <hemisphereLight
              skyColor={"#ffffff"} // bright sky color
              groundColor={"#000000"} // dim ground color
              intensity={0.3}
              position={[0, 50, 0]}
            />

            {/* Shoe Model */}
            <Suspense fallback={null}>
              <ShoeModel />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </Colors.Provider>
  );
}

export default App;
