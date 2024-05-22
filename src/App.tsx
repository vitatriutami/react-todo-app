import {
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import Form from "./components/Form";
import Todo from "./components/Todo";
import { useEffect, useState } from "react";
import { db } from "./components/Firebase";

const App = () => {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");

  // CREATE TODO
  const createTodo = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter some task");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      complete: false,
    });
    setInput("");
  };

  // READ TODO
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const todosArr = [];
      QuerySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodo(todosArr);
    });
    return () => unsubscribe;
  }, []);

  // UPDATE TODO

  // DELETE TODO
  const deleteTodo = async (id: string) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className="h-screen w-scree p-4 bg-teal-300">
      <div className="bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          A Dev's Todo List
        </h1>
        <Form createTodo={createTodo} input={input} setInput={setInput} />
        <ul>
          {todo.map((todos, index) => (
            <Todo key={index} todos={todos} deleteTodo={deleteTodo} />
          ))}
        </ul>
        <p className="text-center">
          You have <span className="text-red-500">{todo.length}</span> things to
          complete
        </p>
      </div>
    </div>
  );
};

export default App;
