import React from 'react'
import PropTypes from 'prop-types'
import './styles/Playlist.css';

import Track from './Track';

const calculatePlayTime = (tracks) => {
  let minutes = 0;
  let seconds = 0;
  tracks.forEach((track) => {
    const times = track.playtime.split(':');
    minutes += parseInt(times[0]);
    seconds += parseInt(times[1]);
  });

  minutes += Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  seconds %= 60;
  minutes %= 60;

  seconds = ("" + seconds).padStart(2, "0");
  minutes = ("" + minutes).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favorite: false
    };
  }

  onFavoriteClick = (trackId) => {
    console.log(trackId);

    let updatedTracks = this.props.tracks;
    updatedTracks[trackId].favorite = true;

    this.setState({ tracks: updatedTracks });
  }

  render() {
    const tracks = this.props.tracks;
    const trackCount = tracks.length;
    const playtime = calculatePlayTime(tracks);
    const trackElements = tracks.map((track, i) => {

      return (
        <Track
          key={track.id}
          favorite={false}
          onFavoriteClickCallback={this.onFavoriteClick}
          trackID={track.id}
          {...track}
        />
      );
    });

    console.log(trackElements)
    return (
      <div className="playlist">
        <h2>{this.props.side} Playlist</h2>
        <p>
          {trackCount} tracks - {playtime}
        </p>
        <ul className="playlist--track-list">
          {trackElements}
        </ul>
      </div>

    );
  }
}


Playlist.propTypes = {
  tracks: PropTypes.array,
  side: PropTypes.string,
}

export default Playlist;
