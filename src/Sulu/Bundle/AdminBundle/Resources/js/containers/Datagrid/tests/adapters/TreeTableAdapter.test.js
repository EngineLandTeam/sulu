// @flow
import React from 'react';
import {mount, render, shallow} from 'enzyme';
import TreeTableAdapter from '../../adapters/TreeTableAdapter';

jest.mock('../../../../utils/Translator', () => ({
    translate: function(key) {
        switch (key) {
            case 'sulu_admin.page':
                return 'Page';
            case 'sulu_admin.of':
                return 'of';
        }
    },
}));

jest.mock('../../registries/DatagridFieldTransformerRegistry', () => ({
    add: jest.fn(),
    get: jest.fn(() => {
        return {
            transform(value) {
                return value;
            },
        };
    }),
    has: jest.fn(),
}));

test('Render data with schema', () => {
    const test1 = {
        data: {
            id: 2,
            title: 'Test1',
        },
        children: [],
        hasChildren: false,
    };
    const test2 = {
        data: {
            id: 3,
            title: 'Test2',
        },
        children: [],
        hasChildren: true,
    };
    const test3 = {
        data: {
            id: 6,
            title: 'Test3',
        },
        children: [],
        hasChildren: true,
    };

    const data = [
        test1,
        test2,
        test3,
    ];
    const schema = {
        title: {
            label: 'Title',
            sortable: true,
            type: 'string',
            visibility: 'yes',
        },
    };
    const treeListAdapter = render(
        <TreeTableAdapter
            active={undefined}
            activeItems={[]}
            data={data}
            disabledIds={[]}
            loading={false}
            schema={schema}
            selections={[]}
            onAllSelectionChange={undefined}
            onItemActivate={jest.fn()}
            onItemAdd={undefined}
            onItemClick={undefined}
            onItemDeactivate={jest.fn()}
            onItemSelectionChange={undefined}
            onPageChange={jest.fn()}
            onRequestItemCopy={undefined}
            onRequestItemDelete={jest.fn()}
            onRequestItemMove={undefined}
            onRequestItemOrder={undefined}
            page={1}
            pageCount={2}
            onSort={jest.fn()}
            options={{}}
            sortColumn={undefined}
            sortOrder={undefined}
        />
    );

    expect(treeListAdapter).toMatchSnapshot();
});

test('Render data without header', () => {
    const test1 = {
        data: {
            id: 2,
            title: 'Test1',
        },
        children: [],
        hasChildren: false,
    };
    const test2 = {
        data: {
            id: 3,
            title: 'Test2',
        },
        children: [],
        hasChildren: true,
    };
    const test3 = {
        data: {
            id: 6,
            title: 'Test3',
        },
        children: [],
        hasChildren: true,
    };

    const data = [
        test1,
        test2,
        test3,
    ];
    const schema = {
        title: {
            label: 'Title',
            sortable: true,
            type: 'string',
            visibility: 'yes',
        },
    };
    const treeListAdapter = render(
        <TreeTableAdapter
            active={undefined}
            activeItems={[]}
            data={data}
            disabledIds={[]}
            loading={false}
            schema={schema}
            selections={[]}
            onAllSelectionChange={undefined}
            onItemActivate={jest.fn()}
            onItemAdd={undefined}
            onItemClick={undefined}
            onItemDeactivate={jest.fn()}
            onItemSelectionChange={undefined}
            onPageChange={jest.fn()}
            onRequestItemCopy={undefined}
            onRequestItemDelete={jest.fn()}
            onRequestItemMove={undefined}
            onRequestItemOrder={undefined}
            page={1}
            pageCount={2}
            onSort={jest.fn()}
            options={{showHeader: false}}
            sortColumn={undefined}
            sortOrder={undefined}
        />
    );

    expect(treeListAdapter).toMatchSnapshot();
});

