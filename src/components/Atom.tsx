import {atom, atomFamily} from 'recoil';
import {ElementStyle, ID, Todo} from '../type';

type TodoIDListType = {ids: ID[]; initTodoState: {[key: string]: Todo}};

const localStorageEffect = (key: string) => ({setSelf, onSet}: any) => {
    const savedValue = localStorage.getItem(key);
    console.log(savedValue);
    if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any) => {
        console.log(newValue);
        // if (newValue) {
        //     localStorage.removeItem(key);
        // } else {
        localStorage.setItem(key, JSON.stringify(newValue));
        // }
    });
};

export const TodoIDListWithInitState = atom<TodoIDListType>({
    key: 'TodoIDList',
    default: {ids: [], initTodoState: {}},
    effects_UNSTABLE: [localStorageEffect(`user_IDList`)],
});

export const oneTodoState = atomFamily<Todo | null, ID>({
    key: 'oneTodoState',
    default: null,
    effects_UNSTABLE: (id) => [localStorageEffect(`user_${id}`)],
});

export const RectangleState = atomFamily<ElementStyle, ID>({
    key: 'RectangleState',
    default: {position: {top: 100, left: 100}, size: {width: 200, height: 100}},
});
