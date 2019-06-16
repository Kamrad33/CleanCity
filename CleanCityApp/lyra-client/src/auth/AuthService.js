import { AsyncStorage } from "react-native"
import decode from 'jwt-decode';
import {SERVER_ADDRESS} from "../const/constants";

export default class AuthService {
    // Initializing important variables
    constructor(domain) {
        this.domain = domain || SERVER_ADDRESS; // API server domain

        this.login = this.login.bind(this);
        this.fetch = this.fetch.bind(this);
        this.loadUser = this.loadUser.bind(this);
        this.getProfile = this.getProfile.bind(this)
    }

    async login(login, password) {
        // Get a token from api server using the fetch api
        return fetch(`${this.domain}/users`, {
            method: 'POST',
            mode: 'core',
            body: JSON.stringify({
                login: login,
                password: password
            })
        }).then(async res => {
            await this.setToken(res.headers.map.authorization); // Setting the token in AsyncStorage
            return Promise.resolve(res);
        })
            .catch((error) => {
                console.warn('error',error);
            })
    }

    async loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = await this.getToken(); // GEtting token from AsyncStorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    async loadUser(){
        console.log("onLoadUser");
        let user = await this.fetch(`${this.domain}/user/me`, {method: 'GET'});
        console.log("loadedUser", user);
        await AsyncStorage.setItem('user', JSON.stringify(user));
    }

    async setToken(idToken) {
        // Saves user token to AsyncStorage
        try {
            await AsyncStorage.setItem('id_token', idToken);
            console.log("onSetTOKEN!");
            await this.loadUser()
        } catch (error) {
            console.log("error while saving token" + JSON.stringify(error));
        }
    }

    async getToken() {
        // Retrieves the user token from AsyncStorage
        try {
            const token = await AsyncStorage.getItem('id_token');
            console.log("onGetToken!@!", token);
            return token;
        } catch (error) {
            console.log("error while get token");
        }
    }

    async logout() {
        console.log("onExit");
        // Clear user token and profile data from AsyncStorage
        try {
            await AsyncStorage.removeItem('id_token');
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('status');
        } catch (error) {
            console.log("error while delete token");
        }
    }

    async getProfile() {
        let user = await AsyncStorage.getItem('user');
        console.log("onGetProfile2", user);
        return user;
    }


    async fetch(url, data, method) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers['Authorization'] = /*'Bearer ' + */await this.getToken()
        }
        console.log("log2", headers, data, "url", url);
        return fetch(`${this.domain}/${url}`, {
            headers,
            method: method,
            body: JSON.stringify(data)
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error
        }
    }
}
