import { Question } from './question';

export class Questionnaire {
	name: string;
    subProcedureId: number;
    questions: Array<Question>;
}
