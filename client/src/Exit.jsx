import React, { useEffect } from "react";

export default function Exit() {
  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        fontFamily: "Times New Roman",
      }}
    >
      <h1
        style={{
          textAlign: "center",
        }}
      >
        You have finished the survey. Thank you!
      </h1>
    </div>
  );
}
