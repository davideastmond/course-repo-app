import {
  INotification,
  NotificationType,
} from "../../../types/notification.types";
import GenericUserIcon from "../../profile-icon/Generic-User-Icon";
import "../notification-module-style.css";

interface INotificationPanelProps {
  onPanelItemClicked?: () => void;
  items: Array<INotification>;
}

const UnRedDot = ({ count }: { count?: number }) => {
  return <div className="Notification__UnredDot"></div>;
};
const PanelItem = ({
  notificationItem,
  classNameData,
  onItemClick,
}: {
  notificationItem: INotification;
  classNameData?: string;
  onItemClick?: () => void;
}) => {
  return (
    <div
      className={`PanelItem flex-container ${classNameData || ""}`}
      onClick={onItemClick}
      key={notificationItem._id}
    >
      <GenericUserIcon userName="test" />
      <div className="PanelItem__text slight-left-margin vertical-align">
        {notificationItem.message}
      </div>
      <UnRedDot count={3} />
    </div>
  );
};

function NotificationItemsPanel(props: INotificationPanelProps) {
  const testNotification: INotification = {
    _id: "test",
    sourceId: "testSource",
    targetId: "testTarget",
    message: "test message",
    updatedAt: new Date(),
    createdAt: new Date(),
    read: false,
    type: NotificationType.UserFollow,
  };
  return (
    <div className="NotificationItemsPanel__main notification-flex-margin">
      <div className="NotificationItemsPanel__main__header">
        <div className="NotificationItemsPanel__main__header__text">
          Notifications
        </div>
      </div>
      <div className="NotificationItemsPanel__panelItemsContainer">
        <PanelItem
          notificationItem={testNotification}
          classNameData="main-font"
        />
        <PanelItem
          notificationItem={testNotification}
          classNameData="main-font"
        />
        <PanelItem
          notificationItem={testNotification}
          classNameData="main-font"
        />
        <PanelItem
          notificationItem={testNotification}
          classNameData="main-font"
        />
      </div>
    </div>
  );
}

export default NotificationItemsPanel;
