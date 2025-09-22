// The parent component
// Import React tools ("hooks") that let our component do more than just render HTML
import { useState, useRef, useEffect } from 'react' 

// Bring in the CSS that styles the main Todo component
import './CSS/Todo.css'

// Import the child component that will render each todo item in the list
import TodoItems from './TodoItems'

// A simple counter to give each todo a unique number ID
// (not perfect, but it works for now instead of generating random IDs)
let count = 0

// Main "Todo" component that holds the entire app
export const Todo = () => {
  // useState creates a piece of "state" (memory inside React).
  // Here, "todos" is our list of todos (array), and "setTodos" is the function
  // we use whenever we want to change that list.
  const [todos, setTodos] = useState([])

  // useRef gives us a way to directly "point" to the input box in the DOM : (ReactJS Virtual DOM is an in-memory representation of the actual DOM (Document Object Model))
  // so we can read its value and clear it later.
  const inputRef = useRef(null)

  // Function that runs when user clicks the ADD button
  const add = () => {
    // Create a new todo object and add it to the array of todos
    // 1. Spread operator (...) copies everything already in "todos"
    // 2. We then append a new object with:
    //    - no: unique number (count, then increment count)
    //    - text: whatever is currently typed in the input box
    //    - display: empty string means "not completed yet"
    setTodos([
      ...todos, 
      { no: count++, text: inputRef.current.value, display: "" }
    ])

    // Clear the input box after adding
    inputRef.current.value = "";

    // Save the new count in localStorage, so when the page reloads,
    // the IDs don’t reset back to 0.
    localStorage.setItem("todos_count", count);
  }

  // useEffect with [] means: run once when the component first loads
  useEffect(() => {
    // Check localStorage for any saved todos
    const saved = JSON.parse(localStorage.getItem("todos"));

    // If we actually find saved todos, restore them into state
    if (saved) setTodos(saved);

    // Also restore the counter value from localStorage
    // (so new todos get unique IDs after a refresh)
    count = parseInt(localStorage.getItem("todos_count")) || 0;
  }, [])

  // Another useEffect: runs EVERY time the "todos" state changes
  useEffect(() => {
    // Log the current todos to the console (if needed for debugging)
    console.log(todos);

    // Save the updated todos array to localStorage so it persists
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // This is the JSX (UI layout) that React will render
  return (
    <div className='todo'>
      <div className="todo-header">.⟡ ݁₊ ⊹ . ݁˖ . ݁ To Do List. ݁₊ ⊹ . ݁˖ ⟡. ݁ </div>

      {/* The section where we add a new todo */}
      <div className="todo-add">
        <input
          ref={inputRef}  // links the input box to inputRef so we can access its value
          type="text"
          placeholder='⊹ . ݁˖. ݁ Type in Your Task Here. ݁₊ ⊹'
          className='todo-input'
        />
        {/* ADD button — calls the add() function when clicked */}
        <div onClick={add} className="todo-add-btn">ADD</div>
      </div>

      {/* The list of todos will be shown here */}
      <div className="todo-list">
        {todos.map(item => (
          // For every item in the "todos" array, render a TodoItems component
          <TodoItems
            key={item.no}       // React uses this to keep track of list items
            no={item.no}        // Pass the unique ID
            display={item.display} // Whether the todo is crossed out
            text={item.text}    // The text of the todo
            setTodos={setTodos} // Pass the parent’s setTodos function so the child can update the list
          />
        ))}
      </div>
    </div>
  )
}
