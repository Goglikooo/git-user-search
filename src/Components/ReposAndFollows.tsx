import React from "react";

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
  userRepos: User | null;
  userFollowers: User | null;
  userFollowing: User | null;
}

export default function ReposAndFollows(props: Props) {
  const { userRepos, userFollowers, userFollowing } = props;

  return (
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
  );
}
