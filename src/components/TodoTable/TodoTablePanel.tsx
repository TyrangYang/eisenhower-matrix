import {Flex} from '@chakra-ui/layout';
import {Box} from '@chakra-ui/react';
import React, {FC} from 'react';
import AddTodoIconBtn from './AddTodoIconBtn';
import AddTodoForm from './AddTodoForm';
import ListTable from './ListTable';

const TodoTablePanel: FC = () => {
    return (
        <Box padding={3}>
            <AddTodoForm />
            <br />
            <ListTable />
            <Flex justifyContent="center">
                <AddTodoIconBtn />
            </Flex>
        </Box>
    );
};
export default TodoTablePanel;
