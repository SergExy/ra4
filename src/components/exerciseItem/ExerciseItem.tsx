interface exerciseInter {
  date: number;
  distance: number;
}

interface Props {
  id: number;
  exercise: exerciseInter;
  onClick: (id: number) => void;
}

const ExerciseItem = ({ id, exercise, onClick }: Props) => {
  const date = new Date(exercise.date);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return (
    <div className="exercises__row">
      <div className="exercises__column">
        {day.toString().padStart(2, '0')}.{month.toString().padStart(2, '0')}.{year}
      </div>
      <div className="exercises__column">
        {exercise.distance}
      </div>
      <div className="exercises__column">
        <button className="exercises__remove" onClick={() => onClick(id)}>✘</button>
      </div>
    </div>
  )
}

export default ExerciseItem