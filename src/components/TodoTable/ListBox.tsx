import React, {FC, useEffect} from 'react';
import {Box, Checkbox, Flex, Icon, IconButton, Switch} from '@chakra-ui/react';
import {GiPencilBrush} from 'react-icons/gi';
import {BiEraser} from 'react-icons/bi';
import {useRecoilState} from 'recoil';
import {oneTodoState} from '../Atom';
import {Todo} from '../../type';

interface Props {
    item: Todo;
}

const toggleOneTodo = (prev: Todo | null, felid: 'completed' | 'urgent' | 'important' | 'inCanvas'): Todo | null => {
    if (prev === null) return null;
    return {...prev, [felid]: !prev[felid]};
};

const ListBox: FC<Props> = ({item}) => {
    const [oneTodo, setOneTodo] = useRecoilState(oneTodoState(item.id));
    useEffect(() => {
        setOneTodo(item);
    }, [item, setOneTodo]);
    console.log(oneTodo);
    return (
        <Box h="60px">
            <Flex justifyContent="space-between" alignItems="center">
                <Box>{oneTodo?.title}</Box>
                <Checkbox
                    size="lg"
                    isChecked={oneTodo?.completed}
                    onChange={() => {
                        setOneTodo((prev) => toggleOneTodo(prev, 'completed'));
                    }}
                />
                <Box>
                    {'Urgent: '}
                    <Switch
                        isChecked={oneTodo?.urgent}
                        colorScheme="teal"
                        size="lg"
                        onChange={() => {
                            setOneTodo((prev) => toggleOneTodo(prev, 'urgent'));
                        }}
                    />
                </Box>
                <Box>
                    {'Important: '}
                    <Switch
                        isChecked={oneTodo?.important}
                        colorScheme="teal"
                        size="lg"
                        onChange={() => {
                            setOneTodo((prev) => toggleOneTodo(prev, 'important'));
                        }}
                    />
                </Box>
                <IconButton
                    colorScheme="teal"
                    aria-label="Call Segun"
                    size="sm"
                    onClick={() => {
                        setOneTodo((prev) => toggleOneTodo(prev, 'inCanvas'));
                    }}
                    icon={<Icon as={oneTodo?.inCanvas ? BiEraser : GiPencilBrush} />}
                />
            </Flex>
        </Box>
    );
};
export default ListBox;
