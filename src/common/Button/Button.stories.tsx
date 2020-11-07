import React from 'react';
import {Button} from './Button';
import {action} from '@storybook/addon-actions';
import s from '../../component/Profile/MyPosts/MyPosts.module.css';

export default {
  title: 'Example/Button',
  component: Button,
}

const click = action('clicked')

export const BasicButton = () => {
  return (
      <Button onClick={click} className={s.btn}>Add post</Button>
  )
}