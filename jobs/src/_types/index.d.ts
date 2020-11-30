export type ListingCode = 'CLEANUP' | 'RE1' | 'RE2' | 'RNT' | 'COM' | 'CLD' | 'RLD' | 'BUS' | 'RIN'

export type RemoteListingID = {
    PropertyType: string;
    PropertySubType: string;
    StandardStatus: string;
    ListingKey: string;
    ListingId: string;
}

export type RemoteListing = {
    PropertyType: string;
    PropertySubType: string;
    StandardStatus: string;
    ListingKey: string;
    ListingId: string;
    ParcelNumber: string | null;
    ModificationTimestamp: string;
    PublicRemarks: string | null;
    ListPrice: number | null;
    YearBuilt: number | null;
    UnparsedAddress: string | null;
    StreetNumber: string | null;
    StreetDirPrefix: string | null;
    StreetName: string | null;
    City: string | null;
    StateOrProvince: string | null;
    PostalCode: string | null;
    CountyOrParish: string | null;
    ListOfficeName: string | null;
    Latitude: number;
    Longitude: number;
    Media: {
        MediaURL: string;
    }[]
}

export type RemoteRE1Listing = {
    BedroomsTotal: number | null;
    BathroomsFull: number | null;
    LivingArea: number | null;
    Cooling: string[];
    LotSizeSquareFeet: number | null;
    PoolPrivateYN: boolean;
    Flooring: string[];
    RoomLivingRoomFeatures: string[];
    RoomDiningRoomFeatures: string[];
    RoomBedroomFeatures: string[];
    RoomMasterBathroomFeatures: string[];
    InteriorFeatures: string[];
    LaundryFeatures: string[];
    WindowFeatures: string[];
    SecurityFeatures: string[];
    Appliances: string[];
    ArchitecturalStyle: string[];
    ExteriorFeatures: string[];
    Fencing: string[];
    PatioAndPorchFeatures: string[];
    PoolFeatures: string[];
    WaterfrontFeatures: string[];
    CommunityFeatures: string[];
    ParkingFeatures: string[];
    GarageSpaces: number | null;
    LotFeatures: string[];
    MIAMIRE_TypeofAssociation: string[];
    AssociationFee: number | null;
}
export type RemoteRE1 = RemoteListing & RemoteRE1Listing;

export type RemoteRE2Listing = {
    BedroomsTotal: number | null;
    BathroomsFull: number | null;
    LivingArea: number | null;
    Cooling: string[] | null;
    View: string[] | null;
    MIAMIRE_Style: string | null;
    SecurityFeatures: string[];
    Amenities: string[];
    AssociationAmenities: string[];
    MIAMIRE_MaintenanceIncludes: string[];
    CommunityFeatures: string[];
    MIAMIRE_TypeofAssociation: string[];
    AssociationFee: number | null;
    Flooring: string[];
    RoomLivingRoomFeatures: string[];
    RoomDiningRoomFeatures: string[];
    RoomBedroomFeatures: string[];
    RoomMasterBathroomFeatures: string[];
    InteriorFeatures: string[];
    LaundryFeatures: string[];
    WindowFeatures: string[];
    Appliances: string[];
    ArchitecturalStyle: string[];
    ExteriorFeatures: string[];
    Fencing: string[];
    PatioAndPorchFeatures: string[];
    PoolFeatures: string[];
    WaterfrontFeatures: string[];
    ParkingFeatures: string[];
    GarageSpaces: number | null;
}
export type RemoteRE2 = RemoteListing & RemoteRE2Listing;

export type RemoteRNTListing = {
    BedroomsTotal: number | null;
    BathroomsFull: number | null;
    LivingArea: number | null;
    Cooling: string[];
    InteriorFeatures: string[];
    LaundryFeatures: string[];
    WindowFeatures: string[];
    SecurityFeatures: string[];
    LeaseAmountFrequency: string | null;
    AvailabilityDate: string | null;
    Furnished: string | null;
    MIAMIRE_Style: string | null;
    LeaseTerm: string | null;
    ExteriorFeatures: string[];
    Fencing: string[];
    PatioAndPorchFeatures: string[];
    PoolFeatures: string[];
    WaterfrontFeatures: string[];
    CommunityFeatures: string[];
    MIAMIRE_SubdivisionInformation: string[];
    Flooring: string[];
    RoomLivingRoomFeatures: string[];
    RoomDiningRoomFeatures: string[];
    RoomBedroomFeatures: string[];
    RoomMasterBathroomFeatures: string[];
    ArchitecturalStyle: string[];
    View: string[] | null;
    AssociationAmenities: string[];
    MIAMIRE_MaintenanceIncludes: string[];
    Appliances: string[];
    ParkingFeatures: string[];
    GarageSpaces: number | null;
}
export type RemoteRNT = RemoteListing & RemoteRNTListing;

