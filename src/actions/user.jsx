import {C_USER} from "../constants";

// actions
export const addUser = (data) => ({
    type: C_USER.ADD_USER,
    data: data,
});

export const changeUserData = (data) => ({
    type: C_USER.CHANGE_DATA,
    data: data,
});

export const removeUser = () => ({
    type: C_USER.REMOVE_USER,
});
