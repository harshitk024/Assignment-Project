import { createContext, useContext, useReducer } from "react";

const initialState = {
    username: null,
    isAuthenticated: false
}

function authReducer(state,action) {

    switch(action.type){

        case 'LOGIN':
            return action.payload
        case 'LOGOUT':
            return initialState

    }
}

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {

    const [state,dispatch] = useReducer(authReducer,initialState)

    return (
        <AuthContext.Provider value = {{state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {

    const context = useContext(AuthContext)
    if(!context) throw new Error('useAuth must be used within AuthProvider')
    return context
}