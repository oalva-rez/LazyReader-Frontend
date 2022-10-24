import React from "react";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
export default function Submmary({ apiData }) {
  // retrieve subreddit name from url
  const { subreddit } = useParams();

  // find the subreddit object in apiData
  const subData = apiData.find((sub) => sub.name === subreddit);

  return (
    <main>
      <h1 className="main--subname">{"r/" + subData?.name}</h1>
      <ul className="main--post-list">
        {subData?.posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </ul>
    </main>
  );
}
