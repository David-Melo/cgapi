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
                let listingData = { sysid, mls, status, code };

                // Check If Listing Exists
                let listings = await context.app.service('listings').find({sysid: sysid}) as Paginated<Listing>;

                if ( listings.total >= 1) {

                    let id = listings.data[0].id;

                    let updatedListing = await context.app.service('listings').patch(id, listingData, { listing: context.data });

                    context.result = updatedListing;
                    context.params.listing = false;

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
        patch: [
            (context: HookContext) => {
                console.log('BeforePatch');
                //console.log(context.params.listing);
            }
        ],
        remove: []
    },

    after: {
        all: [],
        find: [],
        get: [], 
        create: [
            (context: HookContext) => {
                console.log('AfterCreate');
                console.log(context.params.listing);
            }
        ],
        update: [],
        patch: [
            (context: HookContext) => {
                console.log('AfterPatch');
                //console.log(context.params.listing);
            }
        ],
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
