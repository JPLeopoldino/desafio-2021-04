import React, { useState } from 'react';

const initialState = {
    name: 'aaaaaa',
    email: 'bbbbbbb'
}

export const Context = React.createContext();

const Store = ({ children }) => {
    const [state, setState] = useState(initialState);
    const [favorites, setFavorites] = useState('FAVORITES');

    return (
        <Context.Provider value={[state, setState]}>{children}</Context.Provider>
    );
};

export default Store;