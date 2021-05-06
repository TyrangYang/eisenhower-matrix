import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {RecoilRoot} from 'recoil';
import TodoTablePanel from './components/TodoTable/TodoTablePanel';
import userEvent from '@testing-library/user-event';

describe('todo table', () => {
    beforeEach(() => {
        render(
            <RecoilRoot>
                <TodoTablePanel />
            </RecoilRoot>,
        );
    });

    it('use form to add new todo', async () => {
        userEvent.type(screen.getByPlaceholderText('ADD New TODO'), 'todo1');
        const list = screen.getByTestId('test-table-list');
        expect(list.childNodes.length).toBe(0);
        expect(screen.queryByText('todo1')).toBeFalsy();
        await waitFor(() => userEvent.click(screen.getByText('ADD'))); // submit form
        expect(list.childNodes.length).toBe(1);
        expect(screen.getByText('todo1')).toBeTruthy();
    });

    it('use add btn at button', async () => {
        userEvent.click(screen.getByLabelText('addNewTodo'));
        expect(screen.queryByText('todo2')).toBeFalsy();
        userEvent.type(screen.getByPlaceholderText('Type a title'), 'todo2');
        await waitFor(() => userEvent.click(screen.getByLabelText('check')));
        expect(screen.getByText('todo2')).toBeTruthy();
    });

    it('edit one title', async () => {
        expect(screen.getByText('todo1')).toBeTruthy();
        userEvent.dblClick(screen.getByText('todo1'));
        userEvent.type(screen.getByPlaceholderText('Type a title'), 'todo3');
        await waitFor(() => userEvent.click(screen.getByLabelText('check')));
        expect(screen.getByText('todo3')).toBeTruthy();
    });
});
