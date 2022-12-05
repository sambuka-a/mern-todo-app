import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todosApi = createApi({
    reducerPath: 'todosApi',
    tagTypes: ['Todos'],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/'}),
    endpoints: (build) => ({
        getTodos: build.query({
            query: (q) => `todos/${q}`,
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Todos', id })), 'Todos']
                    : ['Todos'],
            
        }),

        addTodos: build.mutation({
            query: (body) => ({
                url: 'todos',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Todos'],
        }),

        toggleTodos: build.mutation({
            query: ({id, status}) => ({
                url: `todos/${id}`,
                method: 'PATCH',
                body: {completed: !status}, 
            }),
            invalidatesTags: ['Todos'],
        }),

        deleteTodo: build.mutation({
            query: (id) => ({
                url: `todos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todos']
        }),

        deleteMultipleTodos: build.mutation({
            query: () => ({
                url: `todos`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todos']
        }),
    })
});

export const {useGetTodosQuery, useAddTodosMutation, useToggleTodosMutation, useDeleteTodoMutation, useDeleteMultipleTodosMutation} = todosApi;