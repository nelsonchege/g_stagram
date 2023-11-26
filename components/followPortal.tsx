"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import ModalContent from "./ProfileDetails";

type FollowPortalProps = {};

const FollowPortal = ({}: FollowPortalProps) => {
  return (
    <button className="border border-purple-700 py-2 px-7 rounded-md shadow-md">
      follow
    </button>
  );
};

export default FollowPortal;
