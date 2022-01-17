import React, { useState, useEffect } from "react";
import { getArrayOfInterestTagsFromString } from "../../utils/string-array/get-sanitized-tags-array";
import ActionButton from "../Buttons/ActionButton";
import ContentTag from "../Content-tag";
import StylizedTextInput from "../stylized-text-input";
import "./tag-applet-style.css";

interface ITagAppletProps {
  onTagsChanged?: (tags: string[]) => void;
  tags?: string[];
  readOnly: boolean;
  inputBoxClassnames?: string;
  addButtonTitle?: string;
}

function TagApplet(props: ITagAppletProps) {
  const [contentTags, setContentTags] = useState<string[]>(props.tags || []);
  const [contentTagRawString, setContentTagRawString] = useState<string>("");
  const handleContentTags = (e?: any) => {
    if (contentTagRawString) {
      const splitTags = getArrayOfInterestTagsFromString(contentTagRawString);
      const newTags = Array.from(new Set([...contentTags, ...splitTags]));
      setContentTags(newTags);
      setContentTagRawString("");

      if (props.onTagsChanged) {
        props.onTagsChanged(newTags);
      }
    }
  };

  const handleContentTagRawStringChange = (e: any) => {
    if (e.target.value) {
      setContentTagRawString(e.target.value.trim());
    }
  };

  const handleDeleteTag = (titleString: string) => {
    if (contentTags) {
      const filteredTags = contentTags.filter((tag) => {
        return tag !== titleString;
      });
      setContentTags(filteredTags);
      if (props.onTagsChanged) {
        props.onTagsChanged(filteredTags);
      }
    }
  };
  useEffect(() => {
    if (props.readOnly && props.tags && props.tags.length > 0) {
      setContentTags(props.tags);
    }
  });

  useEffect(() => {
    if (props.tags) {
      setContentTags(props.tags);
    }
  });

  useEffect(() => {
    const input = document.getElementById("modal-tags") as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  }, [contentTagRawString]);

  return (
    <div className="TagApplet__Main-enclosure">
      {!props.readOnly && (
        <div className="TagApplet__input-enclosure">
          <div className="TagApplet__TextInput__Main">
            <StylizedTextInput
              id="modal-tags"
              placeholderText="React, Adobe, Figma"
              label="Add a comma between each tag. Example: sales,"
              inputBoxClassNames={`single-height-input-box-50px ${
                props.inputBoxClassnames ? props.inputBoxClassnames : ""
              }`}
              onTextChange={handleContentTagRawStringChange}
              onEnterKeyPressed={handleContentTags}
              clearOnEnter={true}
              value={contentTagRawString}
            />
          </div>
          <div className="TagApplet__Action-button__Main align-base-end">
            <ActionButton
              title={props.addButtonTitle || ""}
              plusSymbol={true}
              classNames="bkg-green"
              action={handleContentTags}
            />
          </div>
        </div>
      )}
      <div className="TagApplet__Tags-display">
        {contentTags &&
          contentTags.length > 0 &&
          contentTags.map((tag, index) => (
            <ContentTag
              title={tag}
              hasCloseButton={!props.readOnly}
              closeButtonClicked={handleDeleteTag}
              key={`${index}_${tag}`}
            />
          ))}
      </div>
    </div>
  );
}
export default TagApplet;
