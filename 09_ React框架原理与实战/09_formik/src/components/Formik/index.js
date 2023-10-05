import { useFormik } from "formik";
import * as Yup from "yup";

const Index = () => {
  const { touched, errors, getFieldProps, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().max(15, "用户名长度不能大于15").required("请输入用户名"),
      password: Yup.string().min(6, "密码长度不能小于6").required("请输入密码"),
    }),
    // validate: (values) => {
    //   const errors = {};
    //   if (!values.username) {
    //     errors.username = "请输入用户名";
    //   } else if (values.username.length > 15) {
    //     errors.username = "用户名长度不能大于15";
    //   }

    //   if (!values.password) {
    //     errors.password = "请输入密码";
    //   } else if (values.password.length < 6) {
    //     errors.password = "密码长度不能小于6";
    //   }
    //   return errors;
    // },
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" placeholder="username" {...getFieldProps("username")} />
          <p>{touched.username && errors.username}</p>
        </div>
        <div>
          <input type="text" placeholder="password" {...getFieldProps("password")} />
          <p>{touched.password && errors.password}</p>
        </div>
        <div>
          <button type="submit">提交</button>
        </div>
      </form>
    </div>
  );
};

export default Index;
