import { RemoteBUSListing, RemoteCLDListing, RemoteCOMListing, RemoteListing, RemoteListingID, RemoteRE1Listing, RemoteRE2Listing, RemoteRIN, RemoteRINListing, RemoteRLDListing, RemoteRNTListing } from "_types";

type IDField = keyof RemoteListingID;
export const IDFields: IDField[] = [
    'PropertyType',
    'PropertySubType',
    'StandardStatus',
    'ListingKey',
    'ListingId'
]

type GenericField = keyof RemoteListing;
export const GenericFields: GenericField[] = [
    'PropertyType',
    'PropertySubType',
    'StandardStatus',
    'ListingKey',
    'ListingId',
    'ParcelNumber',
    'ModificationTimestamp',
    'PublicRemarks',
    'ListPrice',
    'YearBuilt',
    'UnparsedAddress',
    'StreetNumber',
    'StreetDirPrefix',
    'StreetName',
    'City',
    'StateOrProvince',
    'PostalCode',
    'CountyOrParish',
    'ListOfficeName',
    'Latitude',
    'Longitude',
    'Media'
];

type RE1Field = keyof RemoteRE1Listing;
export const RE1Fields: RE1Field[] = [
    'BedroomsTotal',
    'BathroomsFull',
    'LivingArea',
    'Cooling',
    'LotSizeSquareFeet',
    'PoolPrivateYN',
    'Flooring',
    'RoomLivingRoomFeatures',
    'RoomDiningRoomFeatures',
    'RoomBedroomFeatures',
    'RoomMasterBathroomFeatures',
    'InteriorFeatures',
    'LaundryFeatures',
    'WindowFeatures',
    'SecurityFeatures',
    'Appliances',
    'ArchitecturalStyle',
    'ExteriorFeatures',
    'Fencing',
    'PatioAndPorchFeatures',
    'PoolFeatures',
    'WaterfrontFeatures',
    'CommunityFeatures',
    'ParkingFeatures',
    'GarageSpaces',
    'LotFeatures',
    'MIAMIRE_TypeofAssociation',
    'AssociationFee',
];

type RE2Field = keyof RemoteRE2Listing;
export const RE2Fields: RE2Field[] = [
    'BedroomsTotal',
    'BathroomsFull',
    'LivingArea',
    'Cooling',
    'Flooring',
    'Appliances',
    'View',
    'ArchitecturalStyle',
    'MIAMIRE_Style',
    'SecurityFeatures',
    'AssociationAmenities',
    'MIAMIRE_MaintenanceIncludes',
    'CommunityFeatures',
    'ParkingFeatures',
    'GarageSpaces',
    'MIAMIRE_TypeofAssociation',
    'AssociationFee',
];

type RNTField = keyof RemoteRNTListing;
export const RNTFields: RNTField[] = [
    'BedroomsTotal',
    'BathroomsFull',
    'LivingArea',
    'Cooling',
    'InteriorFeatures',
    'LaundryFeatures',
    'WindowFeatures',
    'SecurityFeatures',
    'LeaseAmountFrequency',
    'AvailabilityDate',
    'Furnished',
    'MIAMIRE_Style',
    'LeaseTerm',
    'ExteriorFeatures',
    'Fencing',
    'PatioAndPorchFeatures',
    'PoolFeatures',
    'WaterfrontFeatures',
    'CommunityFeatures',
    'MIAMIRE_SubdivisionInformation',
    'Appliances',
    'ArchitecturalStyle',
    'Flooring',
    'ParkingFeatures',
    'GarageSpaces',
];

type RINField = keyof RemoteRINListing;
export const RINFields: RINField[] = [
    'BedroomsTotal',
    'BathroomsFull',
    'LivingArea',
    'Cooling',
    'LotSizeSquareFeet',
    'PoolPrivateYN',
    'Flooring',
    'RoomLivingRoomFeatures',
    'RoomDiningRoomFeatures',
    'RoomBedroomFeatures',
    'RoomMasterBathroomFeatures',
    'InteriorFeatures',
    'LaundryFeatures',
    'WindowFeatures',
    'SecurityFeatures',
    'Appliances',
    'ArchitecturalStyle',
    'ExteriorFeatures',
    'Fencing',
    'PatioAndPorchFeatures',
    'PoolFeatures',
    'WaterfrontFeatures',
    'CommunityFeatures',
    'ParkingFeatures',
    'GarageSpaces',
    'LotFeatures',
    'MIAMIRE_TypeofAssociation',
    'AssociationFee',
];

type COMField = keyof RemoteCOMListing;
export const COMFields: COMField[] = [
    'CurrentUse',
    'PossibleUse',
    'BusinessType',
];

type CLDField = keyof RemoteCLDListing;
export const CLDFields: CLDField[] = [
    'PossibleUse',
    'BusinessType',
    'CurrentUse',
    'LotSizeAcres',
    'Utilities',
];

type RLDField = keyof RemoteRLDListing;
export const RLDFields: RLDField[] = [
    'DevelopmentStatus',
    'CurrentUse',
    'LotSizeAcres',
    'Utilities'
];

type BuesField = keyof RemoteBUSListing;
export const BUSFields: BuesField[] = [
  'BusinessType',
  'YearEstablished',
];