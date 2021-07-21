import React from "react";
import "./page-error-style.css";
function PageError({
  error,
  className,
}: {
  error: string;
  className?: string;
}) {
  return error ? (
    <p className={`Page-error ${className || ""}`}>{error}</p>
  ) : null;
}

export default PageError;
