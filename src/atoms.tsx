import { EffectCallback } from "react";
import { atom, DefaultValue, selector } from "recoil";

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

type SetSelf<T> = (newValue: T | DefaultValue) => void;
type OnSet<T> = (callback: (newValue: T, oldValue: T | DefaultValue, isReset: boolean) => void) => void;

 type AtomEffect<T> = (props: {
   setSelf: SetSelf<T>;
   onSet: OnSet<T>;
 }) => void | EffectCallback;

const localStorageEffect = (key: string) : AtomEffect<ToDo[]> => ({ setSelf, onSet })=> {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue))
  }

  onSet((newValue, _, isReset) => {
    isReset
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, JSON.stringify(newValue))
  })
}

export const toDoState = atom<ToDo[]>({
  key: "toDo",
  default: [],
  effects: [
    localStorageEffect('toDo')
  ]
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState)
    const category = get(categoryState);
    return toDos.filter(v => v.category === category)
  },
})

export const minuteState = atom({
  key: "minutes",
  default: 0,
})

// 📌 쓸데없이 여러개의 atom을 만들 필요 없이 다수의 atom을 이용해서 selector를 만들수도 있다.
export const hourSelector = selector<number>({
  key: "hours",
  get: ({ get }) => {
    const minutes = get(minuteState);
    return minutes / 60;
  },
  set: ({ set }, newValue) => {
    const minutes = Number(newValue) * 60
    set(minuteState, minutes)
  }
})