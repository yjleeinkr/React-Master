import React from "react";
import { useSetRecoilState } from "recoil";
import { ToDo, toDoState, Cateories } from "../atoms";

function Todo({ text, category, id }: ToDo) {
  const setToDos = useSetRecoilState(toDoState)
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget: { name } } = event;
    setToDos((oldToDos) => {
      const targetIdx = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any};
      return [
        ...oldToDos.slice(0, targetIdx),
        newToDo,
        ...oldToDos.slice(targetIdx + 1),
      ];
    })

  }
  return (
    <li>
      <span> {text}</span>
      {category !== Cateories.TO_DO && (
        <button name={Cateories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Cateories.DOING && (
        <button name={Cateories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Cateories.DONE && (
        <button name={Cateories.DONE} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default Todo;