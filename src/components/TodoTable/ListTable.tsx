import {StackDivider, VStack} from '@chakra-ui/react';
import React, {FC} from 'react';

import {useRecoilValue} from 'recoil';
import {TodoIDListWithInitState} from '../Atom';
import ListBox from './ListBox';

const ListTable: FC = () => {
    const todoList = useRecoilValue(TodoIDListWithInitState);

    return (
        <div>
            <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
                {todoList.ids.map((id) => {
                    return <ListBox key={id} item={todoList.initTodoState[id]} />;
                })}
            </VStack>
        </div>
    );
};
export default ListTable;
