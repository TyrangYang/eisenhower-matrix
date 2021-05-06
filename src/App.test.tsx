import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {RecoilRoot} from 'recoil';
import TodoTablePanel from './components/TodoTable/TodoTablePanel';
import userEvent from '@testing-library/user-event';

it('use add btn at button', () => {
    const {getByTestId, getByLabelText, debug} = render(
        <RecoilRoot>
            <TodoTablePanel />
        </RecoilRoot>,
    );
    const list = getByTestId('test-table-list');
    expect(list.childNodes.length).toBe(0);
    const btn = getByLabelText('addNewTodo');
    userEvent.click(btn);
    expect(list.childNodes.length).toBe(1);
});

it('use form to add new todo', async () => {
    const {getByPlaceholderText, getByText, getByTestId, debug} = render(
        <RecoilRoot>
            <TodoTablePanel />
        </RecoilRoot>,
    );
    const input = getByPlaceholderText('ADD New TODO');
    userEvent.type(input, '123');
    const addBtn = getByText('ADD'); // submit form
    const list = getByTestId('test-table-list');
    expect(list.childNodes.length).toBe(0);
    await waitFor(() => userEvent.click(addBtn));
    expect(list.childNodes.length).toBe(1);
});
