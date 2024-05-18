import Post from "../components/home/Post";
import UserProfile from "../components/portfolio/UserProfile";

export default function Portfolio() {
  return (
    <div>
      <UserProfile />
      <Post portfolio={true}/>
      <Post portfolio={true}/>
    </div>
  );
}
