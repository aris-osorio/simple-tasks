import React from 'react';
import {PuffLoader} from 'react-spinners';

export default function Loading()
{
    document.title = 'Loading';
    return (
       <div>
            <div className="d-flex justify-content-center align-items-center">
                <PuffLoader color="#2c7eb4" size="250" />
                <p className="font-weight-light position-absolute txt-loading color-blue-1">Loading</p>    
            </div>
            <div className="position-relative">
                <p className="font-weight-light position-absolute txt-s color-blue-1">S</p>
                <p className="font-weight-light position-absolute txt-simple color-blue-1">SIMPLE</p>
                <p className="font-weight-light position-absolute txt-task color-blue-1">TASK</p>
            </div>
       </div>
    );
} 