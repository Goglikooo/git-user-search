import React from "react";
import locationIcon from "../icons/icon-location.svg";
import websiteIcon from "../icons/icon-website.svg";
import twitterIcon from "../icons/icon-twitter.svg";
import companyIcon from "../icons/icon-company.svg";

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

interface Props {
  userLocation: User | null;
  userBlog: User | null;
  userTwitter: User | null;
  userCompany: User | null;
}

export default function UserLinks(props: Props) {
  const { userLocation, userBlog, userTwitter, userCompany } = props;

  return (
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
            <p className="userLinkName">
              <a
                href={`http://twitter.com/${userTwitter}`}
                className="actualLinks"
              >{`${userTwitter}`}</a>
            </p>
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
  );
}
