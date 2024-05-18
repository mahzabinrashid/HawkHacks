import "./Home.scss";

import Post from "../components/home/Post";
export default function Home() {
  return (
    <div className="home">
      <Post />
      <Post />
      <Post />
    </div>
  );
}
