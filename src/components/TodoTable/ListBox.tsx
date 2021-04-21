import React, {FC, useState} from 'react';
import {
    Box,
    Checkbox,
    Flex,
    Icon,
    IconButton,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Switch,
} from '@chakra-ui/react';
import {GiPencilBrush} from 'react-icons/gi';
import {VscCheck, VscClose} from 'react-icons/vsc';
import {BiEraser, BiDotsHorizontalRounded} from 'react-icons/bi';
import {useRecoilState, useResetRecoilState, useSetRecoilState} from 'recoil';
import {oneTodoStateAtom, TodoIDListAtom} from '../Atom';
import {ID, Todo} from '../../type';
import {useForm} from 'react-hook-form';
import ConfirmDeleteDialog from '../utils/ConfirmDeleteDialog';

interface Props {
    itemID: ID;
}

const toggleOneTodo = (prev: Todo, felid: 'completed' | 'urgent' | 'important' | 'inCanvas'): Todo => {
    return {...prev, [felid]: !prev[felid]};
};

const ListBox: FC<Props> = ({itemID}) => {
    const [oneTodo, setOneTodo] = useRecoilState(oneTodoStateAtom(itemID));
    const resetOneTodo = useResetRecoilState(oneTodoStateAtom(itemID));
    const setIDs = useSetRecoilState(TodoIDListAtom);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const {register, handleSubmit} = useForm();

    const onDeleteDialogClose = () => {
        setIsDeleteDialogOpen(false);
    };

    return (
        <Box h="40px">
            {oneTodo.isEditing ? (
                <Flex justifyContent="space-evenly" alignItems="center">
                    <form
                        id={`addNewTodo-${oneTodo?.id}`}
                        onSubmit={handleSubmit((data) => {
                            setOneTodo((prev) => ({...prev, title: data.newTitleName, isEditing: false}));
                        })}>
                        <Input
                            placeholder="Type a title"
                            {...register('newTitleName', {
                                required: true,
                                maxLength: '30',
                            })}
                        />
                    </form>
                    <Box w="30%">
                        <Flex justifyContent="space-around">
                            <IconButton
                                aria-label="check"
                                colorScheme="teal"
                                type="submit"
                                form={`addNewTodo-${oneTodo?.id}`}
                                isRound
                                icon={<Icon as={VscCheck} />}
                            />
                            <IconButton
                                aria-label="close"
                                colorScheme="red"
                                onClick={() => setIDs((prev) => prev.filter((id) => id !== itemID))}
                                isRound
                                icon={<Icon as={VscClose} />}
                            />
                        </Flex>
                    </Box>
                </Flex>
            ) : (
                <Flex justifyContent="space-between" alignItems="center">
                    <Box w="40%">{oneTodo?.title}</Box>

                    {/* <Checkbox
                        size="lg"
                        isChecked={oneTodo?.completed}
                        onChange={() => {
                            setOneTodo((prev) => toggleOneTodo(prev, 'completed'));
                        }}
                    /> */}
                    <Flex direction="column" justifyContent="center">
                        <Flex>
                            <p>Urgent: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                            <Switch
                                isChecked={oneTodo?.urgent}
                                colorScheme="teal"
                                size="md"
                                onChange={() => {
                                    setOneTodo((prev) => toggleOneTodo(prev, 'urgent'));
                                }}
                            />
                        </Flex>
                        <Flex>
                            <p>Important: &nbsp; </p>
                            <Switch
                                isChecked={oneTodo?.important}
                                colorScheme="teal"
                                size="md"
                                onChange={() => {
                                    setOneTodo((prev) => toggleOneTodo(prev, 'important'));
                                }}
                            />
                        </Flex>
                    </Flex>
                    <IconButton
                        colorScheme="teal"
                        aria-label="add-new-todo-form-submit"
                        size="md"
                        isRound
                        onClick={() => {
                            setOneTodo((prev) => toggleOneTodo(prev, 'inCanvas'));
                        }}
                        icon={<Icon as={oneTodo?.inCanvas ? BiEraser : GiPencilBrush} />}
                    />

                    <Menu>
                        <MenuButton>
                            <IconButton
                                backgroundColor="whitesmoke"
                                aria-label="remove-new-todo-form-submit"
                                size="md"
                                isRound
                                icon={<Icon as={BiDotsHorizontalRounded} />}
                            />
                        </MenuButton>
                        <MenuList>
                            <MenuItem
                                onClick={() => {
                                    setIsDeleteDialogOpen(true);
                                }}>
                                Delete
                            </MenuItem>
                        </MenuList>
                    </Menu>

                    <ConfirmDeleteDialog
                        isOpen={isDeleteDialogOpen}
                        onClose={onDeleteDialogClose}
                        onClickConfirm={() => {
                            onDeleteDialogClose();
                            setIDs((prev) => prev.filter((id) => id !== itemID));
                            resetOneTodo();
                        }}
                    />
                </Flex>
            )}
        </Box>
    );
};
export default ListBox;
