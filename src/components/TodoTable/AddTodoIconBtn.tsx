import {v4 as uuidV4} from 'uuid';
import {Icon, IconButton} from '@chakra-ui/react';
import React, {FC} from 'react';
import {GrAdd} from 'react-icons/gr';
import {useSetRecoilState} from 'recoil';
import {TodoIDListAtom} from '../Atom';

const AddTodo: FC = () => {
    const setIds = useSetRecoilState(TodoIDListAtom);
    return (
        <>
            <IconButton
                aria-label="addNewTodo"
                isRound
                icon={<Icon as={GrAdd} />}
                onClick={() => {
                    const newID = uuidV4();
                    setIds((prev) => [...prev, newID]);
                }}
            />
        </>
    );
};
export default AddTodo;
