import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: 'https://35.226.139.9'
    })
}