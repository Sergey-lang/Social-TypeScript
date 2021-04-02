import {Form, Formik, Field} from 'formik';
import React from 'react';
import {FilterType} from '../../../redux/users-reducer';
import {useSelector} from 'react-redux';
import {getUsersFilter} from '../../../redux/users-selectors';

import s from './UsersSearchForm.module.scss'
import {Button} from '../../../components/Button/Button';

const usersSearchValidateForm = (values: any) => {
    const errors = {};
    return errors;
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

type FriendFormType = 'true' | 'false' | 'null';

type FormType = {
    term: string,
    friend: FriendFormType
}

export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {

    const filter = useSelector(getUsersFilter)

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
        //initial values === redux filter values
        //useEffect work after first render and current values take later, so
        //the enableReinitialize prop resets form if initialValues is changed
        enableReinitialize
        initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
        validate={usersSearchValidateForm}
        onSubmit={submit}>

        {({isSubmitting}) => (
            <div className={s.formWrapper}>
                <Form className={s.usersForm}>
                    <Field type="text" name="term" className={s.usersSearchInput}/>
                    <Field name="friend" as="select" className={s.usersSelector}>
                        <option value="null">All</option>
                        <option value="true">Only following</option>
                        <option value="false">Only unfollowing</option>
                    </Field>
                    <Button type="submit" disabled={isSubmitting} className={s.searchBtn}>
                        Find
                    </Button>
                </Form>
            </div>
        )}
    </Formik>
})
