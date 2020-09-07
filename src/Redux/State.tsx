import React from 'react';
import {rerenderEntireTree} from '../render';

export type MessageType = {
    id: number
    message: string
}
export type DialogType = {
    id: number
    name: string
}
export type PostType = {
    id: number
    message: string
    likeCount: number
}
export type ProfilePageType = {
    posts: Array<PostType>
}
export type DialogPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}
export type RootStateType = {
    profilePage: ProfilePageType
    dialogPage: DialogPageType
    sidebar:any
}

let state: RootStateType = {
    profilePage: {
        posts: [
            {id: 1, message: 'Hello I am props', likeCount: 21},
            {id: 2, message: 'I am very handsome props', likeCount: 10},
            {id: 3, message: 'I go out from mypost component', likeCount: 5},
        ],
    },
    dialogPage: {
        dialogs: [
            {id: 1, name: 'Dima Ivanov'},
            {id: 2, name: 'Egor Andreev'},
            {id: 3, name: 'Sergey Titov'},
            {id: 4, name: 'Anton Serov'},
            {id: 5, name: 'Mariya Vinogradova'},
            {id: 6, name: 'Alex Moroz'},
        ],
        messages: [
            {id: 1, message: 'Detract yet delight written farther'},
            {id: 2, message: 'An stairs as be lovers'},
            {id: 3, message: 'Unpleasant in in insensible favourable'},
            {id: 4, message: 'Called though excuse'},
            {id: 5, message: 'Called though.'},
            {id: 6, message: 'Ha-ha-ha...come on.'},
        ]
    },
    sidebar:{}
}


export const addNewPost = (postText: string) => {
    const newPost: PostType = {
        id: 5,
        message: postText,
        likeCount: 0
    }
    state.profilePage.posts.push(newPost)
    rerenderEntireTree(state)
}

export const addNewMessage = (messageText: string) => {
    const newMessage: MessageType = {
        id: 5,
        message: messageText
    }
    state.dialogPage.messages.push(newMessage)
    rerenderEntireTree(state)
}
export default state