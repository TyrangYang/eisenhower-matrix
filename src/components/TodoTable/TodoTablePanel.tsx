import {Flex} from '@chakra-ui/layout';
import React, {FC} from 'react';
import AddTodo from './AddTodo';
import ListTable from './ListTable';

const TodoTablePanel: FC = () => {
    return (
        <div>
            <ListTable />
            <br />
            <Flex justifyContent="center">
                <AddTodo />
            </Flex>
        </div>
    );
};
export default TodoTablePanel;
