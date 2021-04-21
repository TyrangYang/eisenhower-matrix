import {StackDivider, VStack} from '@chakra-ui/react';
import React, {FC} from 'react';

import {useRecoilValue} from 'recoil';
import {TodoIDListAtom} from '../Atom';
import ListBox from './ListBox';

const ListTable: FC = () => {
    const todoList = useRecoilValue(TodoIDListAtom);
    console.log(todoList);
    return (
        <div>
            <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch" padding={3}>
                {todoList.map((id) => {
                    return <ListBox key={id} itemID={id} />;
                })}
            </VStack>
        </div>
    );
};
export default ListTable;
