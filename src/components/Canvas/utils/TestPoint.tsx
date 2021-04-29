import {Box} from '@chakra-ui/react';
import React, {FC, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {CanvasStateAtom} from '../../Atom';
import {Drag} from './Drag';

interface Props {}
const TestPoint: FC<Props> = () => {
    const [position, setPosition] = useState({top: 100, left: 100});
    const canvasState = useRecoilValue(CanvasStateAtom);
    return (
        <Box position="absolute" style={{...position}} width={13} height={13} backgroundColor="red">
            <Drag
                position={position}
                range={{leftMin: 0, leftMax: canvasState.width, topMin: 0, topMax: canvasState.height}}
                onDrag={(position) => {
                    setPosition(position);
                }}>
                <Box width={13} height={13}></Box>
            </Drag>
        </Box>
    );
};
export default TestPoint;
