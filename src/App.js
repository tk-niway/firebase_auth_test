import React from "react";
import "./App.css";
import StartPage from "./StartPage";
import Auth from "./Auth";

export default function App() {
  if (process.env.REACT_APP_API_KEY) {
    console.log("values in .env is exist.");
    return <Auth />;
  } else {
    console.log("values in.env are nothing.");
    return <StartPage />;
  }
}
