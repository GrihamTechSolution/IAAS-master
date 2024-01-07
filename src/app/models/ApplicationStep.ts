export class ApplicationStep {
    id: number;
    applicationID: number;
    stepNumber: number;
    updated: Date;
    created: Date;
    message: string;
    firstFilePath: string;
    secondFilePath: string;

    files: string[] = [];
}