import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { categoryState, toDoSelector, Cateories } from "../atoms";
import CreateToDo from "./CreateToDo";
import Todo from "./ToDo";

// TODO: 삭제 기능 및 localstorage 에 저장해서 가져오기

function TodoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState)
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as Cateories);
  }
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select onInput={onInput}>
        <option value={Cateories.TO_DO}>To Do</option>
        <option value={Cateories.DOING}>Doing</option>
        <option value={Cateories.DONE}>Done</option>
      </select>
      <CreateToDo />
      {toDos?.map((item) => (
        <Todo key={item.id} {...item} />
      ))}
    </div>
  );
}

export default TodoList;