import {atom, AtomEffect, atomFamily, DefaultValue} from 'recoil';
import {RectangleStyleType, ID, TodoType, CanvasStateType} from '../type';
import {debounce} from 'lodash';

type TodoIDListType = ID[];

enum localStorageKeyName {
    ID_LIST = 'ID_LIST',
    TODO_ITEM = 'TODO_ITEM',
    RECTANGLE_STATE = 'RECTANGLE_STATE',
}

const localStorageEffect = (key: string): AtomEffect<any> => ({setSelf, onSet}) => {
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

const gc_localStorage: AtomEffect<string[]> = ({onSet}) => {
    onSet((newValue) => {
        if (newValue instanceof DefaultValue) return;

        const storageExistIDs = Object.keys(localStorage)
            .filter((e) => e !== 'ID_LIST')
            .map((e) => e.split('_').pop())
            .reduce((prev, cur) => {
                if (cur !== undefined) return prev.add(cur);
                else return prev;
            }, new Set<string>());

        console.log(storageExistIDs);
        storageExistIDs.forEach((e) => {
            console.log(!newValue.includes(e));
            if (!newValue.includes(e)) {
                console.log('should remove', e);
                localStorage.removeItem(`RECTANGLE_STATE_${e}`);
                localStorage.removeItem(`TODO_ITEM_${e}`);
            }
        });
    });
};

// export const TempNewTodo = atom<Todo>({
//     key: 'tempNewTodo',
//     default: {id: '', title: '', description: '', important: false, inCanvas: false, urgent: false, completed: false},
// });

export const TodoIDListAtom = atom<TodoIDListType>({
    key: 'TodoIDList',
    default: [],
    effects_UNSTABLE: [localStorageEffect(localStorageKeyName.ID_LIST), gc_localStorage],
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
    effects_UNSTABLE: (id) => [localStorageEffect(`${localStorageKeyName.TODO_ITEM}_${id}`)],
});

export const RectangleStateAtom = atomFamily<RectangleStyleType, ID>({
    key: 'RectangleState',
    default: {position: {top: 100, left: 100}, size: {width: 200, height: 100}},
    effects_UNSTABLE: (id) => [localStorageEffect(`${localStorageKeyName.RECTANGLE_STATE}_${id}`)],
});

export const CanvasStateAtom = atom<CanvasStateType>({
    key: 'CanvasState',
    default: {height: 1000, width: 1000},
});

// export const CanvasRectangleState = selectorFamily<RectangleStyleType | null, ID>({
//     key: 'CanvasRectangleState',
//     get: (id) => ({get}) => {
//         const {inCanvas} = get(oneTodoStateAtom(id));
//         if (inCanvas) return get(RectangleStateAtom(id));
//         else return null;
//     },
//     set: (id) => ({set}, newValue) => {
//         if (newValue !== null) set(RectangleStateAtom(id), newValue);
//     },
// });
