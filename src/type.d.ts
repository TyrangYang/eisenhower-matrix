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
