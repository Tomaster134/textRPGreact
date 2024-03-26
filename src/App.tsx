import { Route, Routes } from "react-router-dom";
import Room from "./views/Room/Room";
import Home from "./views/Home/Home";
import Account from "./views/Account/Account";
import CreatePlayer from "./views/CreatePlayer/CreatePlayer";
import Login from "./views/Login/Login";
import { UserContext } from "./contexts/UserContext";
import { useContext } from "react";
import SignUp from "./views/SignUp/SignUp";
import About from "./views/About/About";

const App = () => {
  const { user, setUser } = useContext(UserContext);
  const userPull = async (user_id:number) => {
    const user = {user_id: user_id}
    const response = await fetch("http://localhost:5000/api/user_pull", {
      method: "POST",
      credentials: 'include',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(user)
    });
    const data = await response.json()
    if (data.status === 'ok') {
      setUser({
          id: data.user_id,
          username: data.user_username,
          email: data.user_email,
          active_account: data.user_active_account,
          });
  }}
  if (user.id === -1 && localStorage.user_id)
    userPull(localStorage.user_id)

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/account" element={<Account />} />
      <Route path="/create-player" element={<CreatePlayer />} />
      <Route path="/room" element={<Room />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};
export default App;
