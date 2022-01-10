import { INotification } from "../../../types/notification.types";
import GenericUserIcon from "../../profile-icon/Generic-User-Icon";
import "../notification-module-style.css";

interface INotificationPanelProps {
  onPanelItemClicked?: (notificationId: string) => void;
  items: Array<INotification>;
}

const UnRedDot = () => {
  return <div className="Notification__UnredDot"></div>;
};
const PanelItem = ({
  notificationItem,
  classNameData,
  onItemClick,
}: {
  notificationItem: INotification;
  classNameData?: string;
  onItemClick?: (notificationId: string) => void;
}) => {
  return (
    <div
      className={`PanelItem flex-container-notification ${
        classNameData || ""
      } mouse-hover`}
      onClick={() => onItemClick && onItemClick(notificationItem._id)}
      key={notificationItem._id}
    >
      <GenericUserIcon userName="test" />
      <div className="PanelItem__text slight-left-margin vertical-align">
        {notificationItem.message}
      </div>
      {!notificationItem.read && <UnRedDot />}
    </div>
  );
};

function NotificationItemsPanel(props: INotificationPanelProps) {
  // const testNotification: INotification = {
  //   _id: "test",
  //   sourceId: "testSource",
  //   targetId: "testTarget",
  //   message: "test message",
  //   updatedAt: new Date(),
  //   createdAt: new Date(),
  //   read: false,
  //   type: NotificationType.UserFollow,
  // };
  return (
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
            />
          ))}
      </div>
    </div>
  );
}

export default NotificationItemsPanel;
