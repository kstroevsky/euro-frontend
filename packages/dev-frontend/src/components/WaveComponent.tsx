import React, { useRef, useEffect } from 'react';
import useCanvas from '../hooks/useCanvas'; 
import { resizeCanvasToDisplaySize } from '../utils/resizeCanvas';

export const WaveComponent = (props:any) => {
    
    const { draw, options, ...rest } = props;
    const canvasRef = useCanvas(draw);

    return <canvas style={{position:'absolute', zIndex:-1, opacity: 0.2}} ref={canvasRef} {...rest}/>
}