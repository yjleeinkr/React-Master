import { atom, selector } from "recoil";

// type보다 더 타입을 보장받을 수 있다.
// 타입을 지정해주지 않는 이상 배열처럼 인덱스 값이 0부터 매겨진다.
export enum Cateories { 
  "TO_DO" = "TO_DO", // 0
  // "TO_DO" = "TO_DO" 라고 타입을 설정해버리면 enum의 값이 0이 아닌 "TO_DO" 가 된다.
  "DOING" = "DOING", // 1
  "DONE" = "DONE", // 2
}
export interface ToDo {
  text: string;
  id: number;
  category: Cateories
}

export const categoryState = atom<Cateories>({
  key: "category",
  default: Cateories.TO_DO
});

export const toDoState = atom<ToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState)
    const category = get(categoryState);
    return toDos.filter(v => v.category === category)
  }
})