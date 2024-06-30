import { useState, useEffect } from 'react'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(false)


  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const toggleFinished = () => {
    setShowFinished(!showFinished)

  }



  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    //add funtionality for handleEdit to imediatly edit the todo and delete the current todo 
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }


  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()

    if (window.confirm('Are you sure you want to delete your todo?')) {
      setTodos(todos.filter((todo) => todo.id !== id));
    } else {
      setTodos(todos.filter((todo) => todo.id === id))
    }
  }


  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }


  const handleCheckBox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }


  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto 100 my-5 p-5 rounded-xl bg-violet-100 min-h-screen md:w-[35%]">
        <h1 className='font-bold text-center text-4xl'>iTask manage your todos at once place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold my-4'>Add a Todo</h2>
          <div className="flex">
            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-2xl px-5 py-1' />
            <button onClick={handleAdd} disabled={todo.length <= 2} className='bg-violet-700 hover:bg-violet-950 disabled:bg-violet-600 p-4 py-2 mx-2 text-sm font-bold rounded-full cursor-pointer text-white'>Save</button>
          </div>
        </div>
        <input onChange={toggleFinished} id='show' type="checkbox" checked={showFinished} className='my-5' />
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        {/* your todo's here */}
        <h2 className='text-2xl font-bold'>Your Todo's</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todo to Display!</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex my-3 justify-between">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckBox} type="checkbox" checked={item.isCompleted} className="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold rounded-md mx-1 text-white'><FaRegEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold rounded-md mx-1 text-white'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