test('Attach onClick handler for sorting if schema says the header is sortable', () => {
    const sortSpy = jest.fn();

    const schema = {
        title: {
            type: 'string',
            sortable: true,
            visibility: 'yes',
            label: 'Title',
        },
        description: {
            type: 'string',
            sortable: false,
            visibility: 'yes',
            label: 'Description',
        },
    };

    const treeTableAdapter = shallow(
        <TreeTableAdapter
            active={undefined}
            activeItems={[]}
            data={[]}
            disabledIds={[]}
            loading={false}
            page={2}
            pageCount={5}
            onAllSelectionChange={undefined}
            onItemActivate={jest.fn()}
            onItemAdd={undefined}
            onItemClick={undefined}
            onItemDeactivate={jest.fn()}
            onItemSelectionChange={undefined}
            onPageChange={jest.fn()}
            onRequestItemCopy={undefined}
            onRequestItemDelete={jest.fn()}
            onRequestItemMove={undefined}
            onRequestItemOrder={undefined}
            onSort={sortSpy}
            options={{}}
            schema={schema}
            selections={[]}
            sortColumn={undefined}
            sortOrder={undefined}
        />
    );

    expect(treeTableAdapter.find('HeaderCell').at(0).prop('onClick')).toBe(sortSpy);
    expect(treeTableAdapter.find('HeaderCell').at(1).prop('onClick')).toEqual(undefined);
});

test('Render data with two columns', () => {
    const test1 = {
        data: {
            id: 2,
            title: 'Test1',
            title2: 'Title2 - Test1',
        },
        children: [],
        hasChildren: false,
    };
    const test2 = {
        data: {
            id: 3,
            title: 'Test2',
            title2: 'Title2 - Test2',
        },
        children: [],
        hasChildren: true,
    };
    const test3 = {
        data: {
            id: 6,
            title: 'Test3',
            title2: 'Title2 - Test3',
        },
        children: [],
        hasChildren: true,
    };

    const data = [
        test1,
        test2,
        test3,
    ];
    const schema = {
        title: {
            type: 'string',
            sortable: true,
            visibility: 'yes',
            label: 'Title',
        },
        title2: {
            type: 'string',
            sortable: true,
            visibility: 'yes',
            label: 'Title2',
        },
    };
    const treeListAdapter = render(
        <TreeTableAdapter
            active={undefined}
            activeItems={[]}
            data={data}
            disabledIds={[]}
            loading={false}
            schema={schema}
            selections={[]}
            onAllSelectionChange={undefined}
            onItemActivate={jest.fn()}
            onItemAdd={undefined}
            onItemClick={undefined}
            onItemDeactivate={jest.fn()}
            onItemSelectionChange={undefined}
            onPageChange={jest.fn()}
            onRequestItemCopy={undefined}
            onRequestItemDelete={jest.fn()}
            onRequestItemMove={undefined}
            onRequestItemOrder={undefined}
            options={{}}
            page={1}
            pageCount={2}
            onSort={jest.fn()}
            sortColumn={undefined}
            sortOrder={undefined}
        />
    );

    expect(treeListAdapter).toMatchSnapshot();
});

test('Render data with schema and selections', () => {
    const test1 = {
        data: {
            id: 2,
            title: 'Test1',
        },
        children: [],
        hasChildren: false,
    };
    const test2 = {
        data: {
            id: 3,
            title: 'Test2',
        },
        children: [],
        hasChildren: true,
    };
    const test3 = {
        data: {
            id: 6,
            title: 'Test3',
        },
        children: [],
        hasChildren: true,
    };

    const data = [
        test1,
        test2,
        test3,
    ];
    const schema = {
        title: {
            type: 'string',
            sortable: true,
            visibility: 'yes',
            label: 'Title',
        },
    };
    const treeListAdapter = render(
        <TreeTableAdapter
            active={undefined}
            activeItems={[]}
            data={data}
            disabledIds={[]}
            loading={false}
            schema={schema}
            selections={[1, 3]}
            onAllSelectionChange={undefined}
            onItemActivate={jest.fn()}
            onItemAdd={undefined}
            onItemClick={undefined}
            onItemDeactivate={jest.fn()}
            onItemSelectionChange={undefined}
            onPageChange={jest.fn()}
            onRequestItemCopy={undefined}
            onRequestItemDelete={jest.fn()}
            onRequestItemMove={undefined}
            onRequestItemOrder={undefined}
            options={{}}
            page={1}
            pageCount={2}
            onSort={jest.fn()}
            sortColumn={undefined}
            sortOrder={undefined}
        />
    );

    expect(treeListAdapter).toMatchSnapshot();
});

