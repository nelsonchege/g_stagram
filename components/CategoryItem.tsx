import React from "react";

type CategoryItemProps = {
  name: string;
};

const CategoryItem = ({ name }: CategoryItemProps) => {
  return (
    <div className="border border-gray-200 dark:border-gray-500  shadow-sm hover:shadow-lg px-5 py-3 rounded-xl cursor-pointer max-h-12 ">
      {name}
    </div>
  );
};

export default CategoryItem;
