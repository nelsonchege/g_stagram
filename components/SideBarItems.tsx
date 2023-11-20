import React from "react";

type SideBarItemsProps = {
  icon: any;
  text: String;
};

const SideBarItems = ({ icon, text }: SideBarItemsProps) => {
  return (
    <>
      <div className="cursor-pointer hover:bg-secondary rounded-md p-3">
        <div className="flex gap-5">
          <span>{icon}</span>
          <span className="font-bold text-2xl hidden lg:block">{text}</span>
        </div>
      </div>
    </>
  );
};

export default SideBarItems;
