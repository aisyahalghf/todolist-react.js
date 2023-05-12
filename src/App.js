import CreateTodo from "./component/CreateTodoList.js";
import ShowTodo from "./component/ShowTodo.js";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  let [todo, setTodo] = useState([]);

  const getData = async () => {
    try {
      let getData = await axios.get("http://localhost:5000/todo-list");
      setTodo(getData.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1 className=" text-center text-3xl font-mono mt-3 font-extrabold ">
        Todo List
      </h1>
      <div className=" flex flex-row justify-center gap-[80px] ">
        <CreateTodo getData={getData} />
        <ShowTodo todo={todo} getData={getData} />
      </div>
    </div>
  );
}

export default App;
