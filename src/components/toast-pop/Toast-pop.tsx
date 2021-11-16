import { useEffect } from "react";
import "./toast-pop-style.css";

interface ToastPopProps {
  text: string;
  textStyle?: string;
  backgroundStyle?: string;
  duration?: number;
  onDisappear: () => void;
  sticky?: boolean;
}

function ToastPop({
  text,
  textStyle,
  backgroundStyle,
  onDisappear,
  duration,
  sticky,
}: ToastPopProps) {
  useEffect(() => {
    if (duration && duration > 0 && !sticky) {
      setTimeout(() => {
        onDisappear && onDisappear();
      }, duration * 1000);
    }
  }, []);

  return (
    <div
      className={`ToastPop__main ${backgroundStyle ? backgroundStyle : ""}`}
      onClick={onDisappear}
    >
      <div className={`ToastPop__text-enclosure ${textStyle ? textStyle : ""}`}>
        {text}
      </div>
    </div>
  );
}

export default ToastPop;
