import {
    RE1, RemoteRE1,
    RE2, RemoteRE2,
    RNT, RemoteRNT,
    COM, RemoteCOM,
    RIN, RemoteRIN,
    CLD, RemoteCLD,
    RLD, RemoteRLD,
    BUS, RemoteBUS, 
    Listing, 
    ListingCode,
} from "_types";

type RemoteItem = 
| RemoteRE1
| RemoteRE2
| RemoteRNT
| RemoteCOM
| RemoteRIN
| RemoteCLD
| RemoteRLD
| RemoteBUS

export const arrayHandler = (item: any): any[] => {
    if (typeof item === 'undefined') return [];
    if (typeof item === 'string') return [item];
    if (Array.isArray(item)) return item;
    if (typeof item === 'object') return Object.values(item);
    return [];
}

export const mapGenericFields = (item: RemoteItem, code: ListingCode, finance: Listing["finance"], parent: Listing["parent"]): Listing => {
    return {
        code,
        finance,
        parent,
        model: code,
        proptype: item.PropertySubType || item.PropertyType,
        sysid: item.ListingKey,
        mls: item.ListingId,
        folio: item.ParcelNumber,
        updated: item.ModificationTimestamp,
        description: item.PublicRemarks,
        price: item.ListPrice,
        year: item.YearBuilt,
        full_address: item.UnparsedAddress,
        address: [ item.StreetNumber, item.StreetDirPrefix || '', item.StreetName].join(' '),
        city: item.City,
        state: item.StateOrProvince,
        zip: item.PostalCode,
        county: item.CountyOrParish,
        office: item.ListOfficeName,
        images: item.Media.map(item=>item.MediaURL),
        _geoloc: {
            lat: item.Latitude,
            lng: item.Longitude
        }
    }
}

export const mapRE1 = (item: RemoteRE1): RE1 => {
    let genericFields = mapGenericFields(item, 'RE1', 'BUY', 'RES');
    return {
        ...genericFields,
        beds: item.BedroomsTotal,
        baths: item.BathroomsFull,
        living_area: item.LivingArea,
        cooling: item.Cooling,
        lot_area: item.LotSizeSquareFeet,
        pool: item.PoolPrivateYN,
        floors: item.Flooring,
        additional_rooms: [
            ...arrayHandler(item.RoomLivingRoomFeatures),
            ...arrayHandler(item.RoomDiningRoomFeatures), 
            ...arrayHandler(item.RoomBedroomFeatures), 
            ...arrayHandler(item.RoomMasterBathroomFeatures)
            ].filter(i=>i!=='None'&&i!=='Other'),
        features: [
            ...arrayHandler(item.InteriorFeatures), 
            ...arrayHandler(item.LaundryFeatures), 
            ...arrayHandler(item.WindowFeatures), 
            ...arrayHandler(item.SecurityFeatures)
            ].filter(i=>i!=='None'&&i!=='Other'),
        appliances: item.Appliances,
        design: item.ArchitecturalStyle,
        external_features: [
            ...arrayHandler(item.ExteriorFeatures), 
            ...arrayHandler(item.Fencing), 
            ...arrayHandler(item.PatioAndPorchFeatures), 
            ...arrayHandler(item.PoolFeatures), 
            ...arrayHandler(item.WaterfrontFeatures), 
            ...arrayHandler(item.CommunityFeatures)
            ].filter(i=>i!=='None'&&i!=='Other'),
        parking_type: item.ParkingFeatures,
        parking_spaces: item.GarageSpaces,
        lots: item.LotFeatures,
        association: item.MIAMIRE_TypeofAssociation,
        association_fee: item.AssociationFee
    };
}

export const mapRE2 = (item: RemoteRE2): RE2 => {
    let genericFields = mapGenericFields(item, 'RE2', 'BUY', 'RES');
    return {
        ...genericFields,
        beds: item.BedroomsTotal,
        baths: item.BathroomsFull,
        living_area: item.LivingArea,
        cooling: item.Cooling,
        floors: item.Flooring,
        type: [item.MIAMIRE_Style || null, ...arrayHandler(item.View)].filter(i=>i!==null),
        amenities: [
            ...arrayHandler(item.AssociationAmenities), 
            ...arrayHandler(item.MIAMIRE_MaintenanceIncludes), 
            ...arrayHandler(item.CommunityFeatures)
        ],
        additional_rooms: [
            ...arrayHandler(item.RoomLivingRoomFeatures), 
            ...arrayHandler(item.RoomDiningRoomFeatures), 
            ...arrayHandler(item.RoomBedroomFeatures), 
            ...arrayHandler(item.RoomMasterBathroomFeatures)
            ].filter(i=>i!=='None'&&i!=='Other'),
        features: [
            ...arrayHandler(item.InteriorFeatures), 
            ...arrayHandler(item.LaundryFeatures), 
            ...arrayHandler(item.WindowFeatures), 
            ...arrayHandler(item.SecurityFeatures)
            ].filter(i=>i!=='None'&&i!=='Other'),
        appliances: item.Appliances,
        design: item.ArchitecturalStyle,
        external_features: [
            ...arrayHandler(item.ExteriorFeatures), 
            ...arrayHandler(item.Fencing), 
            ...arrayHandler(item.PatioAndPorchFeatures), 
            ...arrayHandler(item.PoolFeatures), 
            ...arrayHandler(item.WaterfrontFeatures), 
            ...arrayHandler(item.CommunityFeatures)
            ].filter(i=>i!=='None'&&i!=='Other'),
        parking_type: item.ParkingFeatures,
        parking_spaces: item.GarageSpaces,
        association: item.MIAMIRE_TypeofAssociation,
        association_fee: item.AssociationFee,
        security: [
            ...item.SecurityFeatures
        ]
    }
}

