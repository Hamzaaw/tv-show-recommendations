import React from 'react';

const Recommendations = ({ likedShows }) => {
  // Placeholder recommendation logic
  const recommendedShows = ["Recommended Show 1", "Recommended Show 2", "Recommended Show 3"];

  return (
    <div className="recommendations">
      <h2>Based on your likes, we recommend these shows:</h2>
      {recommendedShows.map((show) => (
        <div key={show}>{show}</div>
      ))}
    </div>
  );
};

export default Recommendations;
