import { Paginated } from "@feathersjs/feathers";
import { HookContext } from "../../app";
import { Listing } from "./listings.service";

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [
            async (context: HookContext) => {

                // Get Listing MetaData
                let { sysid, mls, status, code } = context.data;
                
                // Check If Listing Exists
                let listings = await context.app.service('listings').find({ query: { sysid: sysid } }) as Paginated<Listing>;

                if ( listings.total === 1) {

                    let id = listings.data[0].id;

                    let updatedListing = await context.app.service('listings').patch(id, { status }, { listing: context.data });

                    context.result = updatedListing;
                    context.params.listing = false;

                } 
                else if ( listings.total > 1) {
                    return Promise.reject(new Error(`Conflicting SYSID (Multiple Matches) [${sysid}]`));
                } else {

                    // Set Request Params To Store Full Listing
                    context.params.listing = context.data;

                    // Set Data Object For Create Action
                    context.data = {
                        sysid,
                        mls,
                        status,
                        code
                    }

                }

            }
        ],
        update: [],
        patch: [],
        remove: []
    },

    after: {
        all: [],
        find: [],
        get: [], 
        create: [
            async (context: HookContext) => {
                if (context.params.listing) {
                    let listing = context.params.listing;
                    if (listing._geoloc.lat === null || listing._geoloc.lng === null) {
                        listing._geoloc = null
                    }
                    context.result = await context.app.service('algolia').create(listing);
                }
            }
        ],
        update: [],
        patch: [
            async (context: HookContext) => {
                if (context.params.listing) {
                    let listing = context.params.listing;
                    if (listing._geoloc.lat === null || listing._geoloc.lng === null) {
                        listing._geoloc = null
                    }
                    context.result = await context.app.service('algolia').update(listing.mls, listing);
                }
            }
        ],
        remove: [
            async (context: HookContext) => {
                context.result = await context.app.service('algolia').remove(context.params.query.mls);
            }
        ]
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