test('Execute onItemActivate respectively onItemDeactivate callback when an item is clicked', () => {
    const test1 = {
        data: {
            id: 2,
            title: 'Test1',
        },
        children: [],
        hasChildren: false,
    };
    const test21 = {
        data: {
            id: 4,
            title: 'Test2.1',
        },
        children: [],
        hasChildren: false,
    };
    const test22 = {
        data: {
            id: 5,
            title: 'Test2.2',
        },
        children: [],
        hasChildren: false,
    };
    const test2 = {
        data: {
            id: 3,
            title: 'Test2',
        },
        children: [
            test21,
            test22,
        ],
        hasChildren: true,
    };
    const test3 = {
        data: {
            id: 6,
            title: 'Test3',
        },
        children: [],
        hasChildren: true,
    };

    const data = [
        test1,
        test2,
        test3,
    ];
    const schema = {
        title: {
            type: 'string',
            sortable: true,
            visibility: 'yes',
            label: 'Title',
        },
    };

    const onItemActivateSpy = jest.fn();
    const onItemDeactivateSpy = jest.fn();

    const treeListAdapter = mount(
        <TreeTableAdapter
            active={undefined}
            activeItems={[]}
            data={data}
            disabledIds={[]}
            loading={false}
            onAllSelectionChange={undefined}
            onItemActivate={onItemActivateSpy}
            onItemAdd={undefined}
            onItemClick={undefined}
            onItemDeactivate={onItemDeactivateSpy}
            onItemSelectionChange={undefined}
            onPageChange={jest.fn()}
            onRequestItemCopy={undefined}
            onRequestItemDelete={jest.fn()}
            onRequestItemMove={undefined}
            onRequestItemOrder={undefined}
            onSort={jest.fn()}
            page={1}
            pageCount={1}
            options={{}}
            schema={schema}
            selections={[]}
            sortColumn={undefined}
            sortOrder={undefined}
        />
    );

    // expand the row
    treeListAdapter.find('Row[id=6]').find('span.toggleIcon Icon').simulate('click');
    expect(onItemActivateSpy).toBeCalledWith(6);

    // close the row
    treeListAdapter.find('Row[id=3]').find('span.toggleIcon Icon').simulate('click');
    expect(onItemDeactivateSpy).toBeCalledWith(3);
});

test('Render data with pencil button when onItemEdit callback is passed', () => {
    const rowEditClickSpy = jest.fn();
    const test1 = {
        data: {
            id: 2,
            title: 'Test1',
        },
        children: [],
        hasChildren: false,
    };
    const data = [
        test1,
    ];
    const schema = {
        title: {
            label: 'Title',
            sortable: true,
            type: 'string',
            visibility: 'no',
        },
        description: {
            label: 'Description',
            sortable: true,
            type: 'string',
            visibility: 'yes',
        },
    };
    const treeListAdapter = render(
        <TreeTableAdapter
            active={undefined}
            activeItems={[]}
            data={data}
            disabledIds={[]}
            loading={false}
            onAllSelectionChange={undefined}
            onItemActivate={jest.fn()}
            onItemAdd={undefined}
            onItemClick={rowEditClickSpy}
            onItemDeactivate={jest.fn()}
            onItemSelectionChange={undefined}
            onPageChange={jest.fn()}
            onRequestItemCopy={undefined}
            onRequestItemDelete={jest.fn()}
            onRequestItemMove={undefined}
            onRequestItemOrder={undefined}
            onSort={jest.fn()}
            page={1}
            pageCount={1}
            options={{}}
            schema={schema}
            selections={[]}
            sortColumn={undefined}
            sortOrder={undefined}
        />
    );

    expect(treeListAdapter).toMatchSnapshot();
});

