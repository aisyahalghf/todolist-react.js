import React from "react";
import { useRef, useState } from "react";
import axios from "axios";

const CreateTodo = ({ getData }) => {
  const task = useRef();
  const status = useRef();
  let [message, setMessage] = useState("");

  const handleSubmit = async () => {
    let taskCreateTodo = task.current.value;
    let statusCreateTodo = status.current.value;
    try {
      // validasi

      if (!taskCreateTodo)
        throw {
          message: "Anda belum mengisi Task silahkan isi terlebih dahulu",
        };

      await axios.post(`http://localhost:5000/todo-list/`, {
        Task: taskCreateTodo,
        Status: statusCreateTodo,
      });
      getData();
      setMessage("");
      task.current.value = "";
      status.current.selectedIndex = 0;
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className=" flex flex-col m-10 gap-4 w-[30%] ">
      <h2 className=" text-xl font-bold "> Create Todo List</h2>
      <div className=" flex flex-col gap-2 ">
        <label htmlFor="task">Nama</label>
        <input
          ref={task}
          type="text"
          name="Task"
          id=""
          placeholder="exp: belajar"
          className="border border-slate-300  p-3"
        />
      </div>
      <div className=" flex flex-col gap-2 ">
        <div>Status</div>
        <select
          ref={status}
          className=" border border-slate-300  p-3"
          name="status"
        >
          <option value="Complete">Complete</option>
          <option value="Incomplite">Incomplite</option>
        </select>
      </div>
      <p className=" text-xs italic text-red-600 m-0  ">{message}</p>
      <button
        onClick={handleSubmit}
        className=" border  border-slate-300 p-3  hover:bg-slate-300 "
      >
        Submit
      </button>
    </div>
  );
};

export default CreateTodo;
