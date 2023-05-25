import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./DiscoverPage.css";

import AudioPlayer from "react-h5-audio-player";
import "react-jinke-music-player/assets/index.css";
import "react-h5-audio-player/lib/styles.less"; //Use LESS

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";



const DiscoverPage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const songsObj = useSelector((state) => state.songs.songs);
  const songs = Object.values(songsObj);

  const discover = songs.filter((song) => song.userId !== sessionUser.id);

  const library = songs
    .filter((song) => song.userId === sessionUser.id)
    .reverse();

  const [currentTrack, setTrackIndex] = useState("");

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 2, // optional, default to 1.
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <div className="discover-page">
        <div className="discover-carousel-container">
          <h2 className="section-title">Explore</h2>
          <Carousel
            partialVisible={true}
            // centerMode={true}
            responsive={responsive}
            // infinite={true}
            containerClass="container"
          >
            {discover?.map((song) => (
              <div className="song-card" song={song}>
                <NavLink className="song-link" to={`/songs/${song.id}`}>
                  <div className="card-container">
                    <img className="image" src={song.imageUrl} alt={""} />
                    <NavLink to={"/discover"}>
                      <button
                        className="card-play-button"
                        value={song?.url}
                        onClick={(e) => setTrackIndex(e.target.value)}
                      >
                        <i class="fa-solid fa-circle-play"></i>
                      </button>
                    </NavLink>
                  </div>
                  <p className="song-title">{song.title}</p>
                  <p className="song-artist">{song.artist}</p>
                </NavLink>
              </div>
            ))}
          </Carousel>
        </div>
        <div div className="discover-carousel-container">
          <h2 className="section-title">Library</h2>
          <Carousel
            partialVisible={true}
            // centerMode={true}
            responsive={responsive}
            // infinite={true}
            containerClass="container"
          >
            {library?.map((song) => (
              <div className="song-card" song={song}>
              <NavLink className="song-link" to={`/songs/${song.id}`}>
                <div className="card-container">
                  <img className="image" src={song.imageUrl} alt={""} />
                  <NavLink to={"/discover"}>
                    <button
                      className="card-play-button"
                      value={song?.url}
                      onClick={(e) => setTrackIndex(e.target.value)}
                    >
                      <i class="fa-solid fa-circle-play"></i>
                    </button>
                  </NavLink>
                </div>
                <p className="song-title">{song.title}</p>
                <p className="song-artist">{song.artist}</p>
              </NavLink>
            </div>
            ))}
          </Carousel>
        </div>
        <div className="music-container">
          <AudioPlayer
            className="audio-player"
            volume={0.3}
            layout="horizontal"
            src={currentTrack}
            // customAdditionalControls={[
            //   // <button>
            //   //   {/* <img className="image" src={song?.imageUrl} alt={""}></img> */}
            //   // </button>,
            // ]}
          />
        </div>
        <div className="footer">

        </div>
      </div>
    </>
  );
};

export default DiscoverPage;
