import {useEffect, useMemo, useState} from 'react';
import {RectangleLocationContainer} from './RectangleLocationContainer';
import {RectangleInner} from './RectangleInner';
import {Drag} from '../utils/Drag';
// import {Resize} from '../util/Resize';
import {ID} from '../../../type';
import {AreaRangeAtom, CanvasStateAtom, OneTodoStateAtom, RectangleStateAtom} from '../../Atom';
import {useRecoilState, useRecoilValue} from 'recoil';

export const Rectangle = ({itemID}: {itemID: ID}) => {
    const [rectangleState, setRectangleState] = useRecoilState(RectangleStateAtom(itemID));
    const [isSelected, setIsSelected] = useState(false);
    const oneTodo = useRecoilValue(OneTodoStateAtom(itemID));
    // const canvasState = useRecoilValue(CanvasStateAtom);
    const AreaRange = useRecoilValue(AreaRangeAtom);

    const range = useMemo(() => {
        const {urgent, important} = oneTodo;
        if (urgent && important) return AreaRange.topLeft;
        else if (urgent && !important) return AreaRange.bottomLeft;
        else if (!urgent && important) return AreaRange.topRight;
        else return AreaRange.bottomRight;
    }, [AreaRange, oneTodo]);

    //  change location
    // useEffect(() => {
    //     let {left, top} = rectangleState.position;
    //     if (left < 0) left = 0;
    //     if (top < 0) top = 0;
    //     if (left > range.leftMax - rectangleState.size.width) left = range.leftMax - rectangleState.size.width;
    //     if (top > range.topMax - rectangleState.size.height) top = range.topMax - rectangleState.size.height;
    //     setRectangleState((prev) => ({...prev, position: {left, top}}));
    // }, [
    //     setRectangleState,
    //     range,
    //     rectangleState.size.width,
    //     rectangleState.size.height,
    //     rectangleState.position.left,
    //     rectangleState.position.top,
    // ]);

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
                    leftMin: range.leftMin,
                    topMin: range.topMin,
                    leftMax: range.leftMax - rectangleState.size.width,
                    topMax: range.topMax - rectangleState.size.height,
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
