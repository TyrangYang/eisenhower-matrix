export const getBorderColr = (visible: boolean) => {
    return visible ? '#CCC' : 'transparent';
};
export const gc_localStorage = (id: string) => {
    console.log(`RECTANGLE_STATE_${id}`);
    console.log(`TODO_ITEM_${id}`);
    console.log(localStorage.getItem('ID_LIST')?.includes(id));

    localStorage.removeItem(`RECTANGLE_STATE_${id}`);
    localStorage.removeItem(`TODO_ITEM_${id}`);
};
