import { HookContext } from "../../app";

export default {
    before: {
        create: [
            async (context: HookContext) => {
                if (Array.isArray(context.data)){
                    context.data = context.data.map(listing=>{
                        return { objectID: listing.mls, ...listing };
                    })
                } else {
                    context.data.objectID = context.data.mls;
                    context.data.id = context.data.mls;
                }
            }
        ],
        update: [
            async (context: HookContext) => {
                if (Array.isArray(context.data)){
                    return Promise.reject(new Error('Can Only Update A Single Record'));
                } else if (!context.id) {
                    return Promise.reject(new Error('Missing Record ID'));
                } else {
                    context.data.objectID = context.id;
                    context.data.id = context.id;
                }
            }
        ],
        patch: [
            async (context: HookContext) => {
                if (Array.isArray(context.data)){
                    return Promise.reject(new Error('Can Only Patch A Single Record'));
                } else if (!context.id) {
                    return Promise.reject(new Error('Missing Record ID'));
                } else {
                    context.data.objectID = context.id;
                }
            }
        ],
        remove: [
            async (context: HookContext) => {
                if (!context.id) {
                    return Promise.reject(new Error('Missing Record ID'));
                } 
            }
        ]
    }
}