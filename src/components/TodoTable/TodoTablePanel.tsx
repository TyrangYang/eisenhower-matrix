import React, {FC} from 'react';
import AddTodo from './AddTodo';
import ListTable from './ListTable';

const TodoTablePanel: FC = () => {
    return (
        <div>
            <AddTodo />
            <br></br>
            <ListTable />
        </div>
    );
};
export default TodoTablePanel;
