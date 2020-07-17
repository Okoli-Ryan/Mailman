import { Db, FieldValue } from '../services/firebase'

export const deleteMessage = (payload) => {
    return (dispatch, getState) => {
        Db.collection("chatrooms")
        .doc(getState().menuBarReducer)
        .update({
            [`messages.${payload}`]: FieldValue.delete()
        })
    }
}

export const updateMessage = (newMessage, key) => {
    return (dispatch, getState) => {
        Db.collection("chatrooms")
        .doc(getState().menuBarReducer)
        .update({
            [`messages.${key}.text`]: newMessage
        })
    }
}