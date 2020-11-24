import APIService from "./api";
import { ListingType, BUS, CLD, COM, RE1, RE2, RemoteBUS, RemoteCLD, RemoteCOM, RemoteRE1, RemoteRE2, RemoteRIN, RemoteRLD, RemoteRNT, RIN, RLD, RNT } from "../_types";
import { mapBUS, mapCLD, mapCOM, mapRE1, mapRE2, mapRIN, mapRLD, mapRNT } from "./mapping";
import { BUSFields, CLDFields, COMFields, GenericFields, RE1Fields, RE2Fields, RINFields, RLDFields, RNTFields } from "./fields";
import { ActiveQuery, BUSQuery, CLDQuery, COMQuery, CountyQuery, getDateQuery, prepareQuery, RE1Query, RE2Query, RINQuery, RLDQuery, RNTQuery } from "./queries";

export type QueryFunction = () => Promise<ListingType[]>

export const ProcessRE1Query: QueryFunction = async (): Promise<RE1[]> => {

    let query = prepareQuery([ActiveQuery, CountyQuery, RE1Query, getDateQuery('2020-11-22')], [GenericFields, RE1Fields], 10);
    
    const API = new APIService();

    try {

        let listings = await API.startWork<RemoteRE1>(query);
        return listings.map(l=>mapRE1(l));

    } catch (e) {
        return Promise.reject(e);
    }

}

export const ProcessRE2Query: QueryFunction = async (): Promise<RE2[]> => {

    let query = prepareQuery([ActiveQuery, CountyQuery, RE2Query, getDateQuery('2020-11-22')], [GenericFields, RE2Fields], 1000);
    
    const API = new APIService();

    try {

        let listings = await API.startWork<RemoteRE2>(query);
        return listings.map(l=>mapRE2(l));

    } catch (e) {
        return Promise.reject(e);
    }

}

export const ProcessRNTQuery: QueryFunction = async (): Promise<RNT[]> => {

    let query = prepareQuery([ActiveQuery, CountyQuery, RNTQuery, getDateQuery('2020-11-22')], [GenericFields, RNTFields], 1000);
    
    const API = new APIService();

    try {

        let listings = await API.startWork<RemoteRNT>(query);
        return listings.map(l=>mapRNT(l));

    } catch (e) {
        return Promise.reject(e);
    }

}

export const ProcessCOMQuery: QueryFunction = async (): Promise<COM[]> => {

    let query = prepareQuery([ActiveQuery, CountyQuery, COMQuery, getDateQuery('2020-11-22')], [GenericFields, COMFields], 1000);
    
    const API = new APIService();

    try {

        let listings = await API.startWork<RemoteCOM>(query);
        return listings.map(l=>mapCOM(l));

    } catch (e) {
        console.error(e);
    }

}

export const ProcessRINQuery: QueryFunction = async (): Promise<RIN[]> => {

    let query = prepareQuery([ActiveQuery, CountyQuery, RINQuery, getDateQuery('2020-11-22')], [GenericFields, RINFields], 1000);
    
    const API = new APIService();

    try {

        let listings = await API.startWork<RemoteRIN>(query);
        return listings.map(l=>mapRIN(l));

    } catch (e) {
        return Promise.reject(e);
    }

}

export const ProcessCLDQuery: QueryFunction = async (): Promise<CLD[]> => {

    let query = prepareQuery([ActiveQuery, CountyQuery, CLDQuery, getDateQuery('2020-11-22')], [GenericFields, CLDFields], 1000);
    
    const API = new APIService();

    try {

        let listings = await API.startWork<RemoteCLD>(query);
        return listings.map(l=>mapCLD(l));

    } catch (e) {
        return Promise.reject(e);
    }

}

export const ProcessRLDQuery: QueryFunction = async (): Promise<RLD[]> => {

    let query = prepareQuery([ActiveQuery, CountyQuery, RLDQuery, getDateQuery('2020-11-22')], [GenericFields, RLDFields], 1000);
    
    const API = new APIService();

    try {

        let listings = await API.startWork<RemoteRLD>(query);
        return listings.map(l=>mapRLD(l));

    } catch (e) {
        return Promise.reject(e);
    }

}

export const ProcessBUSQuery: QueryFunction = async (): Promise<BUS[]> => {

    let query = prepareQuery([ActiveQuery, CountyQuery, BUSQuery, getDateQuery('2020-11-22')], [GenericFields, BUSFields], 1000);
    
    const API = new APIService();

    try {

        let listings = await API.startWork<RemoteBUS>(query);
        return listings.map(l=>mapBUS(l));

    } catch (e) {
        return Promise.reject(e);
    }

}