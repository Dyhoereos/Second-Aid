import { MedicationInstruction } from './medicationinstruction';

export class Medication {
	medicationId: number;
	name: string;
	description: string;
	medicationInstructions: MedicationInstruction[];
}
