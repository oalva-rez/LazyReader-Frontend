/*
  ---- LAZY READER ----
  
  Lazy Reader is an app which calls a backend API to retrieve data that contains
  top posts from various subreddits. These posts are filtered so only ones linked
  to an article are populated. The backend API returns a summarized version of
  these articles and the front end displays them in a list. The user can click on
  a post to view the summary. A link to the original article is also provided. 
  The app is built using React and React Router. The app is deployed on Firebase
  and the backend API is deployed on Heroku.

  ---- Author: Ozkar Alvarez ----
*/

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Submmary from "./pages/Submmary";
import Home from "./pages/Home";
import BeatLoader from "react-spinners/BeatLoader";

function App() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApiData() {
      const response = await fetch(
        "https://lazyreaderapi.herokuapp.com/api/all"
      );
      const data = await response.json();
      setApiData(data);
      localStorage.setItem("apiData", JSON.stringify(data));
      localStorage.setItem("lastUpdated", Date.now());
      setLoading(false);
    }

    // Check for stale data in localStorage
    if (localStorage.getItem("apiData")) {
      const oneDay = 1000 * 60 * 60 * 24;
      const lastUpdated = localStorage.getItem("lastUpdated");
      //if data is older than 1 day update localStorage
      if (Date.now() - lastUpdated > oneDay) {
        fetchApiData();
      } else {
        setApiData(JSON.parse(localStorage.getItem("apiData")));
        setLoading(false);
      }
    } else {
      fetchApiData();
    }
  }, []);

  return loading ? (
    <div className="loader-container">
      <BeatLoader
        color={"#534e4a"}
        size={40}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  ) : (
    <>
      <NavigationBar apiData={apiData} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home apiData={apiData} />} />
          <Route path="/:subreddit" element={<Submmary apiData={apiData} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
