import React from 'react';
import PropTypes from 'prop-types';
import './VideoInsert.css'; // Optional: Add CSS for styling

const VideoInsert = ({ src, width, height, controls = true, autoplay = false, loop = false, muted = false }) => {
  return (
    <div className="video-container" style={{ width, height }}>
      <video
        src={src}
        width={width}
        height={height}
        controls={controls}
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

VideoInsert.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  controls: PropTypes.bool,
  autoplay: PropTypes.bool,
  loop: PropTypes.bool,
  muted: PropTypes.bool,
};

export default VideoInsert;