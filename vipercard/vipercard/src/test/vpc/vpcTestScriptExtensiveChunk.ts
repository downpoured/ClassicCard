
/* auto */ import { TestVpcScriptRunBase } from './vpcTestScriptRunBase';
/* auto */ import { SimpleUtil512TestCollection, YetToBeDefinedTestHelper } from './../testUtils/testUtils';

/* (c) 2019 moltenform(Ben Fisher) */
/* Released under the GPLv3 license */

let t = new SimpleUtil512TestCollection('testCollectionScriptExtensiveChunk', true);
export let testCollectionScriptExtensiveChunk = t;

let h = YetToBeDefinedTestHelper<TestVpcScriptRunBase>();
t.atest('--init--testCollectionScriptExtensive', async () => {
    h = new TestVpcScriptRunBase(t);
    return h.initEnvironment();
});
//~ t.atest('runConditionalTests', () => {
//~ let test = new RunExtensiveConditionalTests();
//~ return test.go();
//~ });