import { atom, selector } from "recoil";

export interface ToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

export const toDoState = atom<ToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState)
    return [
      toDos.filter(v => v.category === 'TO_DO'),
      toDos.filter(v => v.category === 'DOING'),
      toDos.filter(v => v.category === 'DONE')
    ]
  }
})