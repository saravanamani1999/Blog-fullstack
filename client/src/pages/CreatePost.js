import React, {useEffect, useContext} from 'react';
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../helpers/AuthContext';

function CreatePost() {
    const {authState} = useContext(AuthContext);

    useEffect(() => {
        if(!localStorage.getItem("accessToken")) {
            navigate("/login");
        }
    }, []);

    const initialValues ={
        title: "",
        postText: "",
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You must input a title!"),
        postText:Yup.string().required(),
    });

    let navigate = useNavigate();
    const onSubmit = (data) => {

        axios.post("http://localhost:3001/posts", data, {headers: {accessToken: localStorage.getItem('accessToken')}}).then((res) => {
            console.log("It worked!");
            navigate("/");
        });
    }
  return (
    <div className="createPostPage">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='formContainer'>
                <label>Title: </label>
                <ErrorMessage name="title" component="span" />
                <Field id="inputCreatePost" name="title" placeholder="Enter title" />

                <label>Post: </label>
                <ErrorMessage name="postText" component="span" />
                <Field id="inputCreatePost" name="postText" placeholder="Enter post" />
                <button type="submit"> Create Post</button>
            </Form>
        </Formik>
    </div>
  )
}

export default CreatePost
