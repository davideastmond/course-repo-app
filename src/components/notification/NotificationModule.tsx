import "./notification-module-style.css";
import NotificationIconLit from "./notification-lit.svg";
import NotificationIconOff from "./notification-off.svg";
interface INotificationModuleProps {
  isLit: boolean;
  count: number;
  onClickOpen: (data?: any) => void;
  notifications?: Array<any>;
}
function NotificationModule(props: INotificationModuleProps) {
  const handleNotificationClickOpen = () => {
    props.onClickOpen();
  };
  return (
    <div className="NotificationModule__Main display-flex">
      <div
        className="NotificationModule__Main__iconContainer"
        onClick={handleNotificationClickOpen}
      >
        <img
          src={props.isLit ? NotificationIconLit : NotificationIconOff}
          alt="notification"
        />
      </div>
      {props.count > 0 && (
        <div className="NotificationModule__Main__count">{props.count}</div>
      )}
    </div>
  );
}

export default NotificationModule;
