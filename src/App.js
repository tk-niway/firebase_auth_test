import "./App.css";
import StartPage from "./StartPage";
import TestAuth from "./TestAuth";

export default function App() {
  if (process.env.REACT_APP_API_KEY) {
    console.log("values in .env is exist.");
    return <TestAuth />;
  } else {
    console.log("values in.env are nothing.");
    return <StartPage />;
  }
}
