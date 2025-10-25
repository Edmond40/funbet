import React from "react";

const VideoPlayer = ({ src, poster, title = "Video", autoPlay = false, controls = true, className = "" }) => {
  if (!src) {
    return (
      <div className={`w-full h-64 bg-black/80 rounded flex items-center justify-center text-white/80 ${className}`} aria-label={title}>
        <div className="text-center">
          <div className="mb-2">Video preview</div>
          <div className="text-xs opacity-80">Provide a source to play media</div>
        </div>
      </div>
    );
  }

  return (
    <video
      className={`w-full h-64 bg-black rounded ${className}`}
      controls={controls}
      autoPlay={autoPlay}
      poster={poster}
      aria-label={title}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
