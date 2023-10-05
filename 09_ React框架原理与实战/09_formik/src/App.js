import Formik from "./components/Formik";
import FormikComponent from './components/FormikComponent'

function App() {
  return (
    <div className="App">
      {/*  formik 基础用法 */}
      {/* <Formik /> */}

      {/* formik 高级用法 使用组件的方式构建表单 */}
      <FormikComponent /> 
    </div>
  );
}

export default App;
