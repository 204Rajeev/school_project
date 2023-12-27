// Modal.js

import React from "react";
import { Modal as BootstrapModal } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Modal = ({steps, show, onHide }) => {

    const history = useHistory();

    const handleStep = ()=>{
        if(steps)
        history.push(steps);
    }
  return (
    <BootstrapModal show={show} onHide={onHide}>
      
      <BootstrapModal.Body >
        <p className="h5 text-center">Form Aready submitted! Do you want to edit it?</p>
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
      <button className="btn-secondary btn" onClick={onHide}>Close</button>
        <button className="btn-primary btn" onClick={handleStep}>Continue</button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default Modal;
