import React, {ReactNode} from 'react';
import {Store} from 'redux';

export type ProviderType = {
    store: Store
    children: ReactNode
}

export const StoreContext = React.createContext({} as Store)

export const Provider: React.FC<ProviderType> = (props) => {
    return (
        <StoreContext.Provider value={props.store}>
            {props.children}
        </StoreContext.Provider>
    )
}