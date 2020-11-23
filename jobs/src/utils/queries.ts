export const RE1Query = `PropertyType eq 'Residential' and PropertySubType eq 'Single Family Residence'`;

export const RE2Query = `
    PropertyType eq 'Residential' and ( 
        PropertySubType eq 'Apartment' or 
        PropertySubType eq 'Condominium' or     
        PropertySubType eq 'Dockominium' or 
        PropertySubType eq 'Hotel/Motel' or 
        PropertySubType eq 'Mobile Home' or 
        PropertySubType eq 'Stock Cooperative' or
        PropertySubType eq 'Timeshare' or 
        PropertySubType eq 'Townhouse' or 
        PropertySubType eq 'Villa'
    )
`;

export const RNTQuery = `
    PropertyType eq 'Residential Lease' and (
        PropertySubType eq 'Villa' or 
        PropertySubType eq 'Townhouse' or 
        PropertySubType eq 'Stock Cooperative' or 
        PropertySubType eq 'Single Family Residence' or 
        PropertySubType eq 'Multi Family' or 
        PropertySubType eq 'Efficiency' or 
        PropertySubType eq 'Condominium' or 
        PropertySubType eq 'Apartment'
    )
`;

export const RINQuery = `
    PropertyType eq 'Residential Income' and ( 
        PropertySubType eq 'Duplex' or 
        PropertySubType eq 'Quadruplex' or 
        PropertySubType eq 'Multi Family' or 
        PropertySubType eq 'Triplex' or 
        PropertySubType eq 'Apartment' or 
        PropertySubType eq 'Condominium' or 
        PropertySubType eq 'Residential' or 
        PropertySubType eq 'Single Family Residence' or 
        PropertySubType eq 'Townhouse'    
    )
`;

export const COMQuery = `PropertyType eq 'Commercial Sale'`;

export const CLDQuery = `PropertyType eq 'Commercial Land'`;

export const RLDQuery = `PropertyType eq 'Land/Boat Docks'`;

export const BUSQuery = `PropertyType eq 'Business Opportunity'`;

export const CountyQuery = `
    (
        CountyOrParish eq 'Miami-Dade County' or
        CountyOrParish eq 'Broward County' or
        CountyOrParish eq 'Palm Beach County'
    )
`;

export const ActiveQuery = `
    (
        StandardStatus eq 'Active' or
        StandardStatus eq 'Active Under Contract' or
        StandardStatus eq 'Coming Soon'
    )
`;

export const InAtiveQuery = `
    (
        StandardStatus eq 'Canceled' or
        StandardStatus eq 'Closed' or
        StandardStatus eq 'Expired' or
        StandardStatus eq 'Hold' or
        StandardStatus eq 'Pending' or
        StandardStatus eq 'Withdrawn'
    )
`;

export const getDateQuery = (date: string): string => {
    return `date(ModificationTimestamp) eq ${date}`;
};

export const prepareQuery = (queries: string[], fields: (string[])[], limit: number,): string => {

    let queryArray = [];

    let filterArray = queries.map((query)=>{
        return query.replace(/\r?\n|\r/g, " ").replace(/\s+/g, ' ').trim()
    });

    queryArray.push(`$filter=${filterArray.join(' and ')}`);
    
    let fieldsArray = fields.reduce((fieldsArray, fieldsGroup)=>{
        return [...fieldsArray, ...fieldsGroup];
    },[]);

    queryArray.push(`$select=${fieldsArray.join(',')}`);

    queryArray.push(`$top=${limit}`);

    return queryArray.join('&');

}