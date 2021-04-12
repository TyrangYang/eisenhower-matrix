import {useState} from 'react';
import {RectangleLocationContainer} from './RectangleLocationContainer';
import {RectangleInner} from './RectangleInner';
import {Drag} from '../util/Drag';
import {Resize} from '../util/Resize';
import {ID} from '../../../type';
import {oneTodoState} from '../../Atom';
import {useRecoilState} from 'recoil';

export type ElementStyle = {
    position: {top: number; left: number};
    size: {width: number; height: number};
};

export const Rectangle = ({itemID}: {itemID: ID}) => {
    const [oneTodo, setOneTodo] = useRecoilState(oneTodoState(itemID));

    const [isSelected, setIsSelected] = useState(false);
    const [rectangleState, setRectangleState] = useState({
        style: {
            position: {top: 100, left: 100},
            size: {width: 200, height: 100},
        },
    });
    if (!oneTodo?.inCanvas) return null;
    return (
        <RectangleLocationContainer
            position={rectangleState.style.position}
            size={rectangleState.style.size}
            onSelect={() => {
                console.log("I've been selected!");
                setIsSelected((prev) => true);
            }}>
            {/* resize */}
            <Resize
                selected={isSelected}
                onResize={(style) => {
                    setRectangleState({...rectangleState, style});
                }}
                position={rectangleState.style.position}
                size={rectangleState.style.size}>
                {/* drag */}
                <Drag
                    position={rectangleState.style.position}
                    onDrag={(position) => {
                        setRectangleState({
                            style: {
                                ...rectangleState.style,
                                position,
                            },
                        });
                    }}>
                    {/* drag component */}
                    <div
                        style={{
                            width: rectangleState.style.size.width,
                            height: rectangleState.style.size.height,
                        }}>
                        <RectangleInner selected={isSelected} title={oneTodo.title} description={oneTodo.description} />
                    </div>
                </Drag>
            </Resize>
        </RectangleLocationContainer>
    );
};
