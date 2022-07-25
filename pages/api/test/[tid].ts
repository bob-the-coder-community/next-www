import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { Sanity } from "../../../services/api/sanity";

const ACTIONS = {
    GET_INSTRUCTIONS: 'get-instructions',
    GET_TEST: 'get-test',
    GET_PROBLEMS: 'get-problems',
    START_TEST: 'start-test',
    EXECUTE: 'execute-program',
    UPDATE_META: 'update-meta',
    SUBMIT_TEST: 'submit-test'
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { action } = req.query;

        /** get-instructions */
        if (action === ACTIONS.GET_INSTRUCTIONS) {
            const instruction = await Test.Get.Instruction(req.query.tid as string);
    
            if (!instruction) {
                return res.status(404).json({ message: 'not found' });
            }
            
            res.status(200).json(instruction);
            return;
        }
    
        /** get-test */
        if (action === ACTIONS.GET_TEST) {
            const test = await Test.Get.Test(req.query.tid as string);
    
            if (!test) {
                return res.status(404).json({ message: 'not found' });
            }
            
            res.status(200).json(test);
            return;        
        }

        /** get-problems */
        if (action === ACTIONS.GET_PROBLEMS) {
            const problems = await Test.Get.Problem(req.query.tid as string);

            if (!problems) {
                return res.status(404).json({ message: 'not found' });
            }
            
            res.status(200).json(problems);     
            return;       
        }

        /** Start Test */
        if (action === ACTIONS.START_TEST) {
            await Test.Start(req.query.tid as string);
            res.status(200).json({ message: 'success' });
            return
        }

        /** execute-program */
        if (action === ACTIONS.EXECUTE) {
            const result = await Test.Execute(req.body.source_code);
            res.status(200).json({ message: 'success', result });
            return;
        }

        /** update-meta */
        if (action === ACTIONS.UPDATE_META) {
            await Test.UpdateMeta(req.query.tid as string, req.body);
            res.status(200).json({ message: 'success' });
            return;
        }

        if (action === ACTIONS.SUBMIT_TEST) {
            await Test.UpdateMeta(req.query.tid as string, req.body);
            await Test.Submit(req.query.tid as string);
            res.status(200).json({ message: 'success' });
            return;
        }
    
        return res.status(400).json({ message: 'Action is missing or incorrect method.' });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

const Test = {
    Get: {
        Test: async (tid: string) => {
            try {
                const test = (await Sanity.Query(`*[_type == "invitation" && _id == "${tid}"]`))[0];
                
                if (!test) {
                    return Promise.reject(new Error('Test ID not found'));
                }

                return Promise.resolve(test)
            } catch (err) {
                return Promise.reject(err);
            }
        },
        Instruction: async (tid: string) => {
            try {
                const results = (await Test.Get.Test(tid));
                const instructions = (await Sanity.Query(`*[_type == "position" && _id == "${results.position[0]._ref}"]`))[0];

                if (!instructions) {
                    return Promise.reject(new Error('Instructions not found'));
                }

                return Promise.resolve(instructions);
            } catch (err) { 
                return Promise.reject(err);
            }
        },
        Problem: async (tid: string) => {
            try {
                const instructions = await Test.Get.Instruction(tid);
                if (!instructions) {
                    return Promise.reject(new Error('Instructions not found'));
                }
                
                const problems = (await Sanity.Query(`*[_type == "problem" && (${instructions.problems.map((problem: { _ref: any; }) => `_id == "${problem._ref}"`).join('||')})]`))
                return Promise.resolve(problems);

            } catch (err) {
                return Promise.reject(err);
            }
        }
    },
    Start: async (tid: string): Promise<any> => {
        try {
            const test = await Test.Get.Test(tid);

            if (test.state !== 'invitation-sent') {
                return Promise.reject(new Error('The test stage is not right'));
            }

            await Sanity.Patch(tid, {
                state: 'in-progress',
                meta: JSON.stringify({
                    ...JSON.parse(test.meta),
                    startTime: Date.now()
                })
            });
            
            return Promise.resolve('Exam started');
        } catch (err) {
            return Promise.reject(err);
        }
    },
    Execute: async (source_code: string): Promise<any> => {
        try {
            const { data } = await axios({
                method: 'POST',
                url: 'https://judge0.tools.bobthecoder.org/submissions/?base64_encoded=false&wait=true',
                data: {
                    language_id: 63,
                    source_code,
                }
            });

            return Promise.resolve(data);
        } catch (err) { 
            return Promise.reject(err);
        }
    },
    UpdateMeta: async (tid: string, data: any): Promise<any> => {
        try {
            const test = await Test.Get.Test(tid);

            if (test.state !== 'in-progress') {
                return Promise.reject(new Error('The test stage is not right'));
            }

            await Sanity.Patch(tid, {
                state: 'in-progress',
                meta: JSON.stringify({
                    ...JSON.parse(test.meta),
                    lastSync: Date.now(),
                    ...data,
                })
            });
            
            return Promise.resolve('Success');
        } catch (err) {
            return Promise.reject(err);
        }
    },
    Submit: async (tid: string): Promise<any> => {
        try {
            await Sanity.Patch(tid, {
                state: 'completed'
            });

            await axios({
                method: 'POST',
                url: 'https://friday.tools.bobthecoder.org/testPlatform/generatereport',
                data: {
                    testId: tid,
                }
            });

            return Promise.resolve(true);
        } catch (err) {
            return Promise.reject(err);
        }
    },
}