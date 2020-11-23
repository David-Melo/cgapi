import axios, { AxiosInstance } from 'axios';
import async, { AsyncQueue, ErrorCallback } from 'async';

const API_URL = `https://api.bridgedataoutput.com/api/v2/OData/miamire/Property/replication`;
const API_KEY = `2ace8212f26bb566cdd3d909a2fefaa1`;

type APIResponse = {
    '@odata.nextLink': string;
    '@odata.count': number;
    'value': any[]
}

type QueryReponse<T> = {
    next: string | null;
    count: number;
    data: T[]
}

type QueueTask = {
    page: number;
    url: string;
}

export default class APIService {

    api: AxiosInstance;
    queue: AsyncQueue<QueueTask>;

    constructor() {
        this.api =  axios.create({
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
    }
    
    startWork = async <T>(query: string): Promise<T[]> => {

        const self = this;
        let workData: T[] = [];

        self.queue = async.queue<QueueTask>(async (task: QueueTask, callback: ErrorCallback) => {

            try {
                
                let { next, count, data } = await self.runQuery<T>(task.url);
                
                if ( data.length ) {
                    workData = workData.concat(data);
                }

                if  ( count && next ) {
                    self.queue.push({
                        page: task.page + 1,
                        url: next
                    });
                }

                return callback();

            } catch (e) {
                return callback(e);
            }
            
        });

        return new Promise((resolve,reject)=>{

            self.queue.drain(()=>{
                return resolve(workData);
            });
     
            self.queue.error((error, task)=>{
                return reject(error);
            });
    
            self.queue.push({
                page: 1,
                url: `${API_URL}?${query}`
            });

        });
        
    }

    runQuery = async <T>(query: string): Promise<QueryReponse<T>>  => {
        try {
            let { data } = await this.api.get<APIResponse>(query);
            return {
                next: data["@odata.nextLink"] || null,
                count: data["@odata.count"],
                data: data.value
            };
        } catch (e: any) {
            return Promise.reject(e.response.data.message);
        }
    }

}