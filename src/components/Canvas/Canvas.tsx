import {Box, Flex, Grid, GridItem, Text} from '@chakra-ui/react';
import {throttle} from 'lodash';
import {useCallback, useEffect, useRef} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {AreaRangeAtom, CanvasStateAtom, TodoIDListAtom} from '../Atom';
import {Rectangle} from './Rectangle/Rectangle';
import TestPoint from './utils/TestPoint';

export const Canvas: React.FC = () => {
    const ids = useRecoilValue(TodoIDListAtom);
    const setCanvasState = useSetRecoilState(CanvasStateAtom);
    const setAreaRange = useSetRecoilState(AreaRangeAtom);
    const canvasRef = useRef<HTMLDivElement>(null);
    const topLeftAreaRef = useRef<HTMLDivElement>(null);
    const topRightAreaRef = useRef<HTMLDivElement>(null);
    const bottomLeftAreaRef = useRef<HTMLDivElement>(null);
    const bottomRightAreaRef = useRef<HTMLDivElement>(null);

    const changeCanvasState = useCallback(() => {
        let height: number, width: number;
        if (canvasRef.current !== null) {
            height = canvasRef.current.clientHeight;
            width = canvasRef.current.clientWidth;
            setCanvasState({height, width});
        }

        const refToRange = (ref: HTMLDivElement) => {
            const {offsetTop, offsetLeft, offsetHeight, offsetWidth} = ref;
            return {
                leftMin: offsetLeft,
                topMin: offsetTop,
                leftMax: offsetLeft + offsetWidth,
                topMax: offsetTop + offsetHeight,
            };
        };
        if (
            topLeftAreaRef.current !== null &&
            topRightAreaRef.current !== null &&
            bottomLeftAreaRef.current !== null &&
            bottomRightAreaRef.current !== null
        ) {
            setAreaRange({
                topLeft: refToRange(topLeftAreaRef.current),
                topRight: refToRange(topRightAreaRef.current),
                bottomLeft: refToRange(bottomLeftAreaRef.current),
                bottomRight: refToRange(bottomRightAreaRef.current),
            });
        }
    }, [setCanvasState, setAreaRange]);

    // change canvas size when resizing the windows
    useEffect(() => {
        const handleWindowResize = throttle(changeCanvasState, 300);

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [changeCanvasState]);

    // set canvas size
    useEffect(changeCanvasState, [changeCanvasState]);

    return (
        <Flex
            ref={canvasRef}
            position="relative"
            direction="column"
            width="100%"
            height="100%"
            // style={{border: '10px solid #f00'}}
            onClick={(e) => {
                // TODO: clean selected components
                console.log('click canvas');
            }}>
            <Grid flex={1} templateColumns={'40px 1fr 1fr'} templateRows={'40px 1fr 1fr'} gap={4} padding={10}>
                <GridItem></GridItem>
                <GridItem>URGENT</GridItem>
                <GridItem>NOT URGENT</GridItem>
                <GridItem>
                    <Text style={{writingMode: 'vertical-rl', textOrientation: 'upright'}}>IMPORTANT</Text>
                </GridItem>
                <GridItem ref={topLeftAreaRef} background="rgb(65,208,138)" borderRadius={15}></GridItem>
                <GridItem ref={topRightAreaRef} background="rgb(234,195,27)" borderRadius={15}></GridItem>
                <GridItem>
                    <Text style={{writingMode: 'vertical-rl', textOrientation: 'upright'}}>NOT IMPORTANT</Text>
                </GridItem>
                <GridItem ref={bottomLeftAreaRef} background="rgb(44,138,162)" borderRadius={15}></GridItem>
                <GridItem ref={bottomRightAreaRef} background="rgb(208,38,0)" borderRadius={15}></GridItem>
            </Grid>
            <Box position="absolute">
                {ids.map((eachID) => (
                    <Rectangle key={`canvas-${eachID}`} itemID={eachID} />
                ))}
            </Box>
            <TestPoint />
        </Flex>
    );
};
