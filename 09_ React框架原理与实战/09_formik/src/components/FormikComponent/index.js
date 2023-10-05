import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Index = () => {
  const initialValues = {
    username: "",
    password: "",
    content: "content",
  };

  const handleSubmit = (values) => {
    alert(JSON.stringify(values));
  };

  const schema = Yup.object({
    username: Yup.string().max("10", "username最大长度为10").required("请输入username"),
  });

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
      <Form>
        <div>
          <label htmlFor="username">username: </label>
          <Field name="username" id="username" />
          <p>
            <ErrorMessage name="username" />
          </p>
        </div>

        <div>
          <label htmlFor="password">password: </label>
          <Field name="password" id="password" type="password" />
          <p>
            <ErrorMessage name="password" />
          </p>
        </div>

        <div>
          <label htmlFor="content">content: </label>
          <Field name="content" id="content" as="textarea" />
          <p>
            <ErrorMessage name="content" />
          </p>
        </div>

        <button type="submit">submit</button>
      </Form>
    </Formik>
  );
};

export default Index;
