import React, { useState } from "react";
import paths from './map';

export function Morocco() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [tooltip, setTooltip] = useState<{x: number, y: number, name: string} | null>(null);

    const handleMouseEnter = (index: number, event: React.MouseEvent<SVGPathElement>, name: string) => {
        setHoveredIndex(index);
        setTooltip({x: event.clientX, y: event.clientY, name: name});
    };

    const handleMouseMove = (event: React.MouseEvent<SVGPathElement>) => {
        if (tooltip) {
            setTooltip({x: event.clientX, y: event.clientY, name: tooltip.name});
        }
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
        setTooltip(null);
    };

    return(
        <div>
            <svg width="541" height="541" viewBox="0 0 541 541" fill="none" xmlns="http://www.w3.org/2000/svg">
                {paths.map((path, index) =>{
                    return(path.fill && (
                        <path
                            key={index}
                            d={path.d}
                            fill={hoveredIndex === index ? "#FF0000" : path.fill}
                            onMouseEnter={(event) => handleMouseEnter(index, event, path.name)}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            stroke="white"
                        />)
                    );
                })}
            </svg>
            {tooltip && (
                <div style={
                    {
                        position: 'absolute', 
                        top: tooltip.y-15, 
                        left: tooltip.x-20,
                        backgroundColor: 'purple',
                        color: 'white',
                        fontSize: '12px'
                    }
                }>
                    {tooltip.name}
                </div>
            )}
        </div>
    )
}