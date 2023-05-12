import {
  Table,
  Tr,
  Td,
  Thead,
  Tbody,
  Th,
  Button,
  Input,
  Select,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";

const ShowTodo = ({ todo, getData }) => {
  let [todoActive, setTodoActive] = useState();
  let task = useRef();
  let status = useRef();

  const showData = () => {
    return todo?.map((val, idx) => {
      return (
        <Tr key={idx.toLocaleString()}>
          <Td>{val.no}</Td>
          <Td>{val.Task}</Td>
          <Td>{val.Status}</Td>
          <Td className=" flex gap-3 ">
            <Button
              onClick={() =>
                handleEdit({ id: val.no, task: val.Task, status: val.Status })
              }
            >
              Edit
            </Button>
            <Button onClick={() => handleDelete(val.no)}> Delete </Button>
          </Td>
        </Tr>
      );
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todo-list/${parseInt(id)}`);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (data) => {
    try {
      setTodoActive(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    console.log(task.current.value);
    console.log(status.current.value);
    try {
      await axios.patch(
        `http://localhost:5000/todo-list/${parseInt(todoActive.id)}`,
        {
          Task: task.current.value,
          Status: status.current.value,
        }
      );
      setTodoActive(null);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" w-[30%] m-10   ">
      <h1 className=" text-xl font-bold mb-2 "> Show Todo</h1>
      <Table>
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>Task</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>

        {todoActive ? (
          <Tbody>
            <Tr>
              <Td>{todoActive.id}</Td>
              <Td>
                <Input ref={task} type="text" defaultValue={todoActive.task} />
              </Td>
              <Td>
                <Select ref={status} defaultChecked={todoActive.status}>
                  <option value="complete">Complete</option>
                  <option value="incomplite">Incomplite</option>
                </Select>
              </Td>
              <Td className=" flex gap-3 ">
                <Button onClick={handleSave}>save</Button>
              </Td>
            </Tr>
          </Tbody>
        ) : (
          <Tbody>{showData()}</Tbody>
        )}
      </Table>
    </div>
  );
};

export default ShowTodo;
