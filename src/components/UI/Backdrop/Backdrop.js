import React from 'react';

import classse from './Backdrop.css';

const backdrop = (props) => (
    props.show ? <div className={classse.Backdrop} onClick={props.clicked}></div> : null
);

export default backdrop;
 

