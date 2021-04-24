import {DraggableCore} from 'react-draggable';
import {RectangleStyleType} from '../../../type';

type DragProps = {
    position: RectangleStyleType['position'];
    onDrag: (position: RectangleStyleType['position']) => void;
    range: {leftMost: number; topMost: number};
};

export const Drag: React.FC<DragProps> = ({position, onDrag, range, children}) => {
    // const nodeRef = useRef(null);
    return (
        <DraggableCore
            // nodeRef={nodeRef}
            onDrag={(event: any) => {
                let left = event.movementX + position.left;
                let top = event.movementY + position.top;
                if (left < 0) left = 0;
                if (top < 0) top = 0;
                if (left > range.leftMost) left = range.leftMost;
                if (top > range.topMost) top = range.topMost;
                onDrag({
                    left,
                    top,
                });
            }}>
            {/* <div style={{width: 100, height: 100, border: '1px solid #f00'}} ref={nodeRef}>
                {children}
            </div> */}
            {children}
        </DraggableCore>
    );
};
