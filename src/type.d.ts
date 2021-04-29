export type ID = string;
export type TodoType = {
    id: ID;
    title: string;
    description: string;
    completed: boolean;
    urgent: boolean;
    important: boolean;
    inCanvas: boolean;
    isEditing: boolean;
};

export type RectangleStyleType = {
    position: {top: number; left: number};
    size: {width: number; height: number};
};

export type CanvasStateType = {
    height: number;
    width: number;
};

export type RectangleRangeType = {leftMax: number; topMax: number; leftMin: number; topMin: number};
