import {useEffect, useState} from 'react';
import {RectangleLocationContainer} from './RectangleLocationContainer';
import {RectangleInner} from './RectangleInner';
import {Drag} from '../utils/Drag';
// import {Resize} from '../util/Resize';
import {ID} from '../../../type';
import {CanvasStateAtom, oneTodoStateAtom, RectangleStateAtom} from '../../Atom';
import {useRecoilState, useRecoilValue} from 'recoil';

export const Rectangle = ({itemID}: {itemID: ID}) => {
    const [isSelected, setIsSelected] = useState(false);

    const oneTodo = useRecoilValue(oneTodoStateAtom(itemID));

    const [rectangleState, setRectangleState] = useRecoilState(RectangleStateAtom(itemID));
    const canvasState = useRecoilValue(CanvasStateAtom);

    //  change location
    useEffect(() => {
        let left = rectangleState.position.left;
        let top = rectangleState.position.top;
        if (left < 0) left = 0;
        if (top < 0) top = 0;
        if (left > canvasState.width - rectangleState.size.width) left = canvasState.width - rectangleState.size.width;
        if (top > canvasState.height - rectangleState.size.height)
            top = canvasState.height - rectangleState.size.height;
        setRectangleState((prev) => ({...prev, position: {left, top}}));
    }, [
        canvasState,
        setRectangleState,
        rectangleState.size.width,
        rectangleState.size.height,
        rectangleState.position.left,
        rectangleState.position.top,
    ]);
    // change start position
    // useEffect(() => {
    //     if (oneTodo === null) return;
    //     const {urgent, important} = oneTodo;
    //     const leftStartPosition = 100 + (urgent ? 0 : 750);
    //     const topStartPosition = 100 + (important ? 0 : 500);
    //     setRectangleState((prev) => ({
    //         ...prev,
    //         position: {top: topStartPosition, left: leftStartPosition},
    //     }));
    // }, [oneTodo, setRectangleState]);
    if (oneTodo === null || !oneTodo?.inCanvas) return null;

    return (
        <RectangleLocationContainer
            position={rectangleState.position}
            size={rectangleState.size}
            onSelect={() => {
                console.log("I've been selected!");
                setIsSelected((prev) => true);
            }}>
            {/* resize */}
            {/* <Resize
                selected={isSelected}
                onResize={(style) => {
                    setRectangleState({...rectangleState, style});
                }}
                position={rectangleState.style.position}
                size={rectangleState.style.size}> */}
            {/* drag */}
            <Drag
                position={rectangleState.position}
                onDrag={(position) => {
                    setRectangleState({
                        ...rectangleState,
                        position,
                    });
                }}
                range={{
                    leftMin: 0,
                    topMin: 0,
                    leftMax: canvasState.width - rectangleState.size.width,
                    topMax: canvasState.height - rectangleState.size.height,
                }}>
                {/* drag component */}
                <div
                    style={{
                        width: rectangleState.size.width,
                        height: rectangleState.size.height,
                    }}>
                    <RectangleInner selected={isSelected} title={oneTodo.title} description={oneTodo.description} />
                </div>
            </Drag>
            {/* </Resize> */}
        </RectangleLocationContainer>
    );
};
