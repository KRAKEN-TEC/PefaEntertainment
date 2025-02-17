// error-handle.ts

export const logError = (error: any, setAlert: React.Dispatch<React.SetStateAction<string>>) => {
    switch (error.status) {
        case 400:
        case 404:
        case 401:
        case 403:
            setAlert(error.response.data.error);
            break;
        case 500:
            if (error.response.data.message === "jwt malformed") {
                setAlert("Please log in first.");
            }
            else if (error.response.data.message === "jwt expired") {
                setAlert("Please refresh.");
            }
            else {
                setAlert(error.response.data.error);
            }
            break;
        default:
            window.alert("An unexpected error occurred");
    }
};

export const logActionError = (error: any) => {
    switch (error.status) {
        case 400:
        case 401:
        case 403:
            window.alert(error.response.data.error);
            break;
        case 500:
            if (error.response.data.message === "jwt malformed") {
                window.alert("Please log in first.");
            }
            else if (error.response.data.message === "jwt expired") {
                window.alert("Please refresh.");
            }
            else {
                window.alert(error.response.data.error);
            }
            break;
        default:
            window.alert("An unexpected error occurred");
    }
};