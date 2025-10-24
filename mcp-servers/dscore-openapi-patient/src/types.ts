// examples/genapi-patient/src/types.ts
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // YYYY-MM-DD
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
  dateOfBirth: string; // YYYY-MM-DD
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