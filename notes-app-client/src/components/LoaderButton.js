import React from "react";
import { Button, Glyphicon } from "react-bootstrap";
import "../stylesheets/LoaderButton.css";

function LoaderButton({
  isLoading,
  text,
  loadingText,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <Button
      className={`LoaderButton ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Glyphicon glyph='refresh' className='spinning' />}
      {!isLoading ? text : loadingText}
    </Button>
  );
}
export default LoaderButton;
