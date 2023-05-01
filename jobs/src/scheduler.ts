
import { Queue } from 'bullmq';

const QueueDailySchedule = () => {

    const QueryQueue = new Queue('queries', {
        connection: {
            connectionName: 'QueryDispatcher',
            name: 'QueryDispatcher',
            host: 'api.canerogroup.com',
            port: 2023,
            password: 'cgredis90008264a'
        }
    });

    QueryQueue.add( 'DailyQuerySyncCleanup', { code: 'CLEANUP', type: 'daily', mode: 'delete' }, { repeat: { cron: '0 0 1 * * *' } } );
    QueryQueue.add( 'DailyQuerySyncRE1', { code: 'RE1', type: 'daily', mode: 'insert' }, { repeat: { cron: '0 10 1 * * *' } } );
    QueryQueue.add( 'DailyQuerySyncRE2', { code: 'RE2', type: 'daily', mode: 'insert' }, { repeat: { cron: '0 20 1 * * *' } } );
    QueryQueue.add( 'DailyQuerySyncRNT', { code: 'RNT', type: 'daily', mode: 'insert' }, { repeat: { cron: '0 30 1 * * *' } } );
    QueryQueue.add( 'DailyQuerySyncCOM', { code: 'COM', type: 'daily', mode: 'insert' }, { repeat: { cron: '0 35 1 * * *' } } );
    QueryQueue.add( 'DailyQuerySyncCLD', { code: 'CLD', type: 'daily', mode: 'insert' }, { repeat: { cron: '0 40 1 * * *' } } );
    QueryQueue.add( 'DailyQuerySyncRLD', { code: 'RLD', type: 'daily', mode: 'insert' }, { repeat: { cron: '0 45 1 * * *' } } );
    QueryQueue.add( 'DailyQuerySyncBUS', { code: 'BUS', type: 'daily', mode: 'insert' }, { repeat: { cron: '0 50 1 * * *' } } );
    QueryQueue.add( 'DailyQuerySyncRIN', { code: 'RIN', type: 'daily', mode: 'insert' }, { repeat: { cron: '0 55 1 * * *' } } );

};

QueueDailySchedule()
