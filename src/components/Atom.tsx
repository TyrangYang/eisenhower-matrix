import {atom, atomFamily} from 'recoil';

export type ID = string;
export type Todo = {
    id: ID;
    title: string;
    description: string;
    completed: boolean;
    urgent: boolean;
    important: boolean;
    inCanvas: boolean;
};

export const TodoIDListWithInitState = atom<{ids: ID[]; initTodoState: {[key: string]: Todo}}>({
    key: 'TodoIDList',
    default: {ids: [], initTodoState: {}},
});

export const oneTodoState = atomFamily<Todo | null, ID>({
    key: 'oneTodoState',
    default: null,
});
