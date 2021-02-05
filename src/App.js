import "./App.css";
import React from "react";

function Dashboard({ info, setInfo }) {
  function getIpAddress() {
    const urlString = "https://api.ipify.org?format=json";
    fetch(urlString)
      .then((res) => res.json())
      .then((data) => {
        return setInfo({ ...info, ip: data.ip });
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
  }, [info.userLoggedin]);

  React.useEffect(() => {
    getNativeGreeting();
  }, [info.ip]);

  return (
    <div className="dashboard">
      <h1>
        {info.greeting} {info.userName}, you have succesfully logged in!
      </h1>
      <button
        type="button"
        onClick={() =>
          setInfo({
            ip: "",
            greeting: "",
            userLoggedin: false,
            userName: "",
            password: "",
          })
        }
      >
        Log out
      </button>
    </div>
  );
}

function Login({ info, setInfo }) {
  const [canRegister, setCanRegister] = React.useState(false);

  React.useEffect(() => {
    if (info.userName.length > 0 && info.password.length > 0) {
      setCanRegister(true);
    }
  }, [info.userName, info.password]);

  function onChange(event) {
    return setInfo({ ...info, [event.target.name]: event.target.value });
  }

  return (
    <div className="login">
      <h1>Please login</h1>
      <form onSubmit={() => setInfo({ ...info, userLoggedin: true })}>
        <input
          type="text"
          placeholder="Username"
          value={info.userName}
          onChange={onChange}
          name="userName"
        />
        <input
          type="text"
          placeholder="Password"
          value={info.password}
          onChange={onChange}
          name="password"
        />
        <button type="submit" disabled={!canRegister}>
          Submit
        </button>
      </form>
    </div>
  );
}

function App() {
  const [info, setInfo] = React.useState({
    userLoggedin: false,
    ip: "",
    greeting: "",
    userName: "",
    password: "",
  });

  return (
    <div className="App">
      <div className="App-header">
        {info.userLoggedin ? (
          <Dashboard info={info} setInfo={setInfo} />
        ) : (
          <Login info={info} setInfo={setInfo} />
        )}
      </div>
    </div>
  );
}

export default App;
