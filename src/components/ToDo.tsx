import { useSetRecoilState } from "recoil";
import { ToDo, toDoState } from "../atoms";

function Todo({ text, category, id }: ToDo) {
  const setToDos = useSetRecoilState(toDoState)
  const onClick = (newCategory: ToDo["category"]) => {
    setToDos((oldToDos) => {
      const targetIdx = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: newCategory };
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
      {category !== "TO_DO" && (
        <button name="TO_DO" onClick={() => onClick("TO_DO")}>
          To Do
        </button>
      )}
      {category !== "DOING" && (
        <button name="DOING" onClick={() => onClick("DOING")}>
          Doing
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={() => onClick("DONE")}>
          Done
        </button>
      )}
    </li>
  );
}

export default Todo;