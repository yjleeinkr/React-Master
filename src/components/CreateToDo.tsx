import { useForm } from "react-hook-form"
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface FormData {
  todo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<FormData>();
    const checkValidation = ({ todo }: FormData) => {
      // console.log(data.todo);
      setValue("todo", "");
      setToDos((oldToDos) => [
        { text: todo, id: Date.now(), category: "TO_DO" },
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