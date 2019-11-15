import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function Forms({ values, errors, touched, status }) {
    const [user, setUser] = useState([]);

    useEffect(() => {
        status && setUser(member => [...member, status])
    }, [status])

    return (
        <div className="boarding-form">
            <Form>
                <Field type="text" name="name" placeholder="name" />
                {touched.name && errors.name && (
                    <p>{errors.name}</p>
                )}
                <Field type="email" name="email" placeholder="email" />
                {touched.email && errors.email && (
                    <p>{errors.email}</p>
                )}
                <Field type="password" name="password" placeholder="password" />
                {touched.password && errors.password && (
                    <p>{errors.password}</p>
                )}
                <label>
                    <Field type="checkbox" name="TOS" checked={values.TOS} />
                    Terms of Service    
                </label>
                <button type="submit">Submit</button>
            </Form>
               {user.map(member => (
                   <ul key={member.id}>
                        <li>Name: {member.name}</li>
                        <li>Email: {member.email}</li>
                   </ul>
               ))}         
        </div>
    )
}

const FormikBoardingForm = withFormik({
    mapPropsToValues({ name, email, password, TOS }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            TOS: TOS || false
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Name is required!"),
        email: Yup.string().required("Email is required!"),
        password: Yup.string().required("Please type password!")
    }),
    handleSubmit(values, { setStatus }) {
        axios
            .post("https://reqres.in/api/users/", values)
            .then(res => {
                console.log(res);
                setStatus(res.data)
            })
            .catch(err => console.log(err.response));
    }
})(Forms);

export default FormikBoardingForm