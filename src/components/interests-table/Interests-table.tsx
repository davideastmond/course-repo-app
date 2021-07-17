import React from "react";
import ActionButton from "../Buttons/ActionButton";
import EmptyInterestsSection from "./Empty-interests";
import InterestsList from "./Interests-list";
interface IInterestsTableProps {
  interestTags: string[];
  classNames?: string;
  tableClassNames?: string;
}
function InterestsTable(props: IInterestsTableProps) {
  return (
    <div className={`Interests-section__Main-body ${props.classNames || ""}`}>
      <table
        id="table-interest-data"
        className={`profile-table table-font ${props.tableClassNames || ""}`}
      >
        <thead>
          <tr>
            <td className="Main-table-header-profile bottom-border cell-padding label-category-width">
              Interests
            </td>
          </tr>
        </thead>
        <tbody>
          {(!props.interestTags || props.interestTags.length === 0) && (
            <EmptyInterestsSection />
          )}
          {props.interestTags && props.interestTags.length > 0 && (
            <tr>
              <InterestsList interestTags={props.interestTags} />
            </tr>
          )}
        </tbody>
      </table>
      <ActionButton
        plusSymbol={true}
        title="Add an interest"
        classNames="Action-button__slim Add-Interests-Button-top-margin-buffer"
      />
    </div>
  );
}

export default InterestsTable;
