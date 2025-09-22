// The Child component
// Import the CSS that styles each todo item
import './CSS/TodoItems.css' 

// Import the images for the different todo states
import tick from './assets/tick.png'    // Shown when task is complete
import cross from './assets/cross.png' // Shown as delete button
import none from './assets/none.png'   // Shown when task is not complete

// Child component, responsible for rendering one todo item
// Props, data/functions passed from parent (Todo.jsx)
const TodoItems = ({no, display, text, setTodos}) => {
  // Function to delete a todo by its number
  const deleteTodo = (no) => {
    // Loads the current list from the localStorage
    let data = JSON.parse(localStorage.getItem("todos"));

    // Removes the todo with the matching number (keeps the rest)
    data = data.filter((todo) => todo.no !== no)

    // Updates parent state with this new list
    setTodos(data);
  }

  // Function to toggle whether a todo is completed or not
  const toggle = (no) => {
    // Loads todos from localStorage
    let data = JSON.parse(localStorage.getItem("todos"));

    // Finds the todo with the matching number
    for (let i = 0; i < data.length; i++) {
      if (data[i].no === no) {
        // If the display is empty, marks it completed (with a line-through)
        if (data[i].display === '') {
          data[i].display = "line-through";  
        } 
        // Otherwise, unmarks it
        else {
          data[i].display = "";  
        }
        break;
      }
    }

    // Updates the state with the modified list
    setTodos(data);
  }

  // JSX for displaying a single todo item
  return (
    <div className='todoitems'>
      {/* This div shows the checkbox-like area. Clicking it toggles completion */}
      <div 
        className={`todoitems-container ${display}`} 
        onClick={() => toggle(no)}
      >
        {/* Chooses which icon to display depending on its state (completed or not) */}
        {display === "" 
          ? <img src={none} alt="" />  // not completed
          : <img src={tick} alt="" />  // completed
        }
        
        {/* Shows the actual text of the todo */}
        <div className="todoitems-text">{text}</div>
      </div>

      {/* The delete (cross) button */}
      <img 
        className='todoitems-cross-icon' 
        onClick={() => deleteTodo(no)} 
        src={cross} 
        alt=""
      />
    </div>
  )
}

// Makes sure this component can be imported elsewhere
export default TodoItems
