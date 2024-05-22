import { QuerySnapshot, collection, onSnapshot, query } from "firebase/firestore";
import Form from "./components/Form";
import Todo from "./components/Todo";
import { useEffect, useState } from "react";
import { db } from "./components/Firebase";

const App = () => {
  const [todo, setTodo] = useState(["code", "code more"])
  
  // CREATE TODO

  // READ TODO
  useEffect(() => {
    const q = query(collection(db, "todos"))
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const todosArr = []
      QuerySnapshot.forEach((doc) => {
        todosArr.push({...doc.data(), id: doc.id})
      })
      setTodo(todosArr)
    })
    return () => unsubscribe
  }, [])

  // UPDATE TODO

  // DELETE TODO
  
  
  return (
    <div className="h-screen w-scree p-4 bg-teal-300">
      <div className="bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4">
        <h1 className="text-3xl font-bold text-center text-gray-800">A Dev's Todo List</h1>
        <Form />
        <ul>
          {todo.map((todos, index) => (
            <Todo key={index} todos={todos}/>
          ))}
        </ul>
        <p className="text-center">You have 2 things to complete</p>
      </div>
    </div>
  );
};

export default App;
