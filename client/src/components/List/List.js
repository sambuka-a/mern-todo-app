import { useState, useEffect } from "react";
import { useGetTodosQuery, useToggleTodosMutation, useDeleteTodoMutation, useDeleteMultipleTodosMutation } from "../../redux/todosApi";
import { ReactComponent as DelButton } from '../../assets/icon-cross.svg'
import PropagateLoader from "react-spinners/PropagateLoader";

import styles from './List.module.scss'


const List = ({theme}) => {
    const [todoData, setTodoData] = useState([])
    const {data = [], isLoading, isError} = useGetTodosQuery();
    const [toggleTodo, {isLoading: isUpdating}] = useToggleTodosMutation();
    const [deleteTodo, {isLoading: isDeleting}] = useDeleteTodoMutation();
    const [deleteMultipleTodos, {isLoading: isDeletingMultiple}] = useDeleteMultipleTodosMutation();

    useEffect(() => {
        if(data) {
            setTodoData(data)
        }
    }, [data]) 

    let pendingTodosLength = data.filter(i => !i.completed).length;

    const handleToggleTodo = async (id, status) => {
        await toggleTodo({id, status}).unwrap();
    } 

    const handleDeleteTodo = async (id) => {
      await deleteTodo(id).unwrap();
    }

    const handleDeleteCompleted = async () => {
        await deleteMultipleTodos().unwrap();
    }

    const handleFilter = (param) => {
        
        switch (param) {
            case 'all' :
                return setTodoData(data);
            case 'active' :
                return setTodoData(data.filter(i => !i.completed))
            case 'completed' :
                return setTodoData(data.filter(i => i.completed))
            default:
                return setTodoData(data)
        }
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
                {todoData.map(i => (
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
                    <div>
                        <span>{pendingTodosLength === 1 ? `1 Item left` : `${pendingTodosLength} items left`}</span>
                    </div>
                    <div className={(theme === 'light' ? `${styles.controls} ${styles.list_light}` : `${styles.controls} ${styles.list_dark}`)}>
                        <span className={styles.clearList} onClick={() => handleFilter('all')}>All</span>
                        <span className={styles.clearList} onClick={() => handleFilter('active')}>Active</span>
                        <span className={styles.clearList} onClick={() => handleFilter('completed')}>Completed</span>
                    </div>
                    <div>
                        <span className={styles.clearList} onClick={() => handleDeleteCompleted()}>Clear Completed</span>
                    </div>
                </div>
            </ul>
            <div className={(theme === 'light' ? `${styles.footer} ${styles.list_light}` : `${styles.footer} ${styles.list_dark}`)}>
                <span className={styles.clearList} onClick={() => handleFilter('all')}>All</span>
                <span className={styles.clearList} onClick={() => handleFilter('active')}>Active</span>
                <span className={styles.clearList} onClick={() => handleFilter('completed')}>Completed</span>
            </div>
            {(isUpdating || isDeleting || isDeletingMultiple) && (<div className={styles.spinner}>
            <PropagateLoader 
                color="#4d5066"
                size={6}
            />
            </div>)}
        </div>
        )}
    </div>
  )
}

export default List