import { useState } from "react";
import { ContextMenu, ContextMenuOption } from "../../context-menu";
import "./PanelItemsContextMenu-style.css";

interface INotificationPanelItemContextMenuProps {
  onMenuItemClicked: (event: any, id: string) => void;
  contextId: string;
}

const ElipsesDots = ({
  context,
  onClick,
}: {
  context: string;
  onClick: (id: string) => void;
}) => {
  return (
    <div className="ElipsesDotsParent" onClick={() => onClick(context)}>
      <div className="elipses_dot"></div>
      <div className="elipses_dot"></div>
      <div className="elipses_dot"></div>
    </div>
  );
};

function NotificationPanelItemContextMenu(
  props: INotificationPanelItemContextMenuProps
) {
  const [contextMenuOpen, setContextMenuOpen] = useState<boolean>(false);
  const handleOnContextMenuClickOpen = () => {
    setContextMenuOpen(true);
  };
  const handleDeleteNotification = (e: any) => {
    setContextMenuOpen(false);
    props.onMenuItemClicked(e, props.contextId);
  };
  return (
    <div
      className="NotificationPanelItemContextMenu__parent notification-context-menu-circle"
      onClick={handleOnContextMenuClickOpen}
    >
      <div className="NotificationPanelItemContextMenu__button-icon__main">
        <div className="NotificationPanelItemContextMenu__button-icon__bigCircle">
          <div className="elipses_dot_container">
            <ElipsesDots
              onClick={handleOnContextMenuClickOpen}
              context={props.contextId}
            />
          </div>
        </div>
      </div>
      {contextMenuOpen && (
        <div className="NotificationPanelItemContextMenu__body">
          <ContextMenu optionalClassNames="remove-absolute-positioning">
            <ContextMenuOption
              title="Remove"
              action={() => {}}
              onActionClicked={handleDeleteNotification}
            />
          </ContextMenu>
        </div>
      )}
    </div>
  );
}

export default NotificationPanelItemContextMenu;
