import { Preinstruction } from './preinstruction';
import { Video } from './video';

export class Subprocedure {
	subProcedureId: number;
	name: string;
	description: string;
	procedureId: number;
	videos: Video[];
	preinstructions: Preinstruction[];
}
