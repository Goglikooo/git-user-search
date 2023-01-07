import React from "react";
import searchIcon from "../icons/icon-search.svg";

interface Props {
  setUserSearch: React.Dispatch<React.SetStateAction<string | null>>;
  userMessage: string | null;
  userSearch: string | null;
  setUserMessage: React.Dispatch<React.SetStateAction<string | null>>;
  requestUser: (username: string) => Promise<void>;
}

export default function Searchbar(props: Props) {
  const {
    setUserSearch,
    userMessage,
    setUserMessage,
    userSearch,
    requestUser,
  } = props;

  return (
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
      {userMessage ? <span className="noResults">{userMessage}</span> : null}
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
  );
}
