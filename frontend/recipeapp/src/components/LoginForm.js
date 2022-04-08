import React, { useState } from "react";
import axios from "axios";

function LoginForm({ Login, error }) {
  const [user, setUser] = useState({ username: "", password: "" });
  //const [error, setError] = useState(""); //will catch if login details are not correct
  const [details, setDetails] = useState({ username: "", password: "" });

  const submitHandler = (e) => {
    e.preventDefault();

    // Login(details);
  };

  function getData() {
    console.log("getData")

    var postData = {
      username: details.username,
      password: details.password
    };

    console.log(postData)

    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };

    axios.post('http://localhost:5000/login', postData, axiosConfig)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
      console.log(res.data)
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })

  }


  return (
    <form onSubmit={submitHandler}>
      <div className="form-inner">
        <h2>Login</h2>
        {/*Error*/}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) =>
              setDetails({ ...details, username: e.target.value })
            }
            value={details.username}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
          />
        </div>
        <input type="submit" value="LOGIN" onClick={getData} />
      </div>
    </form>
  );
}

export default LoginForm;
