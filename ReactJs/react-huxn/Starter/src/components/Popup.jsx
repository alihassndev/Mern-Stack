import ReactDOM from "react";

const Popup = ({ copied }) => {
  return ReactDOM.createPortal(
    <div>
      {copied && (
        <div style={{ position: "absolute", bottom: "3rem", right: "3rem" }}>
          copied to clipboard
        </div>
      )}
    </div>,
    document.getElementById("popup")
  );
};

export default Popup;
