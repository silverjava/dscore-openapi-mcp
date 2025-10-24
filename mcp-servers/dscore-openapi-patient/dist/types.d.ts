export interface Patient {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender?: 'male' | 'female' | 'other';
    contactInfo?: {
        email?: string;
        phone?: string;
        address?: string;
    };
    medicalHistory?: string[];
    allergies?: string[];
    medications?: string[];
    createdAt: string;
    updatedAt: string;
}
export interface CreatePatientRequest {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender?: 'male' | 'female' | 'other';
    contactInfo?: {
        email?: string;
        phone?: string;
        address?: string;
    };
    medicalHistory?: string[];
    allergies?: string[];
    medications?: string[];
}
export interface UpdatePatientRequest {
    id: string;
    updates: Partial<CreatePatientRequest>;
}
//# sourceMappingURL=types.d.ts.map