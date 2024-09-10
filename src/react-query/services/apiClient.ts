import axios from "axios";

interface Entity{
    id:number | string;
}

const axiosInstance = axios.create({
     baseURL: 'https://jsonplaceholder.typicode.com'
});

class ApiClient<T extends Entity>{
    endpoint: string;

    constructor(endpoint: string){
     this.endpoint = endpoint;
    }

    getAll = () => {
     return axiosInstance.get<T[]>(this.endpoint)
     .then((res) => res.data);
    }

    getOne = (id: number | string) => {
        return axiosInstance.get<T>(this.endpoint + '/' + id)
        .then(res => res.data);
      }

    create = (data:T) => {
     return axiosInstance.post<T>(this.endpoint, data)
     .then((res) => res.data);
    }

    delete = (id:number) => {
        return axiosInstance.delete<T>(this.endpoint + "/" + id)
        .then((res) => res.data);
    }

    update = (data:T) => {
        return axiosInstance.patch<T>(this.endpoint+ "/" + data.id, data)
        .then((res) => res.data);
    }
}

export default ApiClient;