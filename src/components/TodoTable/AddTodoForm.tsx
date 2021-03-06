import {Button, Flex, Input} from '@chakra-ui/react';
import React, {FC} from 'react';
import {v4 as uuidV4} from 'uuid';
import {useForm} from 'react-hook-form';
import {useRecoilCallback} from 'recoil';
import {OneTodoStateAtom, TodoIDListAtom} from '../Atom';
import {ID, TodoType} from '../../type';

interface FormDataInterface {
    itemName: string;
}

const AddTodoForm: FC = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
    } = useForm<FormDataInterface>();

    const createNewTodo = useRecoilCallback(
        ({set}) => (id: ID, newTodo: TodoType) => {
            set(TodoIDListAtom, (prev) => [...prev, id]);
            set(OneTodoStateAtom(id), newTodo);
        },
        [],
    );
    return (
        <div>
            <form
                onSubmit={handleSubmit((data) => {
                    const newID = uuidV4();
                    const newTodo: TodoType = {
                        id: newID,
                        title: data.itemName,
                        description: '',
                        completed: false,
                        important: false,
                        urgent: false,
                        isEditing: false,
                        inCanvas: false,
                    };
                    createNewTodo(newID, newTodo);
                    setValue('itemName', '');
                })}>
                <Flex>
                    <Input
                        variant="flushed"
                        placeholder="ADD New TODO"
                        size="lg"
                        isInvalid={!!errors.itemName}
                        {...register('itemName', {
                            required: true,
                            maxLength: '30',
                        })}
                    />
                    <Button colorScheme="teal" size="lg" type="submit">
                        ADD
                    </Button>
                </Flex>
            </form>
        </div>
    );
};
export default AddTodoForm;
