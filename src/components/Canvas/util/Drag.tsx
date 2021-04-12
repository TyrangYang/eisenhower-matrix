import {DraggableCore} from 'react-draggable';
import {ElementStyle} from '../Rectangle/Rectangle';

type DragProps = {
    position: ElementStyle['position'];
    onDrag: (position: ElementStyle['position']) => void;
};

export const Drag: React.FC<DragProps> = ({position, onDrag, children}) => {
    // const nodeRef = useRef(null);
    return (
        <DraggableCore
            // nodeRef={nodeRef}
            onDrag={(event: any) => {
                onDrag({
                    left: event.movementX + position.left,
                    top: event.movementY + position.top,
                });
            }}>
            {/* <div style={{width: 100, height: 100, border: '1px solid #f00'}} ref={nodeRef}>
                {children}
            </div> */}
            {children}
        </DraggableCore>
    );
};
