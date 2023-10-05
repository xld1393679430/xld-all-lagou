import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Index = () => {
  const initialValues = {
    username: "",
  };

  const handleSubmit = (values) => {
    console.log(values, "handleSubmit");
  };

  const schema = Yup.object({
    username: Yup.string().max("10", "username最大长度为10").required("请输入username"),
  });

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
      <Form>
        <div>
          <Field name="username" />
          <p>
            <ErrorMessage name="username" />
          </p>
        </div>

        <button type="submit">submit</button>
      </Form>
    </Formik>
  );
};

export default Index;
