"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _createmockworkflowstepsutil = require("../../../../utils/create-mock-workflow-steps.util");
const _getallstepidsinlooputil = require("../get-all-step-ids-in-loop.util");
describe('getAllStepIdsInLoop', ()=>{
    describe('simple loop scenarios', ()=>{
        it('should return all step IDs in a simple linear loop', ()=>{
            const steps = [
                (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator1', [
                    'step2'
                ], []),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step2', [
                    'step3'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step3', [
                    'step4'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step4', [
                    'iterator1'
                ])
            ];
            const result = (0, _getallstepidsinlooputil.getAllStepIdsInLoop)({
                iteratorStepId: 'iterator1',
                initialLoopStepIds: [
                    'step2'
                ],
                steps
            });
            expect(result).toEqual([
                'step2',
                'step3',
                'step4'
            ]);
        });
        it('should handle loop with branching paths that converge', ()=>{
            const steps = [
                (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator1', [
                    'step2'
                ], []),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step2', [
                    'step3',
                    'step4'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step3', [
                    'step5'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step4', [
                    'step5'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step5', [
                    'iterator1'
                ])
            ];
            const result = (0, _getallstepidsinlooputil.getAllStepIdsInLoop)({
                iteratorStepId: 'iterator1',
                initialLoopStepIds: [
                    'step2'
                ],
                steps
            });
            expect(result).toEqual([
                'step2',
                'step3',
                'step5',
                'step4'
            ]);
        });
        it('should handle loop with branching paths that converge to the iterator', ()=>{
            const steps = [
                (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator1', [
                    'step2'
                ], []),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step2', [
                    'step3',
                    'step4'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step3', [
                    'iterator1'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step4', [
                    'iterator1'
                ])
            ];
            const result = (0, _getallstepidsinlooputil.getAllStepIdsInLoop)({
                iteratorStepId: 'iterator1',
                initialLoopStepIds: [
                    'step2'
                ],
                steps
            });
            expect(result).toEqual([
                'step2',
                'step3',
                'step4'
            ]);
        });
        it('should handle multiple entry points to the loop', ()=>{
            const steps = [
                (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator1', [
                    'step2',
                    'step3'
                ], []),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step2', [
                    'step4'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step3', [
                    'step4'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step4', [
                    'iterator1'
                ])
            ];
            const result = (0, _getallstepidsinlooputil.getAllStepIdsInLoop)({
                iteratorStepId: 'iterator1',
                initialLoopStepIds: [
                    'step2',
                    'step3'
                ],
                steps
            });
            expect(result).toEqual([
                'step2',
                'step4',
                'step3'
            ]);
        });
    });
    describe('nested iterator scenarios', ()=>{
        it('should handle a nested iterator within a loop', ()=>{
            const steps = [
                (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator1', [
                    'step2'
                ], []),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step2', [
                    'nested_iterator'
                ]),
                (0, _createmockworkflowstepsutil.createMockIteratorStep)('nested_iterator', [
                    'step5'
                ], [
                    'step3'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step3', [
                    'step4'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step4', [
                    'nested_iterator'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step5', [
                    'iterator1'
                ])
            ];
            const result = (0, _getallstepidsinlooputil.getAllStepIdsInLoop)({
                iteratorStepId: 'iterator1',
                initialLoopStepIds: [
                    'step2'
                ],
                steps
            });
            expect(result).toEqual([
                'step2',
                'nested_iterator',
                'step3',
                'step4',
                'step5'
            ]);
        });
        it('should handle multiple levels of nested iterators', ()=>{
            const steps = [
                (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator1', [
                    'step2'
                ], []),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step2', [
                    'nested_iterator1'
                ]),
                (0, _createmockworkflowstepsutil.createMockIteratorStep)('nested_iterator1', [
                    'step6'
                ], [
                    'step3'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step3', [
                    'nested_iterator2'
                ]),
                (0, _createmockworkflowstepsutil.createMockIteratorStep)('nested_iterator2', [
                    'step5'
                ], [
                    'step4'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step4', [
                    'nested_iterator2'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step5', [
                    'nested_iterator1'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step6', [
                    'iterator1'
                ])
            ];
            const result = (0, _getallstepidsinlooputil.getAllStepIdsInLoop)({
                iteratorStepId: 'iterator1',
                initialLoopStepIds: [
                    'step2'
                ],
                steps
            });
            expect(result).toEqual([
                'step2',
                'nested_iterator1',
                'step3',
                'nested_iterator2',
                'step4',
                'step5',
                'step6'
            ]);
        });
    });
    describe('if-else scenarios', ()=>{
        it('should include steps in all if-else branches within a loop', ()=>{
            const steps = [
                (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator1', [], [
                    'ifElse1'
                ]),
                (0, _createmockworkflowstepsutil.createMockIfElseStep)('ifElse1', [
                    {
                        id: 'branch-if',
                        filterGroupId: 'fg1',
                        nextStepIds: [
                            'stepA'
                        ]
                    },
                    {
                        id: 'branch-else',
                        nextStepIds: [
                            'stepB'
                        ]
                    }
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('stepA', [
                    'iterator1'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('stepB', [
                    'iterator1'
                ])
            ];
            const result = (0, _getallstepidsinlooputil.getAllStepIdsInLoop)({
                iteratorStepId: 'iterator1',
                initialLoopStepIds: [
                    'ifElse1'
                ],
                steps
            });
            expect(result).toEqual(expect.arrayContaining([
                'ifElse1',
                'stepA',
                'stepB'
            ]));
            expect(result).toHaveLength(3);
        });
        it('should include deeply nested steps inside if-else branches', ()=>{
            const steps = [
                (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator1', [], [
                    'ifElse1'
                ]),
                (0, _createmockworkflowstepsutil.createMockIfElseStep)('ifElse1', [
                    {
                        id: 'branch-if',
                        filterGroupId: 'fg1',
                        nextStepIds: [
                            'stepA'
                        ]
                    },
                    {
                        id: 'branch-else',
                        nextStepIds: [
                            'stepB'
                        ]
                    }
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('stepA', [
                    'stepC'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('stepB', [
                    'stepC'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('stepC', [
                    'iterator1'
                ])
            ];
            const result = (0, _getallstepidsinlooputil.getAllStepIdsInLoop)({
                iteratorStepId: 'iterator1',
                initialLoopStepIds: [
                    'ifElse1'
                ],
                steps
            });
            expect(result).toEqual(expect.arrayContaining([
                'ifElse1',
                'stepA',
                'stepB',
                'stepC'
            ]));
            expect(result).toHaveLength(4);
        });
        it('should handle if-else with steps before and after within a loop', ()=>{
            const steps = [
                (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator1', [], [
                    'step1'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step1', [
                    'ifElse1'
                ]),
                (0, _createmockworkflowstepsutil.createMockIfElseStep)('ifElse1', [
                    {
                        id: 'branch-if',
                        filterGroupId: 'fg1',
                        nextStepIds: [
                            'stepA'
                        ]
                    },
                    {
                        id: 'branch-else',
                        nextStepIds: [
                            'stepB'
                        ]
                    }
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('stepA', [
                    'step2'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('stepB', [
                    'step2'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step2', [
                    'iterator1'
                ])
            ];
            const result = (0, _getallstepidsinlooputil.getAllStepIdsInLoop)({
                iteratorStepId: 'iterator1',
                initialLoopStepIds: [
                    'step1'
                ],
                steps
            });
            expect(result).toEqual(expect.arrayContaining([
                'step1',
                'ifElse1',
                'stepA',
                'stepB',
                'step2'
            ]));
            expect(result).toHaveLength(5);
        });
    });
    describe('if-else branch looping back to enclosing iterator', ()=>{
        it('should not stack overflow when an if-else branch points back to the enclosing iterator', ()=>{
            const steps = [
                (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator1', [], [
                    'step1'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step1', [
                    'ifElse1'
                ]),
                (0, _createmockworkflowstepsutil.createMockIfElseStep)('ifElse1', [
                    {
                        id: 'branch-if',
                        filterGroupId: 'fg1',
                        nextStepIds: [
                            'stepA'
                        ]
                    },
                    {
                        id: 'branch-else',
                        nextStepIds: [
                            'iterator1'
                        ]
                    }
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('stepA', [
                    'iterator1'
                ])
            ];
            const result = (0, _getallstepidsinlooputil.getAllStepIdsInLoop)({
                iteratorStepId: 'iterator1',
                initialLoopStepIds: [
                    'step1'
                ],
                steps
            });
            expect(result).toEqual(expect.arrayContaining([
                'step1',
                'ifElse1',
                'stepA'
            ]));
            expect(result).toHaveLength(3);
            expect(result).not.toContain('iterator1');
        });
        it('should handle multiple if-else branches where some loop back to iterator and others continue', ()=>{
            const steps = [
                (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator1', [
                    'exitStep'
                ], [
                    'step1'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step1', [
                    'step2'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step2', [
                    'ifElse1'
                ]),
                (0, _createmockworkflowstepsutil.createMockIfElseStep)('ifElse1', [
                    {
                        id: 'branch-skip',
                        filterGroupId: 'fg1',
                        nextStepIds: [
                            'iterator1'
                        ]
                    },
                    {
                        id: 'branch-create',
                        filterGroupId: 'fg2',
                        nextStepIds: [
                            'stepCreate'
                        ]
                    },
                    {
                        id: 'branch-default',
                        nextStepIds: []
                    }
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('stepCreate', [
                    'stepSave'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('stepSave', [
                    'iterator1'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('exitStep', [])
            ];
            const result = (0, _getallstepidsinlooputil.getAllStepIdsInLoop)({
                iteratorStepId: 'iterator1',
                initialLoopStepIds: [
                    'step1'
                ],
                steps
            });
            expect(result).toEqual(expect.arrayContaining([
                'step1',
                'step2',
                'ifElse1',
                'stepCreate',
                'stepSave'
            ]));
            expect(result).toHaveLength(5);
            expect(result).not.toContain('iterator1');
            expect(result).not.toContain('exitStep');
        });
        it('should handle nested iterator inside if-else branch that also has a branch looping back to outer iterator', ()=>{
            const steps = [
                (0, _createmockworkflowstepsutil.createMockIteratorStep)('outerIterator', [
                    'exitStep'
                ], [
                    'ifElse1'
                ]),
                (0, _createmockworkflowstepsutil.createMockIfElseStep)('ifElse1', [
                    {
                        id: 'branch-nested',
                        filterGroupId: 'fg1',
                        nextStepIds: [
                            'innerIterator'
                        ]
                    },
                    {
                        id: 'branch-skip',
                        nextStepIds: [
                            'outerIterator'
                        ]
                    }
                ]),
                (0, _createmockworkflowstepsutil.createMockIteratorStep)('innerIterator', [
                    'outerIterator'
                ], [
                    'innerStep'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('innerStep', [
                    'innerIterator'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('exitStep', [])
            ];
            const result = (0, _getallstepidsinlooputil.getAllStepIdsInLoop)({
                iteratorStepId: 'outerIterator',
                initialLoopStepIds: [
                    'ifElse1'
                ],
                steps
            });
            expect(result).toEqual(expect.arrayContaining([
                'ifElse1',
                'innerIterator',
                'innerStep'
            ]));
            expect(result).toHaveLength(3);
            expect(result).not.toContain('outerIterator');
            expect(result).not.toContain('exitStep');
        });
    });
    describe('edge cases', ()=>{
        it('should handle empty initial loop step IDs', ()=>{
            const steps = [
                (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator1', [
                    'step2'
                ], [])
            ];
            const result = (0, _getallstepidsinlooputil.getAllStepIdsInLoop)({
                iteratorStepId: 'iterator1',
                initialLoopStepIds: [],
                steps
            });
            expect(result).toEqual([]);
        });
        it('should handle steps with no nextStepIds', ()=>{
            const steps = [
                (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator1', [
                    'step2'
                ], []),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step2', [])
            ];
            const result = (0, _getallstepidsinlooputil.getAllStepIdsInLoop)({
                iteratorStepId: 'iterator1',
                initialLoopStepIds: [
                    'step2'
                ],
                steps
            });
            expect(result).toEqual([
                'step2'
            ]);
        });
        it('should prevent infinite loops with circular references', ()=>{
            const steps = [
                (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator1', [
                    'step2'
                ], []),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step2', [
                    'step3'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step3', [
                    'step4'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step4', [
                    'step2'
                ])
            ];
            const result = (0, _getallstepidsinlooputil.getAllStepIdsInLoop)({
                iteratorStepId: 'iterator1',
                initialLoopStepIds: [
                    'step2'
                ],
                steps
            });
            // Should still include all steps but not get stuck in infinite loop
            expect(result).toEqual([
                'step2',
                'step3',
                'step4'
            ]);
        });
    });
});

//# sourceMappingURL=get-all-step-ids-in-loop.util.spec.js.map