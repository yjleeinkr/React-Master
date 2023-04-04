import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
  extraError?: string; 
}

function TodoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormData>({
    defaultValues: {
    email: '@naver.com'
  }});
  const onValid = (data: FormData) => {
    console.log(data)
    const { password, password1 } = data

    if (password !== password1) {
      setError(
        "password1",
        { message: "Password is not the same" },
        { shouldFocus: true }
      );
    }
    setError("extraError", { message: 'Server offline'})
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit(onValid)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{errors.email?.message ?? ""}</span>
        <input
          {...register("firstName", {
            required: "please fill out first name",
            validate: {
              noNico: (value) => value.includes("nico") ? "no nico allowed" : true,
              noYj : (value) => value.includes("yj") ? 'no yj allowed' : true
            }
          })}
          placeholder="First Name"
        />
        <span>{errors.firstName?.message ?? ""}</span>
        <input
          {...register("lastName", {
            required: "please fill out last name",
            validate: (value) => true,
          })}
          placeholder="Last Name"
        />
        <span>{errors.lastName?.message ?? ""}</span>
        <input
          {...register("username", {
            required: "please fill out username",
            minLength: { value: 10, message: "Your username is too short" },
          })}
          placeholder="Username"
        />
        <span>{errors.username?.message ?? ""}</span>
        <input
          {...register("password", {
            required: "please fill out password",
            minLength: { value: 5, message: "Your password is too short" },
          })}
          placeholder="Password"
        />
        <span>{errors.password?.message ?? ""}</span>
        <input
          {...register("password1", {
            required: "Password confirmation is required",
            minLength: { value: 5, message: "Your password is too short" },
          })}
          placeholder="Password1"
        />
        <span>{errors.password1?.message ?? ""}</span>
        {/* register가 반환하는 객체를 가져다가 input 에 props로 주는 것 */}
        <button>Add</button>
      </form>
    </div>
  );
}

// handleSubmit : preventDefault() 역할 및 validation 역할
// 첫번째 인자: 데이터가 유효할때 호출되는 함수, 두번째 인자 : 반대
// html에서 태그에 제공해주는 required 속성은 사용자 접근, 조작이 가능하기 때문에, js에서 validation 할 수 있다.
// register의 두번째 인자로 { required: true } 옵션을 넣어주면, submit을 해도 데이터가 출력이 되지않고, 심지어 틀린 곳으로 커서까지 자동으로 focus해준다.

// function TodoList() {
//   const [todo, setTodo] = useState('');
//   const [todoError, setTodoError] = useState('')
//   const onChange = (e: React.FormEvent<HTMLInputElement>) => {
//     const { currentTarget: { value } } = e;
//     setTodoError('')
//     setTodo(value);
//   }

//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (todo.length < 10) return setTodoError('To do should be longer');
//     console.log('submit');
//   }

//   return (
//     <div>
//       <form onSubmit={onSubmit}> 
//         <input type="text" placeholder="Write a to do" value={todo} onChange={onChange}/>
//         <button>Add</button>
//         {todoError !== '' ? todoError : null}
//       </form>
//     </div>
//   )
// }

export default TodoList;