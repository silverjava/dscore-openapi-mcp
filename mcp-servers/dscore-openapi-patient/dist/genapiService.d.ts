export interface GenAPIPatient {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender?: string;
    contactInfo?: {
        email?: string;
        phone?: string;
    };
}
export interface SearchPatientResponse {
    entry?: Array<{
        resource?: {
            id: string;
            name?: Array<{
                family?: string;
                given?: string[];
            }>;
            birthDate?: string;
            gender?: string;
            telecom?: Array<{
                system?: string;
                value?: string;
            }>;
        };
    }>;
    total?: number;
    link?: Array<{
        relation?: string;
        url?: string;
    }>;
}
export interface SearchPatientParams {
    count?: number;
    page?: string;
    cardIDs?: string;
    name?: string;
}
/**
 * Search for patients using the GenAPI SearchPatient endpoint
 *
 * @param params - The search parameters
 * @param params.count - The number of patients per page in the response, default is 100
 * @param params.page - The token for specifying the page (should be a valid token from previous response)
 * @param params.cardIDs - Patient card ids, separated by comma
 * @param params.name - Patient name search with contains modifier, format: "name:contains=xxx"
 */
export declare function searchPatientsRemote(params: SearchPatientParams): Promise<{
    patients: GenAPIPatient[];
    totalCount: number;
    nextPageToken?: string;
}>;
export interface GetPatientResponse {
    id: string;
    name?: Array<{
        family?: string;
        given?: string[];
    }>;
    birthDate?: string;
    gender?: string;
    telecom?: Array<{
        system?: string;
        value?: string;
    }>;
}
/**
 * Get a patient by ID using the GenAPI GetPatient endpoint
 */
export declare function getPatientRemote(patientId: string): Promise<GenAPIPatient>;
//# sourceMappingURL=genapiService.d.ts.map