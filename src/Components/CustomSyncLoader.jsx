import React from "react";
import SyncLoader from "react-spinners/SyncLoader";

const CustomSyncLoader = ({ size = 15, margin = 2, color = "#ff4458", loading = true, speedMultiplier = 1 }) => {
  return (
    <div className="loader-container">
      <SyncLoader
        size={size}
        margin={margin}
        color={color}
        loading={loading}
        speedMultiplier={speedMultiplier}
      />
    </div>
  );
};

export default CustomSyncLoader;
