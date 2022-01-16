import { useState } from "react";
import { INotification } from "../../../types/notification.types";
import { truncateString } from "../../../utils/string/truncate-string";
import GenericUserIcon from "../../profile-icon/Generic-User-Icon";
import "../notification-module-style.css";
import NotificationPanelItemContextMenu from "../PanelItemsContextMenu/PanelItemsContextMenu";

interface INotificationPanelProps {
  onPanelItemClicked?: (notificationId: string) => void;
  onClickOffArea: () => void;
  items: Array<INotification>;
  onDeleteNotificationClicked: (id: string) => void;
}

const UnRedDot = () => {
  return <div className="Notification__UnredDot notification-dot"></div>;
};
const PanelItem = ({
  notificationItem,
  classNameData,
  onItemClick,
  onContextMenuDeleteNotificationClicked,
}: {
  notificationItem: INotification;
  classNameData?: string;
  onItemClick?: (notificationId: string) => void;
  onContextMenuDeleteNotificationClicked?: (id: string) => void;
}) => {
  const [
    notificationPanelItemContextMenuIsVisible,
    setNotificationPanelItemContextMenuIsVisible,
  ] = useState<boolean>(false);
  const handleItemClick = (event: any, notificationId: string) => {
    event?.stopPropagation();
    onItemClick && onItemClick(notificationItem._id);
  };
  const handleDeleteNotificationContextMenuClick = (event: any, id: string) => {
    event?.stopPropagation();
    onContextMenuDeleteNotificationClicked &&
      onContextMenuDeleteNotificationClicked(id);
  };
  return (
    <div
      className={`PanelItem grid-container-notification ${
        classNameData || ""
      } mouse-hover`}
      onClick={(event: any) => handleItemClick(event, notificationItem._id)}
      onMouseOver={() => setNotificationPanelItemContextMenuIsVisible(true)}
      onMouseLeave={() => setNotificationPanelItemContextMenuIsVisible(false)}
      key={notificationItem._id}
    >
      <GenericUserIcon
        userName="test"
        classNames="Generic-User-Icon-grid-area"
      />
      <div className="PanelItem__text slight-left-margin vertical-align notification-panel-item-text">
        {truncateString({ text: notificationItem.message, maxLength: 50 })}
      </div>
      {!notificationItem.read && <UnRedDot />}
      {notificationPanelItemContextMenuIsVisible && (
        <NotificationPanelItemContextMenu
          onMenuItemClicked={handleDeleteNotificationContextMenuClick}
          contextId={notificationItem._id}
        />
      )}
    </div>
  );
};

function NotificationItemsPanel(props: INotificationPanelProps) {
  return (
    <div
      className="NotificationItemsPanel__main_parent"
      onClick={props.onClickOffArea}
    >
      <div className="NotificationItemsPanel__main notification-flex-margin">
        <div className="NotificationItemsPanel__main__header">
          <div className="NotificationItemsPanel__main__header__text">
            Notifications
          </div>
        </div>
        <div className="NotificationItemsPanel__panelItemsContainer">
          {props.items.length === 0 && <div>No notifications</div>}
          {props.items &&
            props.items.length > 0 &&
            props.items.map((individualNotification) => (
              <PanelItem
                notificationItem={individualNotification}
                onItemClick={props.onPanelItemClicked}
                onContextMenuDeleteNotificationClicked={
                  props.onDeleteNotificationClicked
                }
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default NotificationItemsPanel;
