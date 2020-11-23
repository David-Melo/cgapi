import { RemoteBUS, RemoteCLD, RemoteCOM, RemoteRE1, RemoteRE2, RemoteRIN, RemoteRLD, RemoteRNT } from "_types";
import APIService from "./utils/api";
import { mapBUS, mapCLD, mapCOM, mapRE1, mapRE2, mapRIN, mapRLD, mapRNT } from "./utils/mapping";
import { BUSFields, CLDFields, COMFields, GenericFields, RE1Fields, RE2Fields, RINFields, RLDFields, RNTFields } from "./utils/fields";
import { ActiveQuery, BUSQuery, CLDQuery, COMQuery, CountyQuery, getDateQuery, prepareQuery, RE1Query, RE2Query, RINQuery, RLDQuery, RNTQuery } from "./utils/queries";

const ProcessRE1Query = async () => {

    let query = prepareQuery([ActiveQuery, CountyQuery, RE1Query, getDateQuery('2020-11-22')], [GenericFields, RE1Fields], 1000);
    
    const API = new APIService();

    try {

        let data = await API.startWork<RemoteRE1>(query);
        console.log(data.length);
        console.log(mapRE1(data[1]));

    } catch (e) {
        console.error(e);
    }

}

const ProcessRE2Query = async () => {

    let query = prepareQuery([ActiveQuery, CountyQuery, RE2Query, getDateQuery('2020-11-22')], [GenericFields, RE2Fields], 1000);
    
    const API = new APIService();

    try {

        let data = await API.startWork<RemoteRE2>(query);
        console.log(data.length);
        console.log(mapRE2(data[1]));

    } catch (e) {
        console.error(e);
    }

}

const ProcessRNTQuery = async () => {

    let query = prepareQuery([ActiveQuery, CountyQuery, RNTQuery, getDateQuery('2020-11-22')], [GenericFields, RNTFields], 1000);
    
    const API = new APIService();

    try {

        let data = await API.startWork<RemoteRNT>(query);
        console.log(data.length);
        console.log(mapRNT(data[1]));

    } catch (e) {
        console.error(e);
    }

}

const ProcessCOMQuery = async () => {

    let query = prepareQuery([ActiveQuery, CountyQuery, COMQuery, getDateQuery('2020-11-22')], [GenericFields, COMFields], 1000);
    
    const API = new APIService();

    try {

        let data = await API.startWork<RemoteCOM>(query);
        console.log(data.length);
        console.log(mapCOM(data[1]));

    } catch (e) {
        console.error(e);
    }

}

const ProcessRINQuery = async () => {

    let query = prepareQuery([ActiveQuery, CountyQuery, RINQuery, getDateQuery('2020-11-22')], [GenericFields, RINFields], 1000);
    
    const API = new APIService();

    try {

        let data = await API.startWork<RemoteRIN>(query);
        console.log(data.length);
        console.log(mapRIN(data[1]));

    } catch (e) {
        console.error(e);
    }

}

const ProcessCLDQuery = async () => {

    let query = prepareQuery([ActiveQuery, CountyQuery, CLDQuery, getDateQuery('2020-11-22')], [GenericFields, CLDFields], 1000);
    
    const API = new APIService();

    try {

        let data = await API.startWork<RemoteCLD>(query);
        console.log(data.length);
        console.log(mapCLD(data[1]));

    } catch (e) {
        console.error(e);
    }

}

const ProcessRLDQuery = async () => {

    let query = prepareQuery([ActiveQuery, CountyQuery, RLDQuery, getDateQuery('2020-11-22')], [GenericFields, RLDFields], 1000);
    
    const API = new APIService();

    try {

        let data = await API.startWork<RemoteRLD>(query);
        console.log(data.length);
        console.log(mapRLD(data[1]));

    } catch (e) {
        console.error(e);
    }

}

const ProcessBUSQuery = async () => {

    let query = prepareQuery([ActiveQuery, CountyQuery, BUSQuery, getDateQuery('2020-11-22')], [GenericFields, BUSFields], 1000);
    
    const API = new APIService();

    try {

        let data = await API.startWork<RemoteBUS>(query);
        console.log(data.length);
        console.log(mapBUS(data[3]));

    } catch (e) {
        console.error(e);
    }

}

ProcessRLDQuery();