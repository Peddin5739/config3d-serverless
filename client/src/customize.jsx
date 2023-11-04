import React, { useContext, useState, useEffect } from "react";
import "./customize.css";
import Colors from "./sharingcolors";

function caliculateTime() {}

// seting the color for the buttons and capturing the color user clicked
function ColorPicker({ meshName }) {
  const { setColor, setMesh } = useContext(Colors);

  const colors = [
    { name: "Charcoal", hex: "#264653" },
    { name: "Persian Green", hex: "#2A9D8F" },
    { name: "Crayola", hex: "#E9C46A" },
    { name: "Sunset Orange", hex: "#F4A261" },
    { name: "Burnt Sienna", hex: "#E76F51" },
  ];

  useEffect(() => {
    //set the
  });

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {colors.map((color) => (
        <button
          key={color.name}
          style={{
            backgroundColor: color.hex,
            width: "30px", // Reduced size
            height: "30px", // Reduced size
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
          }}
          className="color-button"
          title={color.name}
          onClick={() => {
            setColor(color.hex);
            setMesh(meshName);
            fetch(
              "https://ipff2cyrve.execute-api.us-east-2.amazonaws.com/record-colors-time",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ color: color.hex, mesh: meshName }),
              }
            )
              .then((response) => {
                if (response.ok) {
                  return response.json(); // or response.text() if the response is not in JSON format
                }
                throw new Error(
                  "Network response was not ok: " + response.statusText
                );
              })
              .then((data) => {
                console.log("Success:", data); // Process the data or call another function with the data
              })
              .catch((error) => {
                console.error(
                  "There has been a problem with your fetch operation:",
                  error
                );
              });
          }}
        ></button>
      ))}
    </div>
  );
}

export default function Customize() {
  const meshes = [
    { shoe_1: "Shoe-Body" },
    { shoe_2: "Eyelets" },
    { shoe_3: "Inside_The_Shoe" },
    { shoe_4: "Sole" },
    { shoe_5: "shoe_Stripes" },
    { shoe_6: "Shoe_Tail" },
    { shoe_7: "shoe_back" },
  ];

  return (
    <div>
      <h1>You can customize the colors of the shoe</h1>
      <ul>
        {meshes.map((mesh, index) => {
          let keyMesh = Object.keys(mesh);
          return (
            <li key={index}>
              {mesh[keyMesh]}
              <br></br>
              <div className="box">
                <ColorPicker meshName={keyMesh[0]} />
              </div>
              <p> </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
