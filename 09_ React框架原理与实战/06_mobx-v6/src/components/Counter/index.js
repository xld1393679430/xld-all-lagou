import { observer } from "mobx-react-lite";
import { useRootStore } from "../../store";

const Index = () => {
  const { counterStore } = useRootStore();
  const { increment, count, decrement } = counterStore;
  return (
    <div>
      <button onClick={increment}>+1</button>
      <span>{count}</span>
      <button onClick={decrement}>-1</button>
    </div>
  );
};

export default observer(Index);
