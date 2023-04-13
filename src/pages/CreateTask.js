import React from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import Select from "../Components/Select";

import { useFormik } from 'formik';
import { createNewTask } from "../utils/validationSchema";

const CreateTask = () => {

    const onSubmit = ({ newTask, category }) => {

    }

    const { values, errors, touched, isValid, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      newTask: '',
      category: ''
    },
    validateOnMount: true,
    validationSchema: createNewTask,
    onSubmit: onSubmit,
  });

    return (
        <section>
            <form onSubmit={handleSubmit} autoComplete='off'>
                <Input id='newTask' type='text' value={values.newTask} error={errors.newTask} touched={touched.newTask} onChange={handleChange} onBlur={handleBlur} placeholder='Write new task...' htmlFor='newTask'/>
                <Select/>
                <Button size='l' color='light'>Create Category</Button>
                <div>
                    <Button circle='true' color='dark'>X</Button>
                    <Button type='submit' size='l' color='dark' disabled={!isValid}>Create Task</Button>
                </div>
            </form>
        </section>
    )
};

export default CreateTask;