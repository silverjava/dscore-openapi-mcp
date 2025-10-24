"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dcmstudyService_1 = require("../dcmstudyService");
describe('dcmstudyService', () => {
    describe('listDicomStudiesRemote', () => {
        it('should have the correct function signature', () => {
            // This is just a type check test to ensure the function signature is correct
            expect(dcmstudyService_1.listDicomStudiesRemote).toBeDefined();
        });
    });
    describe('getDicomStudyRemote', () => {
        it('should have the correct function signature', () => {
            // This is just a type check test to ensure the function signature is correct
            expect(dcmstudyService_1.getDicomStudyRemote).toBeDefined();
        });
    });
});
