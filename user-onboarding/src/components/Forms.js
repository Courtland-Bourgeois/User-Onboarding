import React from 'react';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Forms({ values, errors, touched, status }) {
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
                <button>Submit</button>
            </Form>
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
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required()
    })
})(Forms);

export default FormikBoardingForm