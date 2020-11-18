declare module 'throng' {

    function throng(startOrOptions: throng.ProcessCallback | throng.LegacyOptions | throng.WorkerCallback | throng.Options): void;
    function throng(workers: throng.WorkerCount, start: throng.ProcessCallback): void;
    
    namespace throng {
        type WorkerCount = number | string;
        type ProcessCallback = (id: number) => any;
        type WorkerCallback = (id: number, disconnect: () => any) => any;
    
        interface Options {
          worker: WorkerCallback;
          master?: () => any;
          count?: number;
          lifetime?: number;
          grace?: number;
          signals?: string[];
        }
    
        interface LegacyOptions {
            grace?: number;
            lifetime?: number;
            master?: ProcessCallback;
            start: ProcessCallback;
            workers?: WorkerCount;
        }
    }
    
    export = throng;

}
