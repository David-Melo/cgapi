import { Queue } from 'bullmq';

const QueueBacklogSync = () => {

    const QueryQueue = new Queue('queries', {
        connection: {
            connectionName: 'QueryDispatcher',
            name: 'QueryDispatcher',
            host: 'api.canerogroup.com',
            port: 2023,
            password: 'cgredis90008264a'
        }
    });

    QueryQueue.add( 'BackLogQuerySyncRE1', { code: 'RE1', type: "single", mode: 'insert' } );
    QueryQueue.add( 'BackLogQuerySyncRE2', { code: 'RE2', type: "single", mode: 'insert' } );
    QueryQueue.add( 'BackLogQuerySyncRNT', { code: 'RNT', type: "single", mode: 'insert' } );
    QueryQueue.add( 'BackLogQuerySyncCOM', { code: 'COM', type: "single", mode: 'insert' } );
    QueryQueue.add( 'BackLogQuerySyncCLD', { code: 'CLD', type: "single", mode: 'insert' } );
    QueryQueue.add( 'BackLogQuerySyncRLD', { code: 'RLD', type: "single", mode: 'insert' } );
    QueryQueue.add( 'BackLogQuerySyncBUS', { code: 'BUS', type: "single", mode: 'insert' } );
    QueryQueue.add( 'BackLogQuerySyncRIN', { code: 'RIN', type: "single", mode: 'insert' } );

};

QueueBacklogSync()
