import React, { useState, useEffect, useRef } from "react";
export default function Calllambda(mesh, color, timeSpent) {
  fetch(
    "https://ipff2cyrve.execute-api.us-east-2.amazonaws.com/record-colors-time",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ color: color, meshname: mesh, time: timeSpent }),
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json(); // or response.text() if the response is not in JSON format
      }
      throw new Error("Network response was not ok: " + response.statusText);
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
}

export function Timer({ color, mesh }) {
  // Ref to store the start time for the current mesh.
  const startTimeRef = useRef(Date.now());
  // Refs to store the previous mesh and color for comparison.
  const previousMeshRef = useRef(mesh);
  const previousColorRef = useRef(color);

  useEffect(() => {
    // Check if the mesh has changed since the last render.
    if (mesh !== previousMeshRef.current) {
      // Calculate time spent on previous mesh only if it's not the first render.
      if (previousMeshRef.current !== null) {
        const timeSpent = Date.now() - startTimeRef.current;
        // Call your function to handle the API call or any other action.
        Calllambda(
          previousMeshRef.current,
          previousColorRef.current,
          timeSpent
        );
        console.log(
          `Mesh "${previousMeshRef.current}" with color "${previousColorRef.current}" was selected for ${timeSpent} ms.`
        );
      }

      // Reset the start time for the new mesh.
      startTimeRef.current = Date.now();
    }
    // Update refs to current mesh and color for the next render.
    previousMeshRef.current = mesh;
    previousColorRef.current = color;

    // If you need to handle component unmounting, you can return a cleanup function.
    // return () => { /* Cleanup actions if any */ };
  }, [mesh, color]); // Effect runs when `mesh` or `color` changes

  // ...rest of your component
}
