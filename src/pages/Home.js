import React from "react";
import Post from "../components/Post";

export default function Home({ apiData }) {
  const allSortedPosts = apiData
    .map((sub) => sub.posts)
    .flat()
    .sort((a, b) => b.upvotes - a.upvotes);
  return (
    <main>
      <h2 className="main--subname">r/all</h2>
      <ul className="main--post-list">
        {allSortedPosts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </ul>
    </main>
  );
}
