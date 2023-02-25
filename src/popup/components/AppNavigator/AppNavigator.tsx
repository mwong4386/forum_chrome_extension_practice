import {
  MemoryRouter as Router,
  Routes,
  Route,
  createMemoryRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Chat from "../../screens/Chat/Chat";
import UserProfile from "../../screens/UserProfile/UserProfile";
import Board from "../../screens/Board/Board";
import Layout from "../Layout/Layout";
import Discussion from "../../screens/Discussion/Discussion";
import ErrorPage from "../../screens/ErrorPage/ErrorPage";
import Home from "../../screens/Home/Home";

// const AppRouter = createMemoryRouter([
//   {
//     path: "/",
//     element: <Board />,
//   },
//   {
//     path: "/chat",
//     element: <Chat />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/profile",
//     element: <UserProfile />,
//   },
// ]);

const AppRouter = createMemoryRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<Home />}></Route>
      <Route path="discussions">
        {/* <Route index element={<Board />} /> */}
        <Route path=":id" element={<Discussion />} />
      </Route>

      {/* <Route path="chat" element={<Chat />} /> */}
      <Route path="profile" element={<UserProfile />} />
    </Route>
  )
);
export default AppRouter;
