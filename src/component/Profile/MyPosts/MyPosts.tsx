import s from './MyPosts.module.css';
import React, {ChangeEvent} from 'react';
import Post from '../Post/Post';
import {MapDispatchType, MapStateType} from './MyPostsContainer';
import {Button} from '../../../common/Button/Button';
import {TextArea} from '../../../common/TextArea/TextArea';

type OwnPropsType = MapStateType & MapDispatchType
export const MyPosts: React.FC<OwnPropsType> = ({profilePage, addPost, changingPostText}) => {
    let postElements = profilePage.posts
        .map(p => <Post message={p.message} likeCount={p.likeCount} key={p.id}/>)

    const addPostCallback = () => {
        addPost()
    }
    const changingPostTextCallback = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let postText = e.currentTarget.value
        changingPostText(postText)
    }

    return (
        <div className={s.post_wrapper}>
            <h4 className={s.my_posts_headline}>My posts</h4>
            <div className={s.add_new_posts}>
                <div className={s.area_wrapper}>
                <TextArea value={profilePage.newPostText}
                          onChange={changingPostTextCallback}
                          onEnter={addPostCallback}
                          placeholder='What new?'
                          className={s.area}>
                </TextArea>
                </div>
                <div className={s.button_wrapper}>
                    <Button onClick={addPostCallback} className={s.btn}>Add post</Button>
                </div>
            </div>
            {postElements}
        </div>
    )
}