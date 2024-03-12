import { Route, Routes } from "react-router-dom";
import Room from "./views/Room/Room";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Room />} />
    </Routes>
  );
};
export default App;
