
/* auto */ import { CountNumericIdNormal } from './../../vpc/vpcutils/vpcUtils';
/* auto */ import { UndoManager } from './../state/vpcUndo';
/* auto */ import { VpcStateSerialize } from './../state/vpcStateSerialize';
/* auto */ import { VpcRuntime, VpcState } from './../state/vpcState';
/* auto */ import { VpcExecTop } from './../../vpc/codeexec/vpcScriptExecTop';
/* auto */ import { getVpcSessionTools } from './../../vpc/request/vpcRequest';
/* auto */ import { VpcPresenter } from './../presentation/vpcPresenter';
/* auto */ import { VpcOutsideImpl } from './../state/vpcOutsideImpl';
/* auto */ import { VpcStateInterfaceImpl } from './vpcInterfaceImpl';
/* auto */ import { VpcNonModalFormSendReport } from './../nonmodaldialogs/vpcFormSendReport';
/* auto */ import { VpcNonModalFormLogin } from './../nonmodaldialogs/vpcFormLogin';
/* auto */ import { VpcTool, checkThrow } from './../../vpc/vpcutils/vpcEnums';
/* auto */ import { UndoableActionCreateOrDelVel } from './../state/vpcCreateOrDelVel';
/* auto */ import { VpcElStack, VpcElStackLineageEntry } from './../../vpc/vel/velStack';
/* auto */ import { VpcModelTop } from './../../vpc/vel/velModelTop';
/* auto */ import { VpcElField } from './../../vpc/vel/velField';
/* auto */ import { VpcElCard } from './../../vpc/vel/velCard';
/* auto */ import { VpcElButton } from './../../vpc/vel/velButton';
/* auto */ import { VpcElBg } from './../../vpc/vel/velBg';
/* auto */ import { RespondToErr, Root, Util512Higher, getRoot, justConsoleMsgIfExceptionThrown } from './../../ui512/utils/util512Higher';
/* auto */ import { O, bool, vpcWebsite } from './../../ui512/utils/util512Base';
/* auto */ import { assertTrue, respondUI512Error } from './../../ui512/utils/util512Assert';
/* auto */ import { assertWarnEq, longstr, slength } from './../../ui512/utils/util512';
/* auto */ import { UI512Presenter } from './../../ui512/presentation/ui512Presenter';
/* auto */ import { FormattedText } from './../../ui512/drawtext/ui512FormattedText';
/* auto */ import { UI512ElLabel } from './../../ui512/elements/ui512ElementLabel';
/* auto */ import { ElementObserverNoOp } from './../../ui512/elements/ui512ElementGettable';
/* auto */ import { lng } from './../../ui512/lang/langBase';

/* (c) 2019 moltenform(Ben Fisher) */
/* Released under the GPLv3 license */

/**
 * download, construct, and initialize a ViperCard project
 */
export class VpcIntroProvider {
    prompt: O<UI512ElLabel>;
    cbExitToMainMenu: () => void;
    cbExitToNewDocument: () => void;
    cbExitToOpen: (mineOnly: boolean) => void;
    constructor(public identifier: string, public readonly docName: string, public readonly loc: VpcDocumentLocation) {}

    /**
     * begin async operation
     */
    startLoadDocument(currentCntrl: UI512Presenter, cbSetStatus: (s: string) => void) {
        Util512Higher.syncToAsyncTransition(
            this.startLoadDocumentAsync(currentCntrl, cbSetStatus),
            'startLoadDocument',
            RespondToErr.Alert
        );
    }

    /**
     * loads the document, showing a message on the "loading" page
     * if an error occurs. we'll show the exception details.
     */
    async startLoadDocumentAsync(currentCntrl: UI512Presenter, cbSetStatus: (s: string) => void) {
        try {
            return this.startLoadDocumentAsyncImpl(currentCntrl);
        } catch (e) {
            cbSetStatus(
                lng(
                    longstr(
                        `lngPlease go to \n${vpcWebsite}\nto return
                to the main menu.'){NEWLINE}${e.message}{NEWLINE}{NEWLINE}{NEWLINE}`,
                        ''
                    )
                )
            );
        }
    }

