import { useState, useEffect } from "react";
import { root } from "../../index";

function Index() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count => count + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => root.unmount()}>卸载组件</button>
    </div>
  );
}

export default Index;
