import "./App.css";
import React from "react";

function App() {
  const [info, setInfo] = React.useState({
    ip: "",
    langauge: "",
    greeting: "",
  });

  function getIpAddress() {
    const urlString = "https://api.ipify.org?format=json";
    fetch(urlString)
      .then((res) => res.json())
      .then((data) => {
        setInfo({ ...info, ip: data.ip });
      })
      .catch((e) => console.error("Error = = = ", e));
  }

  function getNativeGreeting() {
    const urlString = `https://fourtonfish.com/hellosalut/?ip=${info.ip}`;
    fetch(urlString)
      .then((res) => res.json())
      .then((data) => setInfo({ ...info, greeting: data.hello }));
  }

  React.useEffect(() => {
    getIpAddress();
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <h1>Hello from!</h1>
        <p>{info.ip}</p>
        <p>{info.greeting}</p>
      </div>
    </div>
  );
}

export default App;
