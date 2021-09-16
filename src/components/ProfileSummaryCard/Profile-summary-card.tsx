import React from "react";
import ProfileView from "../Profile-view/Profile-view";

function ProfileCard(props: { userId: string }) {
  return (
    <div className="Profile-summary-card__main-enclosure">
      <ProfileView
        userId={"60e477c746e78b15614b4a34"}
        closeButtonVisible={false}
      />
    </div>
  );
}

export default ProfileCard;
