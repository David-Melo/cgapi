import { HookContext } from "../../app";
import { Testing } from "../../declarations";

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },

    after: {
        all: [],
        find: [],
        get: [], 
        create: [
            async ({ app, result }: HookContext<Testing>) => {
                await app.service('queue').create({
                    name: result.name,
                    data: result
                });
            }
        ],
        update: [],
        patch: [],
        remove: []
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};
