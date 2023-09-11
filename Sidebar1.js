import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Sidebar1() {
    return (
       
           <div className="bg-white sidebar p-2">
            <div>
                <i className="bi bi-sun me-2 fs-4"></i>
                <span className="brand-name fs-4">Xpert3D</span>
            </div>
            <hr className="text-dark"></hr>
            <div className="list-group list-group-flush">
                <a className="list-group-item py-2">
                    <i className="bi bi-image fs-5 me-2"></i>
                    <span className="fs-5">Image to 3D</span>
                </a>
                <a className="list-group-item py-2">
                    <i className="bi bi-clipboard-data fs-5 me-2"></i>
                    <span className="fs-5">Text to 3D</span>
                </a>
                <a className="list-group-item py-2">
                    <i className="bi bi-camera fs-5 me-2"></i>
                    <span className="fs-5">Video to 3D</span>
                </a>
            </div>
           </div>
       
    )
}

export default Sidebar1