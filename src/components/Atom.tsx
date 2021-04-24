import {atom, atomFamily} from 'recoil';
import {RectangleStyleType, ID, TodoType, CanvasStateType} from '../type';
import {debounce} from 'lodash';

type TodoIDListType = ID[];

const localStorageEffect = (key: string) => ({setSelf, onSet}: any) => {
    const savedValue = localStorage.getItem(key);
    // if value in local storage
    if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
    }

    onSet(
        debounce((newValue: any) => {
            localStorage.setItem(key, JSON.stringify(newValue));
        }, 500),
    );
};

// export const TempNewTodo = atom<Todo>({
//     key: 'tempNewTodo',
//     default: {id: '', title: '', description: '', important: false, inCanvas: false, urgent: false, completed: false},
// });

export const TodoIDListAtom = atom<TodoIDListType>({
    key: 'TodoIDList',
    default: [],
    effects_UNSTABLE: [localStorageEffect(`user_IDList`)],
});

export const oneTodoStateAtom = atomFamily<TodoType, ID>({
    key: 'oneTodoState',
    default: (itemID) => ({
        id: itemID,
        title: '',
        description: '',
        completed: false,
        important: false,
        urgent: false,
        inCanvas: false,
        isEditing: true,
    }),
    effects_UNSTABLE: (id) => [localStorageEffect(`user_${id}`)],
});

export const RectangleStateAtom = atomFamily<RectangleStyleType, ID>({
    key: 'RectangleState',
    default: {position: {top: 100, left: 100}, size: {width: 200, height: 100}},
    effects_UNSTABLE: (id) => [localStorageEffect(`rectangle_state_${id}`)],
});

export const CanvasStateAtom = atom<CanvasStateType>({
    key: 'CanvasState',
    default: {height: 1000, width: 1000},
});