    /**
     * wait for delay loaded javascript
     */
    static async waitForDelayLoadedJs(prompt: O<UI512ElLabel>) {
        if (prompt) {
            prompt.set('labeltext', 'Opening delay-loaded libraries...');
        }
        while (true) {
            let rootHigher = getRoot() as RootHigher;
            if (rootHigher?.hasLoadedExternalDelay === 'success') {
                break;
            } else if (rootHigher?.hasLoadedExternalDelay) {
                checkThrow(false, 'WW|Failed to delay-load' + rootHigher?.hasLoadedExternalDelay);
            } else {
                await Util512Higher.sleep(100);
            }
        }
        if (prompt) {
            prompt.set('labeltext', 'Loading...');
        }
    }

    /**
     * load the document
     */
    async loadDocumentTop(): Promise<[VpcPresenter, VpcState]> {
        /* wait for delay-loaded javascript */
        await VpcIntroProvider.waitForDelayLoadedJs(this.prompt);

        /* download the stack data */
        let serialized = await this.getSerializedStackData();

        /* create pr and fullVci */
        let { pr, fullVci, vpcState } = await this.getVpcState();

        /* load saved data */
        await this.initPrUI(pr, serialized, fullVci, vpcState);

        /* compile scripts, set stack lineage */
        /* don't prevent stack from opening if a failure happens here */
        try {
            await this.initPrSettings(pr, vpcState, fullVci);
        } catch (e) {
            respondUI512Error(e, 'initPrSettings');
        }

        /* setup the redirection-to-login-form if requested */
        this.setFirstActionWhenLoaded(vpcState, pr);

        /* return the results */
        checkThrow(pr, 'U1|pr must be defined');
        checkThrow(vpcState, 'U0|vpcState must be defined');
        return [pr, vpcState];
    }

    /**
     * download stack data
     */
    protected async getSerializedStackData() {
        let serializedSavedData = '';
        if (this.loc === VpcDocumentLocation.NewDoc || this.loc === VpcDocumentLocation.ShowLoginForm) {
            /* no serialized data needed */
            assertWarnEq('', this.identifier, 'KL|');
        } else if (this.loc === VpcDocumentLocation.FromStaticDemo) {
            /* request json asynchronously */
            assertTrue(!this.identifier.includes('/'), 'KK|');
            assertTrue(!this.identifier.includes('\\'), 'KJ|');
            assertTrue(!this.identifier.includes('..'), 'KI|');
            assertTrue(this.identifier.endsWith('.json'), 'KH|');
            let got = await Util512Higher.asyncLoadJson('/resources03a/docs/' + this.identifier);
            serializedSavedData = JSON.stringify(got);
        } else if (this.loc === VpcDocumentLocation.FromJsonFile) {
            /* we already have the json, it was given to us via identifier */
            serializedSavedData = this.identifier;
        } else if (this.loc === VpcDocumentLocation.FromStackIdOnline) {
            /* ask the server for the data */
            let got = await getVpcSessionTools().vpcStacksGetData(this.identifier);
            serializedSavedData = got.stackdata;
        } else {
            checkThrow(false, 'KG|cannot open from location ' + this.loc);
        }

        checkThrow(
            this.loc === VpcDocumentLocation.NewDoc ||
                this.loc === VpcDocumentLocation.ShowLoginForm ||
                slength(serializedSavedData),
            'KF|serializedSavedData is ' + serializedSavedData
        );

        return serializedSavedData;
    }

    /**
     * construct a full VpcState
     */
    async getVpcState() {
        await this.yieldTime();
        let idGen = new CountNumericIdNormal(10000);
        await this.yieldTime();
        let vpcState = new VpcState();
        await this.yieldTime();
        vpcState.runtime = new VpcRuntime();
        await this.yieldTime();
        vpcState.undoManager = new UndoManager(() => vpcState.model.productOpts.getS('currentCardId'));
        await this.yieldTime();
        vpcState.runtime.opts.observer = new ElementObserverNoOp();
        await this.yieldTime();
        vpcState.runtime.outside = new VpcOutsideImpl();
        await this.yieldTime();
        vpcState.runtime.codeExec = new VpcExecTop(vpcState.runtime.outside, idGen);
        await this.yieldTime();
        vpcState.model = new VpcModelTop();
        await this.yieldTime();
        let fullVci = new VpcStateInterfaceImpl();
        let pr = new VpcPresenter(fullVci, vpcState.runtime);
        fullVci.init(vpcState, pr);
        vpcState.vci = fullVci;
        await this.yieldTime();
        if (this.loc === VpcDocumentLocation.FromStaticDemo) {
            pr.cameFromDemoSoNeverPromptSave = this.identifier.replace(/\.json/g, '');
            await this.yieldTime();
        }

        pr.cbExitToMainMenu = this.cbExitToMainMenu;
        await this.yieldTime();
        pr.cbExitToNewDocument = this.cbExitToNewDocument;
        await this.yieldTime();
        pr.cbExitToOpen = this.cbExitToOpen;
        await this.yieldTime();
        pr.initPresenter(vpcState.undoManager);
        await this.yieldTime();
        return { pr, fullVci, vpcState };
    }

