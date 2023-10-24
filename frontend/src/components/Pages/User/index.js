import { useState } from "react";
import "./UserProfile.css";
import { useSelector } from "react-redux";
import { NavLink, Switch } from "react-router-dom";
import ProtectedRoute from "../../../context/ProtectedRoute";
import Tracks from "./Tracks";
import DiscoverPage from "../DiscoverPage";
import SideTiles from "../../SideTiles";
import Likes from "./Likes";

const UserProfile = () => {
  const user = useSelector((state) => state.session.user);

  const [headerImage, setHeaderImage] = useState();
  const [profileImage, setProfileImage] = useState();

  return (
    <>
      <div className="profile-container">
        <div className="profile-head">
          {/* <img src="" alt="" /> */}
          <div className="profile-icon"></div>
          <h2 className="profile-username">{user.username}</h2>
          {/* <img className="profile-header" src="../../../images/header.jpg" alt=""/> */}
        </div>
        <div className="profile-body">
          <ul className="user-info-bar">
            <li>
              <NavLink to={`/${user.username}`} activeClassName={false}>
                All
              </NavLink>
            </li>
            <li>
              <NavLink to={`/${user.username}/tracks`}>Tracks</NavLink>
            </li>
            <li>
              <NavLink to={`/${user.username}/likes`}>Likes</NavLink>
            </li>
            <li>
              <NavLink to={`/${user.username}/playlists`}>Playlists</NavLink>
            </li>
          </ul>
          <div className="split-container">
            <div className="left">
              <Switch>
                <ProtectedRoute path={`/${user.username}`} exact>
                  {/* <DiscoverPage /> */}
                </ProtectedRoute>
                <ProtectedRoute path={`/${user.username}/tracks`}>
                  <Tracks />
                </ProtectedRoute>
                <ProtectedRoute path={`/${user.username}/likes`}>
                  <Likes />
                </ProtectedRoute>
                {/* <ProtectedRoute path={`/${user.username}/playlists`}>
                  <Playlists />
                </ProtectedRoute> */}
              </Switch>
            </div>
            <div className="right">
              <SideTiles />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
