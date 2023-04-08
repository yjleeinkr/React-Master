import { useForm } from "react-hook-form"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface FormData {
  todo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const category = useRecoilValue(categoryState)
    const checkValidation = ({ todo }: FormData) => {
      // console.log(data.todo);
      setValue("todo", "");
      setToDos((oldToDos) => [
        { text: todo, id: Date.now(), category, },
        ...oldToDos,
      ]);
    };
  return (
    <form onSubmit={handleSubmit(checkValidation)}>
      <input
        {...register("todo", {
          required: "Please write a todo",
        })}
        type="text"
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;