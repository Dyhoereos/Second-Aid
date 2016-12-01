import { Subprocedure } from './subprocedure';

export class Procedure {
	procedureId: number;
	name: string;
	description: string;
	subprocedures: Subprocedure[];
}
