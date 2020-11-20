export interface Weather {
    id: number;
    model: 'RE1';
    code: string;
    finance: string;
    parent: string;
    proptype: string;
    sysid: number;
    mls: string;
    folio: string;
    updated: string;
    description: string;
    price: number;
    year: number;
    full_address: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    county: string;
    office: string;
    beds: number;
    baths: number;
    living_area: number;
    cooling: string;
    type: string;
    security?: (string)[] | null;
    amenities?: (string)[] | null;
    association: string;
    association_fee: number;
    images?: (string)[] | null;
    objectID: string;
  }
  