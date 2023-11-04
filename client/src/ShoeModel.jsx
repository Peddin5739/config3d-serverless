import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import Colors from "./sharingcolors";
import { useContext } from "react";

const ShoeModel = () => {
  const gltf = useLoader(GLTFLoader, "/3d-shoe-model-gltf-master/shoe.gltf");
  const { color, mesh } = useContext(Colors);
  //console.log(mesh);

  // Traverse through all the children of the scene
  gltf.scene.traverse((child) => {
    if (child.isMesh && child.name === mesh) {
      // Set the mesh material color based on its name

      child.material.color.set(color);
    }
  });

  return <primitive object={gltf.scene} />;
};

export default ShoeModel;
