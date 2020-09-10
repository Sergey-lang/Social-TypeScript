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
    newPostText: string
}
export type DialogPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageText: string
}
export type RootStateType = {
    profilePage: ProfilePageType
    dialogPage: DialogPageType
    sidebar: any
}

export let state: RootStateType = {
    profilePage: {
        posts: [
            {id: 1, message: 'Hello I am props', likeCount: 21},
            {id: 2, message: 'I am very handsome props', likeCount: 10},
            {id: 3, message: 'I go out from mypost component', likeCount: 5},
        ],
        newPostText: '',
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
        ],
        newMessageText: ''
    },
    sidebar: {}
}
//post
export const addNewPost = () => {
    const newPost: PostType = {
        id: 5,
        message: state.profilePage.newPostText,
        likeCount: 0
    }
    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = ''
    rerenderEntireTree(state)
}
export const updateNewPostText = (changedPostText: string) => {
    state.profilePage.newPostText = changedPostText
    rerenderEntireTree(state)
}
//dialog
export const addNewMessage = () => {
    const newMessage: MessageType = {
        id: 5,
        message: state.dialogPage.newMessageText
    }
    state.dialogPage.messages.push(newMessage)
    state.dialogPage.newMessageText = ''
    rerenderEntireTree(state)
}
export const updateNewMessageText = (changedMessageText: string) => {
    state.dialogPage.newMessageText = changedMessageText
    rerenderEntireTree(state)
}
