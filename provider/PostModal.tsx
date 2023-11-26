"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type Props = {};

const PostModal = ({ children }: Props) => {
  const portalRef = useRef(null);

  useEffect(() => {
    if (!portalRef.current) {
      const portalNode = document.createElement("div");
      portalNode.setAttribute("id", "portal-container");
      document.body.appendChild(portalNode);
      portalRef.current = portalNode;
    }

    return () => {
      if (portalRef.current) {
        document.body.removeChild(portalRef.current);
        portalRef.current = null;
      }
    };
  }, []);

  return createPortal(children, portalRef.current);
};

export default PostModal;