    /**
     * construct the presenter object
     */
    protected async initPrUI(pr: VpcPresenter, serializedSavedData: string, fullVci: VpcStateInterfaceImpl, vcstate: VpcState) {
        /* load saved data */
        if (serializedSavedData.length) {
            UndoableActionCreateOrDelVel.ensureModelNotEmpty(fullVci, false, vcstate.runtime.useThisObserverForVpcEls);
            await this.yieldTime();
            let serVel = JSON.parse(serializedSavedData);
            await this.yieldTime();
            VpcStateSerialize.deserializeAll(fullVci, serVel);
            await this.yieldTime();
            /* load card order if not set */
            this.patchUpFromPrevVersions(fullVci.getModel());
            await this.yieldTime();
        } else {
            /* only call this *after* the presenter has set up useThisObserverForVpcEls */
            vcstate.model.uuid = Util512Higher.weakUuid();
            await this.yieldTime();
            UndoableActionCreateOrDelVel.ensureModelNotEmpty(fullVci, true, vcstate.runtime.useThisObserverForVpcEls);
            await this.yieldTime();
        }

        await this.yieldTime();
        pr.initUI();
        await this.yieldTime();
        vcstate.runtime.outside.vci = pr.vci;
        await this.yieldTime();

        /* go to the first card (but don't send opencard yet) */
        fullVci.doWithoutAbilityToUndo(() => {
            let card = vcstate.model.stack.bgs[0].cards[0].idInternal;
            pr.setCurCardNoOpenCardEvt(card);
        });
    }

    /**
     * older stacks won't have this set
     */
    protected patchUpFromPrevVersions(model: VpcModelTop) {
        for (let vel of model.stack.iterEntireStack()) {
            if (vel instanceof VpcElStack) {
                if (vel['_compatibilitymode'] === undefined) {
                    vel['_compatibilitymode'] = false;
                }
                if (vel['_increasingnumberforelemnamefld'] === undefined) {
                    vel['_increasingnumberforelemnamefld'] = 1;
                }
                if (vel['_cardorder'] === undefined) {
                    vel['_cardorder'] = '';
                    model.stack.alterCardOrder(current => {
                        let order: string[] = [];
                        for (let bg of model.stack.bgs) {
                            for (let cd of bg.cards) {
                                order.push(cd.idInternal);
                            }
                        }
                        return order;
                    }, model);
                }
            } else if (vel instanceof VpcElBg) {
                if (vel['parts']) {
                    delete vel['parts'];
                }
            } else if (vel instanceof VpcElCard) {
                if (vel['_marked'] === undefined) {
                    vel['_marked'] = false;
                }
            } else if (vel instanceof VpcElButton) {
                if (vel['_sharedhilite'] === undefined) {
                    vel['_sharedhilite'] = false;
                }
                if (vel['_is_bg_velement_id'] === undefined) {
                    vel['_is_bg_velement_id'] = '';
                }
                if (vel['_hilite_uniquetocard'] === undefined) {
                    vel['_hilite_uniquetocard'] = false;
                }
                if (vel['_checkmark_uniquetocard'] === undefined) {
                    vel['_checkmark_uniquetocard'] = false;
                }
            } else if (vel instanceof VpcElField) {
                if (vel['_sharedtext'] === undefined) {
                    vel['_sharedtext'] = false;
                }
                if (vel['_is_bg_velement_id'] === undefined) {
                    vel['_is_bg_velement_id'] = '';
                }
                if (vel['_ftxt_uniquetocard'] === undefined) {
                    vel['_ftxt_uniquetocard'] = new FormattedText();
                }
                if (vel['_scroll_uniquetocard'] === undefined) {
                    vel['_scroll_uniquetocard'] = 0;
                }
            }
        }
    }

