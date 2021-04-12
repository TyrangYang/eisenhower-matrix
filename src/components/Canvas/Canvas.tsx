import {Box, Flex} from '@chakra-ui/react';
import {useRecoilValue} from 'recoil';
import {ID} from '../../type';
import {TodoIDListWithInitState} from '../Atom';
import {Rectangle} from './Rectangle/Rectangle';

export const Canvas: React.FC = () => {
    const {ids} = useRecoilValue(TodoIDListWithInitState);

    console.log(ids);
    return (
        <Flex
            direction="column"
            width="100%"
            height="100%"
            // style={{border: '10px solid #f00'}}
            onClick={() => {
                // TODO: clean selected components
            }}>
            <Box flex={1} position="relative">
                {ids.map((eachID) => (
                    <Rectangle key={`canvas-${eachID}`} itemID={eachID} />
                ))}
            </Box>
        </Flex>
    );
};
