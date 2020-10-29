import React from 'react'
import { ActionsTypes } from '../essences/essences'

enum ActionsType {
	SET_USER_DATA = 'AUTH/SET-USER-DATA',
}

export type AuthInitPageType = {
	id: number | null
	email: string | null
	login: string | null
	isAuth: boolean
}

let initializeState: AuthInitPageType = {
	id: null,
	email: null,
	login: null,
	isAuth: true,
}

export const authReducer = (
	state: AuthInitPageType = initializeState,
	action: ActionsTypes
): AuthInitPageType => {
	switch (action.type) {
		case ActionsType.SET_USER_DATA:
			return {
				...state,
				...action.data,
				isAuth: true,
			}
		default:
			return state
	}
}

type SetDataACType = {
	type: ActionsType.SET_USER_DATA
	data: {
		id: number
		email: string
		login: string
	}
}
export const setUserData = (
	id: number,
	email: string,
	login: string
): SetDataACType => ({
	type: ActionsType.SET_USER_DATA,
	data: { id, email, login },
})
