import React, { useState } from "react";
import "./edit-rack-style.css";
interface IEditRackProps {
  onEditButtonClicked: () => void;
  onSelectAll?: () => void;
  onDeselectAll?: () => void;
  actions: { [keyof: string]: any };
  labels: string[];
}
function EditRack(props: IEditRackProps) {
  const [rackOpen, setRackOpen] = useState<boolean>(false);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const handleAction = (actionLabel: string) => {
    const sanitizedActionLabel = actionLabel && actionLabel.toLowerCase();

    if (props.actions[sanitizedActionLabel]) {
      props.actions[sanitizedActionLabel]();
    }
  };
  const handleEditButtonClicked = () => {
    setRackOpen(!rackOpen);
    props.onEditButtonClicked();
  };

  const handleSelectDeselectAll = () => {
    if (selectAll) {
      props.onDeselectAll && props.onDeselectAll();
      setSelectAll(!selectAll);
    } else {
      props.onSelectAll && props.onSelectAll();
      setSelectAll(!selectAll);
    }
  };
  return (
    <div className="EditRack__Main">
      <div className="EditRack__flex-header">
        <div className="edit-option" onClick={handleEditButtonClicked}>
          Edit
        </div>
        {rackOpen &&
          props.labels.map((label) => (
            <div
              className={`edit-option edit-option-${label.toLowerCase()}`}
              onClick={() => handleAction(label)}
            >
              {label}
            </div>
          ))}
      </div>
      {rackOpen && (
        <>
          <input type="checkbox" onClick={handleSelectDeselectAll}></input>{" "}
        </>
      )}
    </div>
  );
}

export default EditRack;
