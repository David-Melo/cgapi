import APIService from "./api";
import { ListingType, BUS, CLD, COM, RE1, RE2, RemoteBUS, RemoteCLD, RemoteCOM, RemoteRE1, RemoteRE2, RemoteRIN, RemoteRLD, RemoteRNT, RIN, RLD, RNT, RemoteListingID, ListingID } from "../_types";
import { mapBUS, mapCLD, mapCOM, mapIDFields, mapRE1, mapRE2, mapRIN, mapRLD, mapRNT } from "./mapping";
import { BUSFields, CLDFields, COMFields, GenericFields, IDFields, RE1Fields, RE2Fields, RINFields, RLDFields, RNTFields } from "./fields";
import { ActiveQuery, BUSQuery, CLDQuery, COMQuery, CountyQuery, getDateQuery, InAtiveQuery, prepareQuery, RE1Query, RE2Query, RINQuery, RLDQuery, RNTQuery } from "./queries";

const QUERY_PAGE_SIZE = 2000;

export type QueryFunction = (dateToQuery?: string) => Promise<ListingType[]>

// General Daily Queries
export const ProcessCleanUpQuery: QueryFunction = async (dateToQuery): Promise<ListingID[]> => {

    let query = prepareQuery([InAtiveQuery, CountyQuery, getDateQuery(dateToQuery)], [IDFields], QUERY_PAGE_SIZE);
    
    const API = new APIService();

    try {

        let listings = await API.startWork<RemoteListingID>(query);
        return listings.map(l=>mapIDFields(l));

    } catch (e) {
        return Promise.reject(e);
    }

}

// General Daily Queries
export const ProcessRE1Query: QueryFunction = async (dateToQuery): Promise<RE1[]> => {

    let query = prepareQuery([ActiveQuery, CountyQuery, RE1Query, getDateQuery(dateToQuery)], [GenericFields, RE1Fields], 10);
    
    const API = new APIService();

    try {

        let listings = await API.startWork<RemoteRE1>(query);
        return listings.map(l=>mapRE1(l));

    } catch (e) {
        return Promise.reject(e);
    }

}

export const ProcessRE2Query: QueryFunction = async (dateToQuery): Promise<RE2[]> => {

    let query = prepareQuery([ActiveQuery, CountyQuery, RE2Query, getDateQuery(dateToQuery)], [GenericFields, RE2Fields], QUERY_PAGE_SIZE);
    
    const API = new APIService();

    try {

        let listings = await API.startWork<RemoteRE2>(query);
        return listings.map(l=>mapRE2(l));

    } catch (e) {
        return Promise.reject(e);
    }

}

export const ProcessRNTQuery: QueryFunction = async (dateToQuery): Promise<RNT[]> => {

    let query = prepareQuery([ActiveQuery, CountyQuery, RNTQuery, getDateQuery(dateToQuery)], [GenericFields, RNTFields], QUERY_PAGE_SIZE);
    
    const API = new APIService();

    try {

        let listings = await API.startWork<RemoteRNT>(query);
        return listings.map(l=>mapRNT(l));

    } catch (e) {
        return Promise.reject(e);
    }

}

export const ProcessCOMQuery: QueryFunction = async (dateToQuery): Promise<COM[]> => {

    let query = prepareQuery([ActiveQuery, CountyQuery, COMQuery, getDateQuery(dateToQuery)], [GenericFields, COMFields], QUERY_PAGE_SIZE);
    
    const API = new APIService();

    try {

        let listings = await API.startWork<RemoteCOM>(query);
        return listings.map(l=>mapCOM(l));

    } catch (e) {
        console.error(e);
    }

}

export const ProcessRINQuery: QueryFunction = async (dateToQuery): Promise<RIN[]> => {

    let query = prepareQuery([ActiveQuery, CountyQuery, RINQuery, getDateQuery(dateToQuery)], [GenericFields, RINFields], QUERY_PAGE_SIZE);
    
    const API = new APIService();

    try {

        let listings = await API.startWork<RemoteRIN>(query);
        return listings.map(l=>mapRIN(l));

    } catch (e) {
        return Promise.reject(e);
    }

}

export const ProcessCLDQuery: QueryFunction = async (dateToQuery): Promise<CLD[]> => {

    let query = prepareQuery([ActiveQuery, CountyQuery, CLDQuery, getDateQuery(dateToQuery)], [GenericFields, CLDFields], QUERY_PAGE_SIZE);
    
    const API = new APIService();

    try {

        let listings = await API.startWork<RemoteCLD>(query);
        return listings.map(l=>mapCLD(l));

    } catch (e) {
        return Promise.reject(e);
    }

}

