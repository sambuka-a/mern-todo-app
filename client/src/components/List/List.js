import { useState } from "react";
import { useGetTodosQuery, useToggleTodosMutation, useDeleteTodoMutation, useDeleteMultipleTodosMutation } from "../../redux/todosApi";
import { ReactComponent as DelButton } from '../../assets/icon-cross.svg'
import useWindowDimensions from '../../hooks/useWindowDimentions'
import PropagateLoader from "react-spinners/PropagateLoader";

import styles from './List.module.scss'


const List = ({theme}) => {
    const {width} = useWindowDimensions();
    const [filter, setFilter] = useState('all')
    const {data = [], isLoading, isError} = useGetTodosQuery(filter);
    const [toggleTodo] = useToggleTodosMutation();
    const [deleteTodo] = useDeleteTodoMutation();
    const [deleteMultipleTodos] = useDeleteMultipleTodosMutation();

    let pendingTodosLength = data.filter(i => !i.completed).length;

    const handleFilterData = async (param) => {
        setFilter(param)
    }

    const handleToggleTodo = async (id, status) => {
        await toggleTodo({id, status}).unwrap();
    } 

    const handleDeleteTodo = async (id) => {
      await deleteTodo(id).unwrap();
    }

    const handleDeleteCompleted = async () => {
        await deleteMultipleTodos().unwrap();
    }
  
  return (
    <div className={(theme === 'light' ? `${styles.card}` : `${styles.card_dark}`)}>
        {isLoading && (<div className={styles.spinner}>
            <PropagateLoader 
                color="#4d5066"
                size={6}
            />
        </div>)}
        {(!isLoading && !isError) && (
            <div className={styles.container}>
            <ul className={(theme === 'light' ? `${styles.list} ${styles.list_light}` : `${styles.list} ${styles.list_dark}`)}>
                {(!isLoading && !data.length) && <li>Oops. No items here</li>}
                {data.map(i => (
                    <li key = {i._id}>
                        <div className={styles.listLeft}>
                            <span onClick={() => handleToggleTodo(i._id, i.completed)}>
                                <input onChange={() =>{}} type='checkbox' id={i._id} checked={i.completed}/>
                            <span></span>
                            </span>
                            <span className={i.completed && `${styles.checked}`}>{i.text}</span>
                        </div>
                        <div className={styles.listRight}>
                            <DelButton onClick={() => handleDeleteTodo(i._id)}/>
                        </div>
                    </li>
                ))}
                <div className={styles.listControls}>
                    <span>{pendingTodosLength === 1 ? `1 Item left` : `${pendingTodosLength} items left`}</span>
                    <span className={styles.clearList} onClick={() => handleDeleteCompleted()}>Clear Completed</span>
                </div>
            </ul>
            <div className={(theme === 'light' ? `${styles.footer} ${styles.list_light}` : `${styles.footer} ${styles.list_dark}`)}>
                <span className={styles.clearList} onClick={() => handleFilterData('all')}>All</span>
                <span className={styles.clearList} onClick={() => handleFilterData('active')}>Active</span>
                <span className={styles.clearList} onClick={() => handleFilterData('completed')}>Completed</span>
            </div>
            <div>
                width: {width}
            </div>
        </div>
        )} 
        
    </div>
  )
}

export default List