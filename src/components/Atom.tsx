import {atom, atomFamily} from 'recoil';
import {ElementStyle, ID, Todo} from '../type';

type TodoIDListType = ID[];

const localStorageEffect = (key: string) => ({setSelf, onSet}: any) => {
    const savedValue = localStorage.getItem(key);
    // if value in local storage
    if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any) => {
        localStorage.setItem(key, JSON.stringify(newValue));
    });
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

export const oneTodoStateAtom = atomFamily<Todo, ID>({
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

export const RectangleStateAtom = atomFamily<ElementStyle, ID>({
    key: 'RectangleState',
    default: {position: {top: 100, left: 100}, size: {width: 200, height: 100}},
    effects_UNSTABLE: (id) => [localStorageEffect(`rectangle_state_${id}`)],
});
