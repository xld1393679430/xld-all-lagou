import React, { useState, useEffect } from "react";
import { useFormik } from "formik";

const Index = () => {
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: "张三",
      password: 123456,
    },
    validate: (values) => {
      const errors = {};
      if (!values.username) {
        errors.username = "请输入用户名";
      } else if (values.username.length > 15) {
        errors.username = "用户名长度不能大于15";
      }

      if (!values.password) {
        errors.password = "请输入密码";
      } else if (values.password.length < 6) {
        errors.password = "密码长度不能小于6";
      }
      return errors;
    },
    onSubmit: (values) => {
	  alert(JSON.stringify(values))
    },
  });

  useEffect(() => {}, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" name="username" placeholder="username" value={values.username} onChange={handleChange} />
          <p>{errors.username}</p>
        </div>
        <div>
          <input type="text" name="password" placeholder="password" value={values.password} onChange={handleChange} />
          <p>{errors.password}</p>
        </div>
        <div>
          <button type="submit">提交</button>
        </div>
      </form>
    </div>
  );
};

export default Index;
