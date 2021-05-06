import {StackDivider, VStack} from '@chakra-ui/react';
import React, {FC} from 'react';

import {useRecoilValue} from 'recoil';
import {sortTodoIDsList} from '../Atom';
import ListBox from './ListBox';

import {Flipper, Flipped} from 'react-flip-toolkit';

const ListTable: FC = () => {
    const todoList = useRecoilValue(sortTodoIDsList);

    return (
        <div>
            <Flipper flipKey={todoList.join('')}>
                <VStack
                    divider={<StackDivider borderColor="gray.200" />}
                    spacing={4}
                    align="stretch"
                    data-testid="test-table-list">
                    {todoList.map((id) => {
                        return (
                            <Flipped key={id} flipId={id}>
                                <div>
                                    <ListBox itemID={id} />
                                </div>
                            </Flipped>
                        );
                    })}
                </VStack>
            </Flipper>
        </div>
    );
};
export default ListTable;
