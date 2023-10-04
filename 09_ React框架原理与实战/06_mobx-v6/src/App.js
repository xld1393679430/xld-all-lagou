import Counter from "./components/Counter";
import { RootStoreProvider } from "./store";

function App() {
  return (
    <RootStoreProvider>
      <Counter />
    </RootStoreProvider>
  );
}

export default App;
