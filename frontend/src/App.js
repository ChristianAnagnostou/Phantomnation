import React, { useEffect, useState } from "react";
import axios from "axios";
// React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Styles
import "./styles/app.css";
// Components
import UserLogin from "./components/userLogin/UserLogin";
import CreateAccount from "./components/createAccount/CreateAccount";
import WordDetails from "./components/wordDetails/WordDetails";
import Home from "./components/home-page/Home";

function App() {
  const [words, setWords] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [visitedWordIds, setVisitedWordIds] = useState([]);

  // Get all words from words api
  const fetchWordData = () => {
    console.log("fetching new data");
    const response = axios.get("http://localhost:4001/api/words");
    return response
      .then((res) => {
        setWords(res.data);
        return true;
      })
      .catch((e) => {
        console.log(e);
        return false;
      });
  };

  // Create a new word
  const postWordData = (newWordData) => {
    console.log("posting new data");
    const response = axios.post("http://localhost:4001/api/words", { newWordData });
    return response
      .then(() => {
        fetchWordData();
        return true;
      })
      .catch((e) => {
        if (e.response.status === 400) {
          return false;
        } else {
          console.log(e);
        }
      });
  };

  // Request to login with user email then validate password
  const handleUserLogin = (userCreds) => {
    const response = axios.post("http://localhost:4001/api/users/login", { userCreds });
    return response
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Invalid User Credentials");
        } else {
          setCurrentUser(res.data);
          setLoggedIn(true);
          return true;
        }
      })
      .catch((e) => {
        console.log(e);
        return false;
      });
  };

  // Create a new account
  const handleCreateAccount = (userCreds) => {
    const response = axios.post("http://localhost:4001/api/users", { newUser: userCreds });
    return response
      .then((res) => {
        setCurrentUser(res.data);
        setLoggedIn(true);
        return true;
      })
      .catch((e) => {
        console.log(e);
        return false;
      });
  };

  // Add a word to a user's visitedWordIds array
  const handleAddViewedWord = (wordId) => {
    if (!visitedWordIds.includes(wordId)) {
      if (loggedIn) {
        const response = axios.post(`http://localhost:4001/api/users/${currentUser.userId}`, {
          wordId,
        });
        return response
          .then((res) => {
            console.log(res);
            setVisitedWordIds(res.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        setVisitedWordIds([...visitedWordIds, wordId]);
      }
    }
  };

  useEffect(() => {
    if (loggedIn) {
      console.log(loggedIn);
    }
  }, [loggedIn]);

  useEffect(() => {
    fetchWordData();
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home
              currentUser={currentUser}
              loggedIn={loggedIn}
              postWordData={postWordData}
              words={words}
              handleAddViewedWord={handleAddViewedWord}
              visitedWordIds={visitedWordIds}
            />
          </Route>
          <Route path="/user-login">
            <UserLogin handleUserLogin={handleUserLogin} />
          </Route>
          <Route path="/create-account">
            <CreateAccount handleCreateAccount={handleCreateAccount} />
          </Route>
          <WordDetails words={words} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
