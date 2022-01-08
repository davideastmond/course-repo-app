import "./notification-module-style.css";
import NotificationIconLit from "./notification-lit.svg";
import NotificationIconOff from "./notification-off.svg";
import { INotification } from "../../types/notification.types";
import { useState } from "react";
import NotificationItemsPanel from "./NotificationItemsPanel";
interface INotificationModuleProps {
  isLit: boolean;
  count: number;
  onClickOpen?: (data?: any) => void;
  notifications?: Array<INotification>;
  mainClassNames?: string;
  panelClassNames?: string;
}

function NotificationModule(props: INotificationModuleProps) {
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

  const handleNotificationClickOpen = () => {
    setIsPanelOpen(!isPanelOpen);
    props.onClickOpen && props.onClickOpen();
  };
  return (
    <div
      className={`NotificationModule__MainEnclosure ${
        props.mainClassNames || ""
      }`}
    >
      <div className="NotificationModule__InnerMain display-flex">
        <div
          className="NotificationModule__Main__iconContainer"
          onClick={handleNotificationClickOpen}
        >
          <img
            src={props.isLit ? NotificationIconLit : NotificationIconOff}
            alt="notification"
          />
          {/* {props.count > 0 && (
          <div className="NotificationModule__Main__count">
            {props.count}
          </div>
           )} */}
        </div>
      </div>
      {isPanelOpen && (
        <NotificationItemsPanel onPanelItemClicked={() => {}} items={[]} />
      )}
    </div>
  );
}

export default NotificationModule;
