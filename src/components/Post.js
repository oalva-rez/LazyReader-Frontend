import React, { useState } from "react";
import placeholder from "../assets/Placeholder.jpg";

export default function Post({ post }) {
  const domain = post.link.split("/")[2].split(".").slice(-2).join(".");
  const shortenedParam = post.link
    .split("/")
    .slice(3, -1)
    .join("/")
    .slice(0, 30);

  const [isOpen, setIsOpen] = useState(false);
  return (
    <li
      className="post"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <div className="post--upvotes">
        <i className="fa-sharp fa-solid fa-arrow-up arrow-img"></i>
        <p>{post.upvotes}</p>
      </div>
      <img
        src={post.thumbnail ? post.thumbnail : placeholder}
        alt="thumbnail"
        className={isOpen ? "post--thumbnail open-summary" : "post--thumbnail"}
      />
      <div className="post--content">
        <h2 className="post--title">{post.title}</h2>
        <p className={isOpen ? "post--summary open-summary" : "post--summary"}>
          {post.summary}
        </p>
        <a
          href={post.link}
          className="post--link"
          target="_blank"
          rel="noreferrer"
        >
          {domain + "/" + shortenedParam}...{" "}
          <i className="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </div>
    </li>
  );
}
