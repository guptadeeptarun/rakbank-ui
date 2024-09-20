import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "../Notification/notificationSlice";


export default configureStore({
    reducer: {
        notification: notificationReducer
    }
})

