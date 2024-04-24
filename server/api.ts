import axios, {AxiosIntance} from "axios";

const api:AxiosIntance = axios.create({
    baseURL: 'http://localhost:3001/'
});

export default api; 