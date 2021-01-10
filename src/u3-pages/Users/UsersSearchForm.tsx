import {Formik} from "formik";
import React from "react";
import {FilterType} from "../../u4-redux/users-reducer";

const usersSearchValidateForm = (values: any) => {
    const errors = {};
    return errors;
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

export const UsersSearchForm: React.FC<PropsType> = (props) => {

    const submit = (values: FilterType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        props.onFilterChanged(values)
        setSubmitting(false)
    }

    return (
        <div>
            <Formik
                initialValues={{term: ''}}
                validate={usersSearchValidateForm}
                onSubmit={submit}
            >
                {({
                      values,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="term"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.term}
                        />
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    )
}