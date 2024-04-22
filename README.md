import React from 'react';
import { useForm } from 'react-hook-form';

function App() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        name="username"
        ref={register({ required: true, minLength: 3 })}
      />
      {errors.username && errors.username.type === "required" && (
        <span>Username is required</span>
      )}
      {errors.username && errors.username.type === "minLength" && (
        <span>Username must be at least 3 characters</span>
      )}

      <input
        type="password"
        name="password"
        ref={register({ required: true, minLength: 6 })}
      />
      {errors.password && errors.password.type === "required" && (
        <span>Password is required</span>
      )}
      {errors.password && errors.password.type === "minLength" && (
        <span>Password must be at least 6 characters</span>
      )}

      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
