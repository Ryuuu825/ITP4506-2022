import React from "react";
import PropTypes from "prop-types";

export class ConfirmModal extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="absolute z-[102] bg-gray-100 p-3 h-[90%] w-full opacity-80" id="modal">
        <div className="mx-auto w-full h-full text-center flex flex-col items-center justify-center">
          {this.props.children}

          <div className="flex flex-row justify-center mt-4">
            <div
                className=" bg-green-700 select-none text-white px-4 py-2 rounded-md cursor-pointer"
                onClick={() => {
                    this.onClose();
                }}
            >
                Cancel
            </div>
            <div
                className="bg-red-700 select-none text-white px-4 py-2 rounded-md cursor-pointer ml-2"
                onClick={() => {
                    this.props.onConfirm();
                    this.onClose();
                }}
            >
                Delete
            </div>
        </div>
          
        </div>
        
      </div>
    );
  }
}

ConfirmModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
};
  

export class Modal extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="absolute z-[102] bg-black p-3 h-[90%] w-full opacity-70" id="modal">
        <div className="mx-auto w-full h-full text-center flex flex-col items-center justify-center">
          {this.props.children}
        </div>
        
      </div>
    );
  }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
};