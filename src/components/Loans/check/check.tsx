import React from "react";
import { Link } from "react-router-dom";
import "../NotFound/NotFound.css";

function Notfound() {
  return (
    <div className="main_wrapper">
      <div className="main">
        <div className="text_404">
          <div className="text_4041">4</div>
          <div className="text_4042">0</div>
          <div className="text_4043">4</div>
        </div>
        <div className="notfound_text">NOT FOUND</div>
        <div>
          <Link to="/">
            <button>Volver al inicio</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Notfound;