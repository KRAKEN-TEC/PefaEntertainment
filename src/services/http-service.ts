import apiPefa from "./api-pefa";

class HttpService {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint
    }

    get<T>() {
        return apiPefa.get<T>(this.endpoint)
    }

    post<T>(entity: T) {
        return apiPefa.post(this.endpoint, entity)
    }

    put<T>(_id: string, entity: T) {
        return apiPefa.put(this.endpoint + '/' + _id, entity)
    }

    delete(_id: string) {
        return apiPefa.delete(this.endpoint + '/' + _id)
    }
}


const create = (endpoint: string) => new HttpService(endpoint);

export default create
