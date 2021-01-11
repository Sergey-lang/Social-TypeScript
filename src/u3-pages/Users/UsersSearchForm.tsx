import {Form, Formik, Field} from 'formik';
import React from 'react';
import {FilterType} from '../../u4-redux/users-reducer';

const usersSearchValidateForm = (values: any) => {
    const errors = {};
    return errors;
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

type FormType = {
    term: string,
    friend: 'true' | 'false' | 'null'
}

export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {

    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        //convert string to boolean
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }
        //onFilterChanged get filter and include this value in requestUsers(1, pageSize, filter)
        //requestUsers do request in redux
        props.onFilterChanged(filter)
        setSubmitting(false)
    }

    return <Formik
        //from redux
        initialValues={{term: '', friend: 'null'}}
        validate={usersSearchValidateForm}
        onSubmit={submit}>

        {({isSubmitting}) => (
            <Form>
                <Field type="text" name="term"/>

                <Field name="friend" as="select">
                    <option value="null">All</option>
                    <option value="true">Only following</option>
                    <option value="false">Only unfollowing</option>
                </Field>
                <button type="submit" disabled={isSubmitting}>
                    Find
                </button>
            </Form>
        )}
    </Formik>
})