import React from "react";

interface TagProps {
  txt: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ txt, as: Tag = "h1", className }) => {
  return <Tag className={className}>{txt}</Tag>;
};

export default Tag;
