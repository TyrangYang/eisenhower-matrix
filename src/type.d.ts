export type ID = string;
export type Todo = {
    id: ID;
    title: string;
    description: string;
    completed: boolean;
    urgent: boolean;
    important: boolean;
    inCanvas: boolean;
    isEditing: boolean;
};

export type ElementStyle = {
    position: {top: number; left: number};
    size: {width: number; height: number};
};