    /**
     * compile scripts, set stack lineage
     */
    protected async initPrSettings(pr: VpcPresenter, vci: VpcState, fullVci: VpcStateInterfaceImpl) {
        /* create a new stack lineage */
        if (!vci.model.stack.getS('stacklineage').length) {
            fullVci.doWithoutAbilityToUndo(() => {
                let en = new VpcElStackLineageEntry(
                    vci.model.stack.lineageUsernameNull(),
                    getVpcSessionTools().generateStackPartialId(),
                    'untitled'
                );

                vci.model.stack.appendToStackLineage(en, vci.model);
            });
        }

        /* set current tool */
        let hasContent =
            vci.model.stack.bgs[0] && vci.model.stack.bgs[0].cards[0] && bool(vci.model.stack.bgs[0].cards[0].parts[0]);

        if (
            this.identifier === 'demo_graphics.json' ||
            this.identifier === 'demo_game.json' ||
            this.identifier === 'demo_anim.json'
        ) {
            hasContent = false;
        }

        vci.vci.doWithoutAbilityToUndo(() => {
            vci.vci.setTool(hasContent ? VpcTool.Browse : VpcTool.Pencil);
        });

        vci.vci.causeUIRedraw();
        return this.yieldTime();
    }

    /**
     * by placing a callback in the queue, this code will be run
     * as soon as the page opens
     */
    protected setFirstActionWhenLoaded(vpcState: VpcState, pr: VpcPresenter) {
        if (this.loc === VpcDocumentLocation.ShowLoginForm) {
            /* tell the presenter to show the login form as soon as the page opens */
            pr.lyrCoverArea.setMyMessage('');
            pr.placeCallbackInQueue(() => {
                let form = new VpcNonModalFormLogin(vpcState.vci, false /*newUserOk*/);
                form.fnCbWhenSignedIn = () => {
                    pr.menuActions.save.beginGoExit('openFromMyStacks');
                };

                VpcNonModalFormSendReport.largeWindowBounds(form, vpcState.vci);
                vpcState.vci.setNonModalDialog(form);
            });
        } else if (this.loc === VpcDocumentLocation.FromStackIdOnline) {
            /* tell the presenter to show a dialog explaining that this is someone else's stack */
            let fn = () => {
                let ses = getVpcSessionTools().fromRoot();
                let username = ses ? ses.username : '';
                let info = vpcState.vci.getModel().stack.getLatestStackLineage();
                if (info.stackOwner !== username) {
                    pr.answerMsg(
                        longstr(`You're opening a stack created by
                                "${info.stackOwner}".{{NEWLINE}}If you want
                                to make changes, simply press Save, and you'll
                                be working on your own copy of the stack.`)
                    );
                }
            };
            pr.placeCallbackInQueue(() => justConsoleMsgIfExceptionThrown(fn, "this is someone else's stack"));
        }
    }

    /**
     * load the document, and pause for a bit
     */
    protected async startLoadDocumentAsyncImpl(currentCntrl: UI512Presenter) {
        /* minimum time, just so that it "feels right" rather than loading instantly */
        let ret: [VpcPresenter, VpcState] = await Util512Higher.runAsyncWithMinimumTime(this.loadDocumentTop(), 1500);

        currentCntrl.placeCallbackInQueue(() => {
            /* remove the loading page and replace it with the new presenter */
            getRoot().replaceCurrentPresenter(ret[0]);
        });
    }

    /**
     * provide time for event loop,
     * in case the stack has thousands of scripts to process
     */
    protected async yieldTime() {
        return Util512Higher.sleep(10);
    }
}

/**
 * which location to open from
 */
export enum VpcDocumentLocation {
    __isUI512Enum = 1,
    NewDoc,
    FromStaticDemo,
    FromJsonFile,
    FromStackIdOnline,
    ShowLoginForm
}

/**
 * a higher level root interface
 */
export interface RootHigher extends Root {
    rawResize(width: number, height: number): void;
    scaleMouseCoords: number;
    hasLoadedExternalDelay: string;
}
