export const userReducer=(state={},{type,payload}){
    switch (type) {
        case userActionTypes.UPDATE_USER:
           const user=state.auth.user;
            return{...state,user:{...user,payload}};
        default:
            return{...state}
    }
}