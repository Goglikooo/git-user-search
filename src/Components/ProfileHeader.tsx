import React, { PropsWithChildren } from "react";

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
  userAvatar: User | null;
  userLogin: User | null;
  userName: User | null;
  userJoined: string | User | null;
}

export default function ProfileHeader(props: Props) {
  const { userAvatar, userLogin, userName, userJoined } = props;

  return (
    <div className="profileHeader">
      <img src={`${userAvatar}`} alt="userAvatar" className="userAvatar" />
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
  );
}