export type RemoteCOMListing = {
    CurrentUse: string[];
    PossibleUse: string[];
    BusinessType: string[];
}
export type RemoteCOM = RemoteListing & RemoteCOMListing;

export type RemoteCLDListing = {
    PossibleUse: string[];
    BusinessType: string[];
    CurrentUse: string[];
    LotSizeAcres: number | null;
    Utilities: string[];
}
export type RemoteCLD = RemoteListing & RemoteCLDListing;

export type RemoteRLDListing = {
    DevelopmentStatus: string[];
    CurrentUse: string[];
    PossibleUse: string[];
    BusinessType: string[];
    LotSizeAcres: number | null;
    Utilities: string[];
}
export type RemoteRLD = RemoteListing & RemoteRLDListing;

export type RemoteBUSListing = {
    BusinessType: string[];
    YearEstablished: number | null;
}
export type RemoteBUS = RemoteListing & RemoteBUSListing;

export type RemoteRINListing = {
    BedroomsTotal: number | null;
    BathroomsFull: number | null;
    LivingArea: number | null;
    Cooling: string[];
    LotSizeSquareFeet: number | null;
    PoolPrivateYN: boolean;
    Flooring: string[];
    RoomLivingRoomFeatures: string[];
    RoomDiningRoomFeatures: string[];
    RoomBedroomFeatures: string[];
    RoomMasterBathroomFeatures: string[];
    InteriorFeatures: string[];
    LaundryFeatures: string[];
    WindowFeatures: string[];
    SecurityFeatures: string[];
    Appliances: string[];
    ArchitecturalStyle: string[];
    ExteriorFeatures: string[];
    Fencing: string[];
    PatioAndPorchFeatures: string[];
    PoolFeatures: string[];
    WaterfrontFeatures: string[];
    CommunityFeatures: string[];
    ParkingFeatures: string[];
    GarageSpaces: number | null;
    LotFeatures: string[];
    MIAMIRE_TypeofAssociation: string[];
    AssociationFee: number | null;
}
export type RemoteRIN = RemoteListing & RemoteRINListing;

export type MetaFields = {
    id: number;
    objectId: number;
}

export type ListingID = {
    status: string;
    proptype: string;
    sysid: string;
    mls: string;
}

export type Listing = {
    model: ListingCode;
    code: ListingCode;
    finance: 'BUY' | 'RNT';
    parent: 'RES' | 'COM';
    status: string;
    proptype: string;
    sysid: string;
    mls: string;
    folio: string | null;
    updated: string;
    description: string;
    price: number;
    year: number | null;
    full_address: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    county: string;
    office: string | null;
    images: string[];
    _geoloc: {
        lat: number;
        lng: number;
    }
}

export type RE1 = Listing & {
    beds: number | null;
    baths: number | null;
    living_area: number | null;
    cooling: string[];
    lot_area: number | null;
    pool: boolean;
    floors: string[];
    additional_rooms: string[];
    features: string[];
    appliances: string[];
    design: string[];
    external_features: string[];
    parking_type: string[];
    parking_spaces: number;
    lots: string[];
    association: string[];
    association_fee: number | null;
}

export type RE2 = Listing & {
    beds: number | null;
    baths: number | null;
    living_area: number | null;
    cooling: string[];
    type: string[];
    security: string[];
    amenities: string[];
    floors: string[];
    additional_rooms: string[];
    features: string[];
    appliances: string[];
    design: string[];
    external_features: string[];
    parking_type: string[];
    parking_spaces: number | null;
    association: string[];
    association_fee: number | null;
}

export type RNT = Listing & {
    beds: number | null;
    baths: number | null;
    living_area: number;
    cooling: string[];
    type: string[];
    floors: string[];
    additional_rooms: string[];
    features: string[];
    appliances: string[];
    design: string[];
    external_features: string[];
    parking_type: string[];
    parking_spaces: number | null;
    rentperiod: string | null;
    available: string | null;
    furnished: string | null;
    minlease: string | null;
    amenities: string[];
}

export type COM = Listing & {
    type: string[];
}

export type CLD = Listing & {
    usage: string[];
    acres:  number;
    utilities: string[];
}

export type RLD = Listing & {
    usage: string[];
    acres: number;
    utilities: string[];
}

export type BUS = Listing & {
    type: string[];
    years_active: number | null;
    year_established: number | null;
}

export type RIN = Listing & {
    beds: number | null;
    baths: number | null;
    living_area: number | null;
    cooling: string[];
    lot_area: number | null;
    floors: string[];
    additional_rooms: string[];
    features: string[];
    appliances: string[];
    design: string[];
    external_features: string[];
    parking_type: string[];
    parking_spaces: number | null;
    lots: string[];
    association: string[];
    association_fee: number | null;
}

export type ListingType = ListingID | RE1 | RE2 | RNT | COM | CLD | RLD | BUS | RIN;