export type MCQ = {
    _id: string;
    Question: string;
    MCQ_Option: {
        _id: string;
        Value: string;
    }[];
};

export type Job = {
    Type: string;
    _id: string;
    Title: string;
    Slug: string;
    Description: string;
    Compensation: string;
    Date: string;
    Company: {
        _id: string;
        Name: string;
        Description: string;
        Location: string;
    };
    Test: {
        Title: string;
        Information: string;
        Duration: number;
        MCQs: MCQ[];
    }
};