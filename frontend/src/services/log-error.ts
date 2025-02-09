// error-handle.ts

export const logUserError = (error: any, setAlert: React.Dispatch<React.SetStateAction<string>>) => {
    switch (error.status) {
        case 404:
            if (error.response.data.error.includes("No user found with this email.")) {
                setAlert("No user found with this email.");
            } else {
                setAlert("The requested resource was not found. status code: 404");
            }
            break;
        case 401:
        case 400:
        case 403:
            setAlert(error.response.data.error);
            break;
        case 500:
            setAlert(error.message);
            break;
        default:
            window.alert("An unexpected error occurred");
    }
};

export const logGenreError = (error: any, setAlert: React.Dispatch<React.SetStateAction<string>>) => {
    switch (error.status) {
        case 404:
        case 401:
        case 400:
        case 403:
            setAlert(error.response.data.error);
            break;
        case 500:
            setAlert(error.message);
            break;
        default:
            window.alert("An unexpected error occurred");
    }
};

export const logMovieError = (error: any, setAlert: React.Dispatch<React.SetStateAction<string>>) => {
    switch (error.status) {
        case 404:
        case 401:
        case 400:
        case 403:
            setAlert(error.response.data.error);
            break;
        case 500:
            setAlert(error.message);
            break;
        default:
            window.alert("An unexpected error occurred");
    }
};

export const logActionError = (error: any) => {
    switch (error.status) {
        case 404:
            window.alert(error.response.data);
            break;
        case 401:
        case 400:
        case 403:
            window.alert(error.response.data);
            break;
        case 500:
            window.alert(error.message);
            break;
        default:
            window.alert("An unexpected error occurred");
    }
};


export const logMoviePostError = (error: any, setAlert: React.Dispatch<React.SetStateAction<string>>) => {
    switch (error.response?.status) {
        case 404:
            if (error.response.data.includes("No genre found.")) {
                setAlert("No genre found.");
            } else {
                setAlert("The requested resource was not found. status code: 404");
            }
            break;
        case 400:
            if (error.response.data.includes("Already have movie with this title.")) {
                setAlert("Already have movie with this title.");
            } else {
                setAlert(error.response.data);
            }
            break;
        case 401:
        case 403:
            setAlert(error.response.data);
            break;
        case 500:
            setAlert(error.message);
            break;
        default:
            window.alert("An unexpected error occurred");
    }

};