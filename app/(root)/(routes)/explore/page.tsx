import React from "react";

const ExplorePage = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-1  overflow-y-auto scrollbar-hidden">
        <div style={{ height: "200vh" }}>Scrollable Content</div>
      </div>
    </div>
  );
};

export default ExplorePage;
