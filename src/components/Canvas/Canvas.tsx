import {Box, Flex, Grid, GridItem, Text} from '@chakra-ui/react';
import {useRecoilValue} from 'recoil';
import {TodoIDListAtom} from '../Atom';
import {Rectangle} from './Rectangle/Rectangle';

export const Canvas: React.FC = () => {
    const ids = useRecoilValue(TodoIDListAtom);
    return (
        <Flex
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
                <GridItem background="rgb(65,208,138)" borderRadius={15}></GridItem>
                <GridItem background="rgb(234,195,27)" borderRadius={15}></GridItem>
                <GridItem>
                    <Text style={{writingMode: 'vertical-rl', textOrientation: 'upright'}}>NOT IMPORTANT</Text>
                </GridItem>
                <GridItem background="rgb(44,138,162)" borderRadius={15}></GridItem>
                <GridItem background="rgb(208,38,0)" borderRadius={15}></GridItem>
            </Grid>
            <Box position="absolute">
                {ids.map((eachID) => (
                    <Rectangle key={`canvas-${eachID}`} itemID={eachID} />
                ))}
            </Box>
        </Flex>
    );
};
