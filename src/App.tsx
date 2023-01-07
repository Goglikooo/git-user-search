import React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import Header from "./Components/Header";
import { createContext } from "react";
import Searchbar from "./Components/Searchbar";
import ProfileHeader from "./Components/ProfileHeader";
import ReposAndFollows from "./Components/ReposAndFollows";
import UserLinks from "./Components/UserLinks";

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
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Searchbar
          setUserSearch={setUserSearch}
          requestUser={requestUser}
          setUserMessage={setUserMessage}
          userSearch={userSearch}
          userMessage={userMessage}
        />
        <div className="searchResult">
          <div className="wholeResult">
            <ProfileHeader
              userAvatar={userAvatar}
              userLogin={userLogin}
              userName={userName}
              userJoined={userJoined}
            />
            <div className="userBio">
              {userBio ? (
                <p className="userBioYes">{`${userBio}`}</p>
              ) : (
                <p className="userBioNo">This profile has no bio</p>
              )}
            </div>
            <div className="left">
              <ReposAndFollows
                userRepos={userRepos}
                userFollowers={userFollowers}
                userFollowing={userFollowing}
              />
              <UserLinks
                userLocation={userLocation}
                userBlog={userBlog}
                userTwitter={userTwitter}
                userCompany={userCompany}
              />
            </div>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
