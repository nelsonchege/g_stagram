"use client";

import React from "react";
import SUggestedUser from "./SUggestedUser";

type Props = {};

const SuggestedUsers = (props: Props) => {
  return (
    <div className="w-full py-3 mt-5">
      <SUggestedUser
        comment={"followed by w_g"}
        name={"Briano Roloff"}
        src={"https://i.pravatar.cc/150?u=a042581f4e29026704d"}
      />
      <SUggestedUser
        comment={"follows you"}
        name={"Myrtice Rantoul"}
        src={"https://i.pravatar.cc/150?u=a042581f4e29026024d"}
      />
      <SUggestedUser
        comment={"followed by w_g"}
        name={"Livvie Kenaway"}
        src={"https://i.pravatar.cc/150?u=a04258a2462d826712d"}
      />
      <SUggestedUser
        comment={"follows you"}
        name={"Briggs McLagain"}
        src={"https://i.pravatar.cc/150?u=a04258114e29026708c"}
      />
    </div>
  );
};

export default SuggestedUsers;
