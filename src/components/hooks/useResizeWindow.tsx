import {throttle} from 'lodash';
import React, {FC, useEffect, useState} from 'react';

type hookType = ({handleWindowResize}: {handleWindowResize: any}) => any;

const useResizeWindow: hookType = ({handleWindowResize}) => {
    const [element, setElement] = useState();

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [handleWindowResize]);

    return;
};
export default useResizeWindow;
