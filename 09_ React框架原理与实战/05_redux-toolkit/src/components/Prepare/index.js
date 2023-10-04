import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { PREPARE, addTodoPrepare } from "../../store/prepare.slice";

let index = 1;

const Index = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state[PREPARE]);

  const handleAdd = () => {
    dispatch(addTodoPrepare({ title: "任务" + index }));
    index += 1;
  };

  console.log(todos, 9999);
  return (
    <div>
      <button onClick={handleAdd}>添加任务</button>
      <ul>
        {todos.map((item, index) => {
          return (
            <li key={index}>
              id: {item.id}, title: {item.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Index;
