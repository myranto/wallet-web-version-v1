import axios from "axios";
import { getToken } from "../../utils/function";

// class mère pour les requetes d'appel d'api
export class Api {
    uri = process.env.REACT_APP_HOST_API

    constructor(url) {
        this.uri += url
    }
    //  gestion d'erreur
    error_handling(error) {
        if (axios.isAxiosError(error)) {
            if (error.message === 'Network Error') {
                throw new axios.Cancel('Veuillez vérifier votre connexion internet.')
            }
            if (error.status === 403) {
                throw new axios.Cancel('Veuillez vous reconnecter')
            }
        }
        console.log(error)
        const message = error.response.data.error ? error.response.data.error : error.response.data.message

        throw new axios.Cancel(message)
    }

    // ajout de token authentification à l'header
    addHeaders(auth, customHeaders = {} , blob = false) {
        let config = {}
        const token = getToken()
        if (auth && token) {
            config = { headers: { Authorization: `Bearer ${token}` } }
        }
        config.headers = { ...config.headers, ...customHeaders }
        return config;
    }

    data_processing(res) {
        return res.status === 200 || res.status === 201 || res.status === 202 ? res : Promise.reject(res)
    }


    // utiliser pour les requetes get
    getCall = (url, auth = false, customHeaders = {}) => {
        let config = this.addHeaders(auth, customHeaders)
        
        return axios
            .get(url, config)
            .then((res) =>
                this.data_processing(res)
            )
            .then((res) => {
                return res.data
            })
            .catch((error) => {
                this.error_handling(error)
            })
    }

    // utiliser pour les requetes post
    postCall = (url, data, auth = false, customHeaders = {}) => {
        let config = this.addHeaders(auth, customHeaders)

        return axios
            .post(url, data, config)
            .then((res) =>
                this.data_processing(res)
            )
            .then((res) => res.data)
            .catch((error) => {
                this.error_handling(error)
            })
    }
    // utiliser pour les requetes post
    patchCall = (url, data, auth = false, customHeaders = {}) => {
        let config = this.addHeaders(auth, customHeaders)

        return axios
            .patch(url, data, config)
            .then((res) =>
                this.data_processing(res)
            )
            .then((res) => res.data)
            .catch((error) => {
                this.error_handling(error)
            })
    }


    // utiliser pour modifier
    putCall = (url, data, auth = false, customHeaders = {}) => {
        let config = this.addHeaders(auth, customHeaders)
        return axios
            .put(url, data, config)
            .then((res) =>
                this.data_processing(res)
            )
            .then((res) => res.data)
            .catch((error) => {
                this.error_handling(error)
            })
    }

    // utiliser pour supprimer
    deleteCall = (url, auth = false, customHeaders = {}) => {
        let config = this.addHeaders(auth, customHeaders)
        return axios
            .delete(url, config)
            .then((res) =>
                this.data_processing(res)
            )
            .then((res) => res.data)
            .catch((error) => {
                this.error_handling(error)
            })
    }
    getFile(url) {
        const header = {
            responseType: 'blob'
        }
        
        return axios.get(url, header)
            .then(response => {
                const url = URL.createObjectURL(response.data);
                return url
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

}