import axios from 'axios';

export const deltax = axios.create({
    // baseURL: "http://localhost:8000/",
    baseURL: "https://song-hunt-backend.herokuapp.com/",
    headers: {
        'Content-Type': 'application/json'
    }
});

const requestHandler = (request, email) => {
    if(email)
        request.headers["id"] = email
    return request;
}

export const initializeInterceptors = (email) => {
    deltax.interceptors.request.use(
          request => requestHandler(request, email)
    );
}