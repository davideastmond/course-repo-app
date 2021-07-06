import React from "react";
import "./content-tag-style.css";
interface IContentTagProps {
  title: string;
  link?: string;
}
function ContentTag(props: IContentTagProps) {
  return <div className="Content-tag__main">{props.title}</div>;
}

export default ContentTag;
