import React from 'react';
import {PuffLoader} from 'react-spinners';

export default function Loading(){
    return (
        <div className="d-flex justify-content-center align-items-center position-relative">
            <p class="text-primary position-absolute" style={{fontSize: 30}} >Loading</p>
            <PuffLoader color="#2c7eb4" size="250" />          
        </div>
    );
} 