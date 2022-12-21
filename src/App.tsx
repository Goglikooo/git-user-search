import React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import locationIcon from "./icons/icon-location.svg";
import websiteIcon from "./icons/icon-website.svg";
import twitterIcon from "./icons/icon-twitter.svg";
import companyIcon from "./icons/icon-company.svg";
import searchIcon from "./icons/icon-search.svg";
import moonIcon from "./icons/icon-moon.svg";
import sunIcon from "./icons/icon-sun.svg";

import { createContext } from "react";

export const ThemeContext = createContext<null | {}>(null);

interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: null | string;
  hireable: null | string;
  bio: null | string;
  twitter_username: null | string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

function App() {
  const [userLogin, setUserLogin] = useState<User | null>(null);
  const [userJoined, setUserJoined] = useState<User | null | string>(null);
  const [userName, setUserName] = useState<User | null>(null);
  const [userBio, setUserBio] = useState<User | null>(null);
  const [userRepos, setUserRepos] = useState<User | null>(null);
  const [userFollowers, setUserFollowers] = useState<User | null>(null);
  const [userFollowing, setUserFollowing] = useState<User | null>(null);
  const [userAvatar, setUserAvatar] = useState<User | null>(null);
  const [userLocation, setUserLocation] = useState<User | null>(null);
  const [userBlog, setUserBlog] = useState<User | null>(null);
  const [userTwitter, setUserTwitter] = useState<User | null>(null);
  const [userCompany, setUserCompany] = useState<User | null>(null);
  const [userSearch, setUserSearch] = useState<null | string>("");
  const [userMessage, setUserMessage] = useState<null | string>(null);
  const [theme, setTheme] = useState<string>("light");

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function changeDateFormat(date: string) {
    const isoStr1 = date;
    const dateFull = new Date(`${isoStr1}`);
    const day = dateFull.getDate();
    const month = monthNames[dateFull.getMonth()];
    const year = dateFull.getFullYear();
    const getFullYear = "Joined " + day + " " + month + " " + year;
    setUserJoined(getFullYear);
  }

  const requestUser = async (username: string) => {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      method: "GET",
      headers: {
        Authorization:
          "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",
      },
    });
    const data = await response.json();

    if (data.login === undefined) {
      setUserMessage("No results");
    } else {
      setUserAvatar(data.avatar_url);
      setUserLogin(data.name);
      changeDateFormat(data.created_at);
      setUserName(data.login);
      setUserBio(data.bio);
      setUserRepos(data.public_repos);
      setUserFollowers(data.followers);
      setUserFollowing(data.following);
      setUserLocation(data.location);
      setUserBlog(data.blog);
      setUserTwitter(data.twitter_username);
      setUserCompany(data.company);
    }
  };

  useEffect(() => {
    requestUser("octocat");
  }, []);

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="main" id={theme}>
        <div className="heading">
          <h2 className="devfinder">devfinder</h2>
          {theme === "light" ? (
            <div className="mode" onClick={toggleTheme}>
              <span>DARK</span>
              <img src={moonIcon} alt="moon icon" />
            </div>
          ) : (
            <div className="mode" onClick={toggleTheme}>
              <span>LIGHT</span>
              <img src={sunIcon} alt="moon icon" />
            </div>
          )}
        </div>
        <div className="search-bar">
          <div className="search-field">
            <img src={searchIcon} alt="" />
            <input
              className="input-field"
              type="text"
              placeholder="Search GitHub username…"
              onChange={(e) => {
                setUserSearch(e.target.value);
              }}
            />
          </div>
          {userMessage ? (
            <span className="noResults">{userMessage}</span>
          ) : null}
          <button
            className="search-btn"
            onClick={() => {
              requestUser(`${userSearch}`);
              setUserMessage(null);
            }}
          >
            Search
          </button>
        </div>

        <div className="searchResult">
          <div className="wholeResult">
            <div className="profileHeader">
              <img
                src={`${userAvatar}`}
                alt="userAvatar"
                className="userAvatar"
              />
              <div className="profileInfoWrapper">
                <div className="userAndUserName">
                  {userLogin ? (
                    <h1>{`${userLogin}`}</h1>
                  ) : (
                    <h1 className="notAvailable">Not Available</h1>
                  )}

                  <p className="userNameP">@{`${userName}`}</p>
                </div>
                <p className="userJoinedDateP">{`${userJoined}`}</p>
              </div>
            </div>
            <div className="userBio">
              {userBio ? (
                <p className="userBioYes">{`${userBio}`}</p>
              ) : (
                <p className="userBioNo">This profile has no bio</p>
              )}
            </div>
            <div className="left">
              <div className="reposAndFollow">
                <div className="repositori">
                  <h3>Repos</h3>
                  <p>{`${userRepos}`}</p>
                </div>
                <div className="followers">
                  <h3>Followers</h3>
                  <p>{`${userFollowers}`}</p>
                </div>
                <div className="following">
                  <h3>Following</h3>
                  <p>{`${userFollowing}`}</p>
                </div>
              </div>
              <div className="userLinks">
                <div className="userLinkLeftSide">
                  <div className="userLinkDiv">
                    <img src={locationIcon} alt="userLocation" />
                    {userLocation ? (
                      <p className="userLinkName">{`${userLocation}`}</p>
                    ) : (
                      <p className="userLinkNameNotAvailable">Not Available</p>
                    )}
                  </div>
                  <div className="userLinkDiv">
                    <img src={websiteIcon} alt="userWebsite" />
                    {userBlog ? (
                      <p className="userLinkName">
                        <a
                          href={`${userBlog}`}
                          className="actualLinks"
                        >{`${userBlog}`}</a>
                      </p>
                    ) : (
                      <p className="userLinkNameNotAvailable">Not Available</p>
                    )}
                  </div>
                </div>
                <div className="userLinkRightSide">
                  <div className="userLinkDiv">
                    <img src={twitterIcon} alt="userTwitter" />
                    {userTwitter ? (
                      <p className="userLinkName">{`${userTwitter}`}</p>
                    ) : (
                      <p className="userLinkNameNotAvailable">Not Available</p>
                    )}
                  </div>
                  <div className="userLinkDiv">
                    <img src={companyIcon} alt="userCompany" />
                    {userCompany ? (
                      <p className="userLinkName">{`${userCompany}`}</p>
                    ) : (
                      <p className="userLinkNameNotAvailable">Not Available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
