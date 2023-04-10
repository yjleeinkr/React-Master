import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minuteState } from "../atoms";

function Clock() {
  // ✨ useRecoilState(atom)은 atom의 값과 atom값을 바꾸는 setter 함수를 가져옴
  const [minutes, setMinutes] = useRecoilState(minuteState);
  // ✨ useRecoilState(selector)은 seletor의 get 값과 set 속성의 함수를 가져옴
  const [hours, setHours] = useRecoilState(hourSelector);
  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget: { value } } = event;
    setMinutes(+value);
  }
  const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget: { value } } = event;
    setHours(+value);
  }
  return (
    <div>
      <input value={minutes} onChange={onMinutesChange} type="number" placeholder="Minutes" />
      <input value={hours} onChange={onHoursChange} type="number" placeholder="Hours" />
    </div>
  )
}

export default Clock;