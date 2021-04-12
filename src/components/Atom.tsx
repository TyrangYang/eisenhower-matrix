import {atom, atomFamily} from 'recoil';
import {ID, Todo} from '../type';

type TodoIDListType = {ids: ID[]; initTodoState: {[key: string]: Todo}};

export const TodoIDListWithInitState = atom<TodoIDListType>({
    key: 'TodoIDList',
    default: {ids: [], initTodoState: {}},
});

export const oneTodoState = atomFamily<Todo | null, ID>({
    key: 'oneTodoState',
    default: null,
});
