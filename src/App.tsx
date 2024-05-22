import {
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import Form from "./components/Form";
import Todo from "./components/Todo";
import { FormEventHandler, useEffect, useState } from "react";
import { db } from "./components/Firebase";

interface TodoType {
  text?: string;
  completed?: boolean;
  id: string;
}

const App = () => {
  const [todo, setTodo] = useState<TodoType[]>([]);
  const [input, setInput] = useState("");

  // CREATE TODO
  const createTodo: FormEventHandler<HTMLInputElement> = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Your submit is empty. Please type some task");
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
      const todosArr: TodoType[] = [];
      QuerySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodo(todosArr);
    });
    return () => unsubscribe();
  }, []);

  // UPDATE TODO
  const toggleComplete = async (todo: TodoType) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed
    })
  }

  // DELETE TODO
  const deleteTodo = async (id: string) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className="h-screen w-scree p-4 bg-teal-300 overflow-y-scroll">
      <div className="bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          A Dev's Todo List
        </h1>
        <Form createTodo={createTodo} input={input} setInput={setInput} />
        <ul>
          {todo.map((todos, index) => (
            <Todo key={index} todos={todos} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
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
