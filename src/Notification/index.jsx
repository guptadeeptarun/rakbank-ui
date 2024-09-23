import { useEffect } from "react";

import { toast } from 'react-toastify';
import { ToastContainer } from "react-toastify";
import { Zoom } from 'react-toastify';
import { useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';


export default function Notification() {

    const notification = useSelector((state) => state.notification);

    useEffect(() => {
        if (notification?.type === 'error') {
            toast.error(notification.payload);
        }
        if (notification?.type === 'success') {
            toast.success(notification.payload);
        }

        if (notification?.type === 'httpError') {
            const [responseCode, responseBody] = notification.payload;
            if (responseCode === 400) {
                console.log('inside notification reducer');
                toast.error(responseBody?.errorMessage);
            } else if (responseCode === 401 || responseCode === 403) {
                toast.error("Unauthorized Request");
            } else {
                toast.error("Error processing request. Please try after some time.");
            }
        }
    }, [notification])

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Zoom} />
        </>
    );
}