export const mapRNT = (item: RemoteRNT): RNT => {
    let genericFields = mapGenericFields(item, 'RNT', 'RNT', 'RES');
    return {
        ...genericFields,
        beds: item.BedroomsTotal,
        baths: item.BathroomsFull,
        living_area: item.LivingArea,
        cooling: item.Cooling,
        floors: item.Flooring,
        type: [item.MIAMIRE_Style || null, ...arrayHandler(item.View)].filter(i=>i!==null),
        additional_rooms: [
            ...arrayHandler(item.RoomLivingRoomFeatures), 
            ...arrayHandler(item.RoomDiningRoomFeatures), 
            ...arrayHandler(item.RoomBedroomFeatures), 
            ...arrayHandler(item.RoomMasterBathroomFeatures)
            ].filter(i=>i!=='None'&&i!=='Other'),
        features: [
            ...arrayHandler(item.InteriorFeatures), 
            ...arrayHandler(item.LaundryFeatures), 
            ...arrayHandler(item.WindowFeatures), 
            ...arrayHandler(item.SecurityFeatures)
            ].filter(i=>i!=='None'&&i!=='Other'),
        appliances: item.Appliances,
        design: item.ArchitecturalStyle,
        external_features: [
            ...arrayHandler(item.ExteriorFeatures), 
            ...arrayHandler(item.Fencing), 
            ...arrayHandler(item.PatioAndPorchFeatures), 
            ...arrayHandler(item.PoolFeatures), 
            ...arrayHandler(item.WaterfrontFeatures), 
            ...arrayHandler(item.CommunityFeatures), 
            ...arrayHandler(item.MIAMIRE_SubdivisionInformation)
        ].filter(i=>i!=='None'&&i!=='Other'),
        parking_type: item.ParkingFeatures,
        parking_spaces: item.GarageSpaces,
        amenities: [
            ...arrayHandler(item.AssociationAmenities), 
            ...arrayHandler(item.MIAMIRE_MaintenanceIncludes), 
            ...arrayHandler(item.CommunityFeatures)
        ],
        rentperiod: item.LeaseAmountFrequency,
        available: item.AvailabilityDate,
        furnished: item.Furnished,
        minlease: item.LeaseTerm
    }
}

export const mapCOM = (item: RemoteCOM): COM => {
    let genericFields = mapGenericFields(item, 'COM', 'BUY', 'COM');
    return {
        ...genericFields,
        type: item.BusinessType
    }
}

export const mapRIN = (item: RemoteRIN): RIN => {
    let genericFields = mapGenericFields(item, 'RIN', 'BUY', 'RES');
    return {
        ...genericFields,
        beds: item.BedroomsTotal,
        baths: item.BathroomsFull,
        living_area: item.LivingArea,
        cooling: item.Cooling,
        lot_area: item.LotSizeSquareFeet,
        floors: item.Flooring,
        additional_rooms: [
            ...arrayHandler(item.RoomLivingRoomFeatures), 
            ...arrayHandler(item.RoomDiningRoomFeatures), 
            ...arrayHandler(item.RoomBedroomFeatures), 
            ...arrayHandler(item.RoomMasterBathroomFeatures)
            ].filter(i=>i!=='None'&&i!=='Other'),
        features: [
            ...arrayHandler(item.InteriorFeatures), 
            ...arrayHandler(item.LaundryFeatures), 
            ...arrayHandler(item.WindowFeatures), 
            ...arrayHandler(item.SecurityFeatures)
            ].filter(i=>i!=='None'&&i!=='Other'),
        appliances: item.Appliances,
        design: item.ArchitecturalStyle,
        external_features: [
            ...arrayHandler(item.ExteriorFeatures), 
            ...arrayHandler(item.Fencing), 
            ...arrayHandler(item.PatioAndPorchFeatures), 
            ...arrayHandler(item.PoolFeatures), 
            ...arrayHandler(item.WaterfrontFeatures), 
            ...arrayHandler(item.CommunityFeatures)
         ].filter(i=>i!=='None'&&i!=='Other'),
        parking_type: item.ParkingFeatures,
        parking_spaces: item.GarageSpaces,
        lots: item.LotFeatures,
        association: item.MIAMIRE_TypeofAssociation,
        association_fee: item.AssociationFee
    }
}

export const mapCLD = (item: RemoteCLD): CLD => {
    let genericFields = mapGenericFields(item, 'CLD', 'BUY', 'COM');
    return {
        ...genericFields,
        usage: [
            ...arrayHandler(item.CurrentUse), 
            ...arrayHandler(item.PossibleUse), 
            ...arrayHandler(item.BusinessType)
        ],
        acres: item.LotSizeAcres,
        utilities: item.Utilities
    }
}

export const mapRLD = (item: RemoteRLD): RLD => {
    let genericFields = mapGenericFields(item, 'RLD', 'BUY', 'RES');
    return {
        ...genericFields,
        usage: [
            ...arrayHandler(item.DevelopmentStatus), 
            ...arrayHandler(item.CurrentUse), 
            ...arrayHandler(item.PossibleUse), 
            ...arrayHandler(item.BusinessType)
        ],
        acres: item.LotSizeAcres,
        utilities: item.Utilities
    }
}

export const mapBUS = (item: RemoteBUS): BUS => {
    let genericFields = mapGenericFields(item, 'BUS', 'BUY', 'COM');
    return {
        ...genericFields,
        type: item.BusinessType,
        years_active: 2021 - item.YearEstablished,
        year_established: item.YearEstablished
    }
}