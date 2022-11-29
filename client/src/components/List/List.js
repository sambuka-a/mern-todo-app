import { useGetTodosQuery, useToggleTodosMutation, useDeleteTodoMutation } from "../../redux/todosApi";
import styles from './List.module.scss'
import { ReactComponent as DelButton } from '../../assets/icon-cross.svg'

const List = ({theme}) => {
    const {data = [], isLoading} = useGetTodosQuery();
    const [toggleTodo] = useToggleTodosMutation();
    const [deleteTodo] = useDeleteTodoMutation();
  
    const handleToggleTodo = async (id, status) => {
        await toggleTodo({id, status}).unwrap();
    } 

    const handleDeleteTodo = async (id) => {
      await deleteTodo(id).unwrap();
    }

  if(isLoading) return <h2>loading</h2>
  console.log(data);
  
  return (
    <div className={(theme === 'light' ? `${styles.card}` : `${styles.card_dark}`)}>
        <div className={styles.container}>
            <ul className={(theme === 'light' ? `${styles.list} ${styles.list_light}` : `${styles.list} ${styles.list_dark}`)}>
                {data.map(i => (
                    <li key = {i._id}>
                        <div className={styles.listLeft}>
                            <span onClick={() => handleToggleTodo(i._id, i.completed)}>
                                <input type='checkbox' id={i._id} checked={i.completed}/>
                            <span></span>
                            </span>
                            {i.text}
                        </div>
                        <div className={styles.listRight}>
                            <DelButton onClick={() => handleDeleteTodo(i._id)}/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        <div>
            Details
        </div>
    </div>
  )
}

export default List