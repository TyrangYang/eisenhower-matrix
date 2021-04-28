import {StackDivider, VStack} from '@chakra-ui/react';
import React, {FC, forwardRef} from 'react';

import {useRecoilValue} from 'recoil';
import {sortTodoIDsList} from '../Atom';
import ListBox from './ListBox';

import FlipMove from 'react-flip-move';

const FunctionalListBox = forwardRef<any>((props: any, ref) => {
    return (
        <div ref={ref}>
            <ListBox itemID={props.itemID} />
        </div>
    );
});

const ListTable: FC = () => {
    const todoList = useRecoilValue(sortTodoIDsList);

    return (
        <div>
            <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
                {/* {todoList.map((id) => {
                        return <ListBox key={id} itemID={id} />;
                    })} */}
                <FlipMove>
                    {todoList.map((id) => {
                        return <FunctionalListBox key={id} {...{itemID: id}} />;
                    })}
                </FlipMove>
            </VStack>
        </div>
    );
};
export default ListTable;
