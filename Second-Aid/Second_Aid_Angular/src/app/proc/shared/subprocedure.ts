import { Preinstruction } from './preinstruction';
import { Video } from './video';

export class Subprocedure {
	subprocedureId: number;
	name: string;
	description: string;
	procedureId: number;
	videos: Video[];
	preinstructions: Preinstruction[];
}
