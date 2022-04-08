import * as _ from "lodash";
export class Task {
    constructor(title: string, description?: string, estimate?: number) {
        this.id = _.uniqueId();
        this.title = title;
        this.description = description || '';
        this.estimate = estimate || 1;
    }

    id: string;
    description: string;
    title: string;
    estimate: number;
}
