import {deltax} from './axios';

export const register = async (name, email, password, isArtist, dob=undefined, bio=undefined) => {

    if(isArtist) {
        const response = await deltax.post('register/', {
            email,
            name,
            password,
            isArtist,
            dob,
            bio
        })
    
        return response;

    }
    const response = await deltax.post('register/', {
        email,
        name,
        password,
        isArtist
    })

    return response;
}

export const login = async (email, password, isArtist) => {
    const response = await deltax.post('login/', {
        email,
        password,
        isArtist
    })
    return response;
}




export const getArtistDetails = async (email) => {
    const response = await deltax.get('artist/', {
        params: {
            email,
            bulk: false
        }
    })
    return response;
}

export const getAllArtistDetails = async (email) => {
    const response = await deltax.get('artist/', {
        params: {
            email,
            bulk: true
        }
    })
    return response;
}

export const getArtistAllSongs = async (email) => {
    const response = await deltax.get('artistAllSongs/', {
        params: {
            email
        }
    })
    return response;
}


export const getSongs = async (email) => {
    const response = await deltax.get('topSongs/',{
        params: {
            email
        }
    });
    return response;
}


export const userRating = async (email, id, rating) => {
    const response = await deltax.post('userRating/',{
        email,
        id,
        rating
    })
    return response;    
}

export const getArtists = async () => {
    const response = await deltax.get('topArtists/')
    return response;
}