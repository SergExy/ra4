import { ChangeEvent, useState } from "react";
import Input from "../input/Input";
import ExerciseItem from "../exerciseItem/ExerciseItem";

import './exercised.scss';

interface Form {
  date: number;
  distance: number;
}

const Exercises = () => {
  const [exercises, setExercises] = useState<Form[]>([]);
  const [form, setForm] = useState<Form>({
    date: -1,
    distance: 0,
  });
  const [date, setDate] = useState<string | undefined>(undefined);
  const [distance, setDistance] = useState<string | undefined>(undefined);

  const handleDate = (e: ChangeEvent<HTMLInputElement>): void => {
    const str = e.target.value.replace(/[^\.\d]/g, '');
    setDate(str);

    const dateSplit = str.split('.');
    if (dateSplit.length !== 3 || dateSplit[2].length !== 4 || +dateSplit[1] > 11) {
      setForm({
        ...form,
        date: -1,
      });
      return
    }

    const date = new Date(+dateSplit[2], +dateSplit[1], +dateSplit[0]);

    setForm({
      ...form,
      date: date.getTime(),
    });
  }
  const handleDistance = (e: ChangeEvent<HTMLInputElement>): void => {
    const d = e.target.value.replace(/[^\d.]+/g, '');
    setDistance(d);
    setForm({
      ...form,
      distance: parseFloat(d),
    });
  }
  const onSubmit = (e: ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const exercClone = exercises.slice();
    const exercIndex = exercClone.findIndex(exerc => exerc.date === form.date);

    if (exercIndex !== -1) {
      const updateForm = {
        ...form,
        distance: +(exercClone[exercIndex].distance + form.distance).toFixed(2),
      }
      exercClone[exercIndex] = updateForm;
    } else {
      exercClone.push(form);
    }

    setExercises(exercClone.sort((a, b) => b.date - a.date));
  }
  const handleExercises = (id: number): void => {
    const exercClone = exercises.slice();
    exercClone.splice(id, 1);
    setExercises(exercClone.sort((a, b) => b.date - a.date));
  }

  return (
    <div className="exercises">
      <form className="exercises__form" onSubmit={onSubmit}>
        <div className="exercises__group">
          <div className="exercises__label">Дата (ДД.ММ.ГГГГ)</div>
          <Input name="date" value={date} onChange={handleDate} placeholder="00.00.0000" className="exercises__input" readOnly={false} />
        </div>
        <div className="exercises__group">
          <div className="exercises__label">Пройдено км</div>
          <Input name="distance" value={distance} onChange={handleDistance} placeholder="00" className="exercises__input" readOnly={false} />
        </div>
        <button className="exercises__submit" disabled={!(form.date === -1) || !form.distance}>OK</button>
      </form>
      <div className="exercises__table">
        <div className="exercises__tableHead">
          <div className="exercises__row">
            <div className="exercises__column">
              Дата (ДД.ММ.ГГГГ)
            </div>
            <div className="exercises__column">
              Пройдено км
            </div>
            <div className="exercises__column">
              Действия
            </div>
          </div>
        </div>
        {exercises && (
          <div className="exercises__tableBody">
            {exercises.map((item, i) => (
              <ExerciseItem
                key={i}
                id={i}
                exercise={item}
                onClick={handleExercises}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Exercises;