import {useRef} from 'react';
import {DraggableCore} from 'react-draggable';
import {RectangleRangeType, RectangleStyleType} from '../../../type';

type DragProps = {
    position: RectangleStyleType['position']; // Position represent left top point of child location
    onDrag: (position: RectangleStyleType['position']) => void;
    range: RectangleRangeType;
};

export const Drag: React.FC<DragProps> = ({position, onDrag, range, children}) => {
    const nodeRef = useRef(null);
    const {leftMin, leftMax, topMin, topMax} = range;
    return (
        <DraggableCore
            nodeRef={nodeRef}
            onDrag={(event: any) => {
                let left = event.movementX + position.left;
                let top = event.movementY + position.top;
                if (left < leftMin) left = leftMin;
                if (top < topMin) top = topMin;
                if (left > leftMax) left = leftMax;
                if (top > topMax) top = topMax;
                onDrag({
                    left,
                    top,
                });
            }}>
            {/* style={{width: 100, height: 100, border: '1px solid #f00'}} */}
            <div ref={nodeRef}>{children}</div>
            {/* {children} */}
        </DraggableCore>
    );
};
