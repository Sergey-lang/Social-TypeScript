import React, {ReactNode} from 'react';
import {Store} from 'redux';

type ProviderType = {
    store: Store
    children: ReactNode
}

const StoreContext = React.createContext({} as Store)

const Provider: React.FC<ProviderType> = (props) => {
    return (
        <StoreContext.Provider value={props.store}>
            {props.children}
        </StoreContext.Provider>
    )
}