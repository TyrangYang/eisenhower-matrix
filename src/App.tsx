import {Grid, GridItem} from '@chakra-ui/layout';
import React, {FC} from 'react';
import {RecoilRoot} from 'recoil';
import {Canvas} from './components/Canvas/Canvas';
import TodoTablePanel from './components/TodoTable/TodoTablePanel';

const App: FC = () => {
    return (
        <RecoilRoot>
            <Grid h="100vh" templateRows="1fr" templateColumns="repeat(4, 1fr)" gap={3} margin="5px">
                <GridItem colSpan={1} border="1px solid #333" padding="3px">
                    <TodoTablePanel />
                </GridItem>
                <GridItem colSpan={3} border="1px solid #333">
                    <Canvas />
                </GridItem>
            </Grid>
        </RecoilRoot>
    );
};

export default App;
