import React, {FC, useCallback, useState} from 'react';
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
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {AreaRangeAtom, OneTodoStateAtom, RectangleStateAtom, TodoIDListAtom} from '../Atom';
import {ID, RectangleRangeType, TodoType} from '../../type';
import {useForm} from 'react-hook-form';
import ConfirmDeleteDialog from '../widgets/ConfirmDeleteDialog';

interface Props {
    itemID: ID;
}

const toggleOneTodo = (
    prev: TodoType,
    felid: 'completed' | 'urgent' | 'important' | 'inCanvas' | 'isEditing',
): TodoType => {
    return {...prev, [felid]: !prev[felid]};
};

const removeOneIDInIDList = (list: ID[], id: ID) => {
    return list.filter((eachID) => eachID !== id);
};

const ListBox: FC<Props> = ({itemID}) => {
    const [oneTodo, setOneTodo] = useRecoilState(OneTodoStateAtom(itemID));
    const setIDs = useSetRecoilState(TodoIDListAtom);
    const setRectangle = useSetRecoilState(RectangleStateAtom(itemID));
    const AreaRange = useRecoilValue(AreaRangeAtom);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const {register, handleSubmit} = useForm();

    const onDeleteDialogClose = () => {
        setIsDeleteDialogOpen(false);
    };

    const getAreaInitLocation = useCallback(
        (urgent: boolean, important: boolean) => {
            let range: RectangleRangeType;
            if (urgent && important) range = AreaRange.topLeft;
            else if (urgent && !important) range = AreaRange.bottomLeft;
            else if (!urgent && important) range = AreaRange.topRight;
            else range = AreaRange.bottomRight;

            return {top: range.topMin, left: range.leftMin};
        },
        [AreaRange],
    );

    return (
        <Box h="50px" marginBottom={10}>
            {oneTodo.isEditing ? (
                <Flex justifyContent="space-between" alignItems="center">
                    <form
                        id={`addNewTodo-${oneTodo?.id}`}
                        onSubmit={handleSubmit((data) => {
                            setOneTodo((prev) => ({...prev, title: data.newTitleName, isEditing: false}));
                        })}>
                        <Input
                            placeholder="Type a title"
                            autoFocus
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
                                onClick={() => {
                                    // click close just after initialization
                                    if (oneTodo.title === '') setIDs((prev) => removeOneIDInIDList(prev, itemID));
                                    // click close when canceling edition
                                    else setOneTodo((prev) => toggleOneTodo(prev, 'isEditing'));
                                }}
                                isRound
                                icon={<Icon as={VscClose} />}
                            />
                        </Flex>
                    </Box>
                </Flex>
            ) : (
                <Flex justifyContent="space-between" alignItems="center">
                    <Checkbox
                        size="lg"
                        isChecked={oneTodo?.completed}
                        onChange={() => {
                            setOneTodo((prev) => toggleOneTodo(prev, 'completed'));
                        }}
                    />
                    <Box
                        w="40%"
                        onDoubleClick={() => {
                            setOneTodo((prev) => toggleOneTodo(prev, 'isEditing'));
                        }}>
                        {oneTodo?.title}
                    </Box>

                    <Flex direction="column" justifyContent="center">
                        <Flex>
                            <p>Urgent: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                            <Switch
                                isChecked={oneTodo?.urgent}
                                colorScheme="teal"
                                size="md"
                                onChange={() => {
                                    setOneTodo((prev) => toggleOneTodo(prev, 'urgent'));
                                    let willUrgent = !oneTodo.urgent;
                                    let initRectPosition = getAreaInitLocation(willUrgent, oneTodo.important);
                                    setRectangle((prev) => ({...prev, position: initRectPosition}));
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
                                    let willImportant = !oneTodo.important;
                                    let initRectPosition = getAreaInitLocation(oneTodo.urgent, willImportant);
                                    setRectangle((prev) => ({...prev, position: initRectPosition}));
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
                        <MenuButton as={IconButton} aria-label="todo-actions" icon={<BiDotsHorizontalRounded />} />
                        <MenuList>
                            <MenuItem
                                onClick={() => {
                                    setIsDeleteDialogOpen(true);
                                }}>
                                Delete
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    setOneTodo((prev) => toggleOneTodo(prev, 'isEditing'));
                                }}>
                                {'Edit Title Name'}
                            </MenuItem>
                        </MenuList>
                    </Menu>

                    <ConfirmDeleteDialog
                        isOpen={isDeleteDialogOpen}
                        onClose={onDeleteDialogClose}
                        onClickConfirm={() => {
                            onDeleteDialogClose();
                            setIDs((prev) => removeOneIDInIDList(prev, itemID));
                        }}
                    />
                </Flex>
            )}
        </Box>
    );
};
export default ListBox;
