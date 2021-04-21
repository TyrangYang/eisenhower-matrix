import {useEffect, useState} from 'react';
import {RectangleLocationContainer} from './RectangleLocationContainer';
import {RectangleInner} from './RectangleInner';
import {Drag} from '../util/Drag';
// import {Resize} from '../util/Resize';
import {ID} from '../../../type';
import {oneTodoStateAtom, RectangleStateAtom} from '../../Atom';
import {useRecoilState, useRecoilValue} from 'recoil';

export const Rectangle = ({itemID}: {itemID: ID}) => {
    const oneTodo = useRecoilValue(oneTodoStateAtom(itemID));

    const [isSelected, setIsSelected] = useState(false);
    // const [rectangleState, setRectangleState] = useState({
    //     position: {top: 100, left: 100},
    //     size: {width: 200, height: 100},
    // });
    const [rectangleState, setRectangleState] = useRecoilState(RectangleStateAtom(itemID));

    // change start position
    useEffect(() => {
        if (oneTodo === null) return;
        const {urgent, important} = oneTodo;
        const leftStartPosition = 100 + (urgent ? 0 : 750);
        const topStartPosition = 100 + (important ? 0 : 500);
        setRectangleState((prev) => ({
            ...prev,
            position: {top: topStartPosition, left: leftStartPosition},
        }));
    }, [oneTodo, setRectangleState]);
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
