import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid'



function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  const savetoLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }


  useEffect(() => {
    let todoString = localStorage.getItem('todos')
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])




  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id == id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id != id
    })
    setTodos(newTodos)
    savetoLS()
  }
  const handleDelete = (e, id) => {

    let newTodos = todos.filter(item => {
      return item.id != id
    })
    setTodos(newTodos)
    savetoLS()
  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    savetoLS()
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
    
  }
  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    savetoLS()
  }


  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-slate-800 text-white min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-2xl text-center text-[gold]'>sTask-Manage your task at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='font-bold text-xl text-[gold]'>Add a ToDo</h2>

          <div className="flex">
            <input onChange={handleChange} value={todo} type="text" className='w-full p-3 rounded-lg text-black border-[4px] border-red-950' />
            <button onClick={handleAdd} disabled={todo.length < 3} className='bg-violet-800 hover:bg-violet-950 disabled:bg-violet-700 p-4 mx-2  text-white text-sm font-bold rounded-2xl'>Save</button>
          </div>

        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} name="" id="" />Show Finished
        <hr className='opacity-15 h-1 my-2' />
        <h2 className='text-xl font-bold text-[gold] my-4'>Your ToDos</h2>

        <div className="todos">
          {todos.length == 0 && <div className='text-sm m-5'>No Todos to display</div>}
          {todos.map(item => {
            return (showFinished || item.isCompleted) && <div key={item.id} className="todo flex md:w-1/2 justify-between my-3">

              <div className='flex gap-5'>
                <input onChange={handleCheckbox} type="checkbox" checked={todo.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo} </div>
              </div>
              <div className="butons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white text-sm font-bold rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white text-sm font-bold rounded-md mx-1'><AiFillDelete /></button>
              </div>
            </div>
          })}

        </div>
      </div>
    </>
  )
}

export default App
