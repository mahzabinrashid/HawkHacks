import "./Home.scss";

import Post from "../components/home/Post";
export default function Home() {
  return (
    <div className="home">
      <Post portfolio={false} />
      <Post portfolio={false} />
      <Post portfolio={false} />
    </div>
  );
}