test('Render data with plus button when onItemAdd callback is passed', () => {
    const rowAddClickSpy = jest.fn();
    const test1 = {
        data: {
            id: 2,
            title: 'Test1',
        },
        children: [],
        hasChildren: false,
    };
    const data = [
        test1,
    ];
    const schema = {
        title: {
            label: 'Title',
            sortable: true,
            type: 'string',
            visibility: 'no',
        },
        description: {
            label: 'Description',
            sortable: true,
            type: 'string',
            visibility: 'yes',
        },
    };
    const treeListAdapter = render(
        <TreeTableAdapter
            active={undefined}
            activeItems={[]}
            data={data}
            disabledIds={[]}
            loading={false}
            onAllSelectionChange={undefined}
            onItemActivate={jest.fn()}
            onItemAdd={rowAddClickSpy}
            onItemClick={undefined}
            onItemDeactivate={jest.fn()}
            onItemSelectionChange={undefined}
            onPageChange={jest.fn()}
            onRequestItemCopy={undefined}
            onRequestItemDelete={jest.fn()}
            onRequestItemMove={undefined}
            onRequestItemOrder={undefined}
            onSort={jest.fn()}
            page={1}
            pageCount={1}
            options={{}}
            schema={schema}
            selections={[]}
            sortColumn={undefined}
            sortOrder={undefined}
        />
    );

    expect(treeListAdapter).toMatchSnapshot();
});

test('Click on pencil should execute onItemClick callback', () => {
    const rowEditClickSpy = jest.fn();
    const test1 = {
        data: {
            id: 2,
            title: 'Test1',
        },
        children: [],
        hasChildren: false,
    };
    const data = [
        test1,
    ];
    const schema = {
        title: {
            label: 'Title',
            sortable: true,
            type: 'string',
            visibility: 'no',
        },
        description: {
            label: 'Description',
            sortable: true,
            type: 'string',
            visibility: 'yes',
        },
    };
    const treeListAdapter = shallow(
        <TreeTableAdapter
            active={undefined}
            activeItems={[]}
            data={data}
            disabledIds={[]}
            loading={false}
            onAllSelectionChange={undefined}
            onItemActivate={jest.fn()}
            onItemAdd={undefined}
            onItemClick={rowEditClickSpy}
            onItemDeactivate={jest.fn()}
            onItemSelectionChange={undefined}
            onPageChange={jest.fn()}
            onRequestItemCopy={undefined}
            onRequestItemDelete={jest.fn()}
            onRequestItemMove={undefined}
            onRequestItemOrder={undefined}
            onSort={jest.fn()}
            page={1}
            pageCount={1}
            options={{}}
            schema={schema}
            selections={[]}
            sortColumn={undefined}
            sortOrder={undefined}
        />
    );
    const buttons = treeListAdapter.find('Table').prop('buttons');
    expect(buttons).toHaveLength(1);
    expect(buttons[0].icon).toBe('su-pen');

    buttons[0].onClick(1);
    expect(rowEditClickSpy).toBeCalledWith(1);
});

test('Click on add should execute onItemAdd callback', () => {
    const test1 = {
        data: {
            id: 2,
            title: 'Test1',
        },
        children: [],
        hasChildren: false,
    };
    const data = [
        test1,
    ];
    const schema = {
        title: {
            label: 'Title',
            sortable: true,
            type: 'string',
            visibility: 'no',
        },
        description: {
            label: 'Description',
            sortable: true,
            type: 'string',
            visibility: 'yes',
        },
    };
    const rowAddClickSpy = jest.fn();
    const treeListAdapter = shallow(
        <TreeTableAdapter
            active={undefined}
            activeItems={[]}
            data={data}
            disabledIds={[]}
            loading={false}
            onAllSelectionChange={undefined}
            onItemActivate={jest.fn()}
            onItemAdd={rowAddClickSpy}
            onItemClick={undefined}
            onItemDeactivate={jest.fn()}
            onItemSelectionChange={undefined}
            onPageChange={jest.fn()}
            onRequestItemCopy={undefined}
            onRequestItemDelete={jest.fn()}
            onRequestItemMove={undefined}
            onRequestItemOrder={undefined}
            onSort={jest.fn()}
            page={1}
            pageCount={1}
            options={{}}
            schema={schema}
            selections={[]}
            sortColumn={undefined}
            sortOrder={undefined}
        />
    );
    const buttons = treeListAdapter.find('Table').prop('buttons');
    expect(buttons).toHaveLength(1);
    expect(buttons[0].icon).toBe('su-plus-circle');

    buttons[0].onClick(1);
    expect(rowAddClickSpy).toBeCalledWith(1);
});
