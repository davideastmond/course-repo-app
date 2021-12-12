import ErrorAlertIconRed from "../../images/icons/error-alert-circle-red.svg";
import InfoAlertIcon from "../../images/icons/info-icon.svg";

export enum AlertType {
  Alert = "alert",
  Error = "error",
  Info = "info",
  Notification = "notification",
}

export const AlertIconMap: { [key in AlertType]: string } = {
  alert: ErrorAlertIconRed,
  info: InfoAlertIcon,
  notification: "",
  error: ErrorAlertIconRed,
};
