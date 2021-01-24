import React, { useEffect, useReducer } from 'react';
import useForm from '../hooks/useForm';
import ReducerComponent from './ReducerComponent';

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

const TodoApp = () => {

    const [todos, dispatch] = useReducer(ReducerComponent, [], init);
    const [state, handleInputChange, handleReset] = useForm({
        todo: ''
    });
    const { todo } = state;

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);


    // Agregar nuevo todo
    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(todo);
        if (todo.trim().length < 1) {
            return alert('Escribe algo!');
        }

        const newTodo = {
            id: new Date().getTime(),
            todo: todo,
            done: false
        }

        const action = {
            type: 'add',
            payload: newTodo
        }

        dispatch(action);
        handleReset();
    }

    // Borrar todo
    const handleOnDelete = (id) => {
        //console.log(id);
        const action = {
            type: 'delete',
            payload: id
        }

        dispatch(action);
    }

    // Cambiar Estado
    const handleOnToggle = (id) => {
        //console.log(id);
        const action = {
            type: 'toggle',
            payload: id
        }

        dispatch(action);
    }

    return (
        <div>
            <h1>TodoApp</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='todo'
                    autoComplete='off'
                    value={todo}
                    placeholder='Escribe algo..'
                    onChange={handleInputChange}
                />
                <button type='submit'>
                    Agregar
                </button>
            </form>
            <div className='table-center'>
                <table>
                    <thead>
                        <tr>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map((todo) => {
                                return (
                                    <tr key={todo.id}>
                                        {
                                            todo.done
                                                ? <td onClick={() => handleOnToggle(todo.id)} className='realizado'>Realizado</td>
                                                : <td onClick={() => handleOnToggle(todo.id)} className='pendiente'>Pendiente</td>
                                        }
                                        <td>{todo.todo}</td>
                                        <td onClick={() => handleOnDelete(todo.id)} className='borrar'>Borrar</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TodoApp;