export const ProcessRLDQuery: QueryFunction = async (dateToQuery): Promise<RLD[]> => {

    let query = prepareQuery([ActiveQuery, CountyQuery, RLDQuery, getDateQuery(dateToQuery)], [GenericFields, RLDFields], QUERY_PAGE_SIZE);
    
    const API = new APIService();

    try {

        let listings = await API.startWork<RemoteRLD>(query);
        return listings.map(l=>mapRLD(l));

    } catch (e) {
        return Promise.reject(e);
    }

}

export const ProcessBUSQuery: QueryFunction = async (dateToQuery): Promise<BUS[]> => {

    let query = prepareQuery([ActiveQuery, CountyQuery, BUSQuery, getDateQuery(dateToQuery)], [GenericFields, BUSFields], QUERY_PAGE_SIZE);
    
    const API = new APIService();

    try {

        let listings = await API.startWork<RemoteBUS>(query);
        return listings.map(l=>mapBUS(l));

    } catch (e) {
        return Promise.reject(e);
    }

}

// OneTime BackLog Queries
export const ProcessRE1QueryBacklog: QueryFunction = async (): Promise<RE1[]> => {

    let query = prepareQuery([ActiveQuery, CountyQuery, RE1Query], [GenericFields, RE1Fields], QUERY_PAGE_SIZE);
    
    const API = new APIService();

    try {

        let listings = await API.startWork<RemoteRE1>(query);
        return listings.map(l=>mapRE1(l));

    } catch (e) {
        return Promise.reject(e);
    }

}

export const ProcessRE2QueryBacklog: QueryFunction = async (): Promise<RE2[]> => {

    let query = prepareQuery([ActiveQuery, CountyQuery, RE2Query], [GenericFields, RE2Fields], QUERY_PAGE_SIZE);
    
    const API = new APIService();

    try {

        let listings = await API.startWork<RemoteRE2>(query);
        return listings.map(l=>mapRE2(l));

    } catch (e) {
        return Promise.reject(e);
    }

}

export const ProcessRNTQueryBacklog: QueryFunction = async (): Promise<RNT[]> => {

    let query = prepareQuery([ActiveQuery, CountyQuery, RNTQuery], [GenericFields, RNTFields], QUERY_PAGE_SIZE);
    
    const API = new APIService();

    try {

        let listings = await API.startWork<RemoteRNT>(query);
        return listings.map(l=>mapRNT(l));

    } catch (e) {
        return Promise.reject(e);
    }

}

export const ProcessCOMQueryBacklog: QueryFunction = async (): Promise<COM[]> => {

    let query = prepareQuery([ActiveQuery, CountyQuery, COMQuery], [GenericFields, COMFields], QUERY_PAGE_SIZE);
    
    const API = new APIService();

    try {

        let listings = await API.startWork<RemoteCOM>(query);
        return listings.map(l=>mapCOM(l));

    } catch (e) {
        console.error(e);
    }

}

export const ProcessRINQueryBacklog: QueryFunction = async (): Promise<RIN[]> => {

    let query = prepareQuery([ActiveQuery, CountyQuery, RINQuery], [GenericFields, RINFields], QUERY_PAGE_SIZE);
    
    const API = new APIService();

    try {

        let listings = await API.startWork<RemoteRIN>(query);
        return listings.map(l=>mapRIN(l));

    } catch (e) {
        return Promise.reject(e);
    }

}

export const ProcessCLDQueryBacklog: QueryFunction = async (): Promise<CLD[]> => {

    let query = prepareQuery([ActiveQuery, CountyQuery, CLDQuery], [GenericFields, CLDFields], QUERY_PAGE_SIZE);
    
    const API = new APIService();

    try {

        let listings = await API.startWork<RemoteCLD>(query);
        return listings.map(l=>mapCLD(l));

    } catch (e) {
        return Promise.reject(e);
    }

}

export const ProcessRLDQueryBacklog: QueryFunction = async (): Promise<RLD[]> => {

    let query = prepareQuery([ActiveQuery, CountyQuery, RLDQuery], [GenericFields, RLDFields], QUERY_PAGE_SIZE);
    
    const API = new APIService();

    try {

        let listings = await API.startWork<RemoteRLD>(query);
        return listings.map(l=>mapRLD(l));

    } catch (e) {
        return Promise.reject(e);
    }

}

export const ProcessBUSQueryBacklog: QueryFunction = async (): Promise<BUS[]> => {

    let query = prepareQuery([ActiveQuery, CountyQuery, BUSQuery], [GenericFields, BUSFields], QUERY_PAGE_SIZE);
    
    const API = new APIService();

    try {

        let listings = await API.startWork<RemoteBUS>(query);
        return listings.map(l=>mapBUS(l));

    } catch (e) {
        return Promise.reject(e);
    }

}