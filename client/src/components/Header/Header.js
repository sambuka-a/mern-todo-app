import { useState, useRef, useEffect } from 'react'
import { useAddTodosMutation } from '../../redux/todosApi'
import styles from './Header.module.scss'
import { ReactComponent as MoonIcon } from '../../assets/icon-moon.svg'
import { ReactComponent as SunIcon } from '../../assets/icon-sun.svg'

const Header = ({theme, themeSwitch}) => {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const inputRef = useRef();

  const [addTodo] = useAddTodosMutation();

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(value) {
      await addTodo({
          text:value,
        }).unwrap();
      setValue('')
      setError(false)
    } else {
      setError(true)
    }
  }

  return (
    <div className={(theme === 'light' ? `${styles.header} ${styles.light}` : `${styles.header} ${styles.dark}`)}>
      <div className={ styles.container}>
        <div className={styles.hero}>
          <div className={styles.logo}>TODO</div>
          <div>
          {theme === 'dark' ? 
              <SunIcon onClick={themeSwitch}/> :
              <MoonIcon onClick={themeSwitch}/>              
            }
          </div>
        </div>
        <div>
          <form className={(theme === 'light' ? `${styles.form} ${styles.form_light}` : `${styles.form} ${styles.form_dark}`)} onSubmit={handleSubmit}>
            <input className={error ? styles.error : ''}
              ref={inputRef}
              onChange={handleChange} 
              value={value} 
              type="text" 
              name="title" 
              placeholder="Please add todo" 
            />
        </form>
        </div>
      </div>
    </div>
  )
}

export default Header