export class OPTakerContact {
    id: number;
    opTakerID: number;
    countryID: number;
    name: string;
    phoneNumber: string;

    status: number = 1; // added, 2 for edited, 3 for delete
}