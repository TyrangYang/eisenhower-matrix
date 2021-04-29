import {atom, AtomEffect, atomFamily, DefaultValue, selector} from 'recoil';
import {RectangleStyleType, ID, TodoType, CanvasStateType, RectangleRangeType} from '../type';
import {debounce} from 'lodash';

type TodoIDListType = ID[];

enum localStorageKeyName {
    ID_LIST = 'ID_LIST',
    TODO_ITEM = 'TODO_ITEM',
    RECTANGLE_STATE = 'RECTANGLE_STATE',
}

// store atom in local storage
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

const gc_localStorage_effect: AtomEffect<ID[]> = ({onSet}) => {
    onSet((newValue) => {
        if (newValue instanceof DefaultValue) return;

        const storageExistIDs = Object.keys(localStorage)
            .filter((e) => e !== 'ID_LIST')
            .map((e) => e.split('_').pop())
            .reduce((prev, cur) => {
                if (cur !== undefined) return prev.add(cur);
                else return prev;
            }, new Set<string>());

        storageExistIDs.forEach((e) => {
            if (!newValue.includes(e)) {
                localStorage.removeItem(`RECTANGLE_STATE_${e}`);
                localStorage.removeItem(`TODO_ITEM_${e}`);
            }
        });
    });
};

export const TodoIDListAtom = atom<TodoIDListType>({
    key: 'TodoIDList',
    default: [],
    effects_UNSTABLE: [localStorageEffect(localStorageKeyName.ID_LIST), gc_localStorage_effect],
});

export const OneTodoStateAtom = atomFamily<TodoType, ID>({
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
    default: {position: {top: 0, left: 0}, size: {width: 100, height: 50}},
    effects_UNSTABLE: (id) => [localStorageEffect(`${localStorageKeyName.RECTANGLE_STATE}_${id}`)],
});

export const CanvasStateAtom = atom<CanvasStateType>({
    key: 'CanvasState',
    default: {height: 1000, width: 1000},
});

export const AreaRangeAtom = atom<{
    topLeft: RectangleRangeType;
    topRight: RectangleRangeType;
    bottomLeft: RectangleRangeType;
    bottomRight: RectangleRangeType;
}>({
    key: 'AreaRangeAtom',
    default: {
        topLeft: {topMin: 0, leftMin: 0, topMax: 0, leftMax: 0},
        topRight: {topMin: 0, leftMin: 0, topMax: 0, leftMax: 0},
        bottomLeft: {topMin: 0, leftMin: 0, topMax: 0, leftMax: 0},
        bottomRight: {topMin: 0, leftMin: 0, topMax: 0, leftMax: 0},
    },
});

export const sortTodoIDsList = selector<ID[]>({
    key: 'sortTodoIDsList',
    get: ({get}) => {
        const ids = get(TodoIDListAtom);
        const sortTmp = ids.map((id) => get(OneTodoStateAtom(id)));
        sortTmp.sort((a, b) => {
            if (a.completed && !b.completed) return 1;
            else if (!a.completed && b.completed) return -1;
            else return 0;
        });
        return sortTmp.map((e) => e.id);
    },
});
