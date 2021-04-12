import {Button, Flex, Input} from '@chakra-ui/react';
import React, {FC} from 'react';
import {v4 as uuidV4} from 'uuid';
import {useForm} from 'react-hook-form';
import {useSetRecoilState} from 'recoil';
import {Todo, TodoIDListWithInitState} from '../Atom';

interface FormDataInterface {
    itemName: string;
}

const AddTodo: FC = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
    } = useForm<FormDataInterface>();

    const setTodoList = useSetRecoilState(TodoIDListWithInitState);
    return (
        <div>
            <form
                onSubmit={handleSubmit((data) => {
                    const newID = uuidV4();
                    const newTodo: Todo = {
                        id: newID,
                        title: data.itemName,
                        description: '',
                        completed: false,
                        important: false,
                        urgent: false,
                        inCanvas: false,
                    };
                    setTodoList((prev) => ({
                        ids: [...prev.ids, newID],
                        initTodoState: {...prev.initTodoState, [newID]: newTodo},
                    }));
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
export default AddTodo;
