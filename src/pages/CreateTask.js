import React from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import SelectInput from '../Components/SelectInput';
import Icon from "../Components/Icon";

import { useFormik } from 'formik';
import { createNewTask } from "../utils/validationSchema";

import * as S from '../styled/CreateTask.styled';

const CreateTask = () => {

    const onSubmit = ({ newTask, category }, {resetForm}) => {
        console.log('im in');
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
        <S.Section>
            <S.Form onSubmit={handleSubmit} autoComplete='off'>
                <Input
                    id='newTask'
                    type='text'
                    value={values.newTask}
                    error={errors.newTask}
                    touched={touched.newTask}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Write new task...'
                    htmlFor='newTask'
                />
                <SelectInput/>
                <Button type='submit' size='48%' color='dark' disabled={!isValid} >Create task</Button>
            </S.Form>
            <S.ButtonContainer>
                <Button circle='true' color='dark'>
                    <Icon size='xl' iconName={'fa-xmark'} iconColor='white' />
                </Button>
                <Button size='60%' color='light' navigateTo='/create-category' >Create category</Button>
            </S.ButtonContainer>
        </S.Section>
    )
};

export default CreateTask;