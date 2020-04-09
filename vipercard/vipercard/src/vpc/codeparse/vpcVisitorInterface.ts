
/* auto */ import { IntermedMapOfIntermedVals, VpcVal } from './../vpcutils/vpcVal';
/* auto */ import { ChvITk } from './vpcTokens';
/* auto */ import { RequestedContainerRef, RequestedVelRef } from './../vpcutils/vpcRequestedReference';
/* auto */ import { OrdinalOrPosition } from './../vpcutils/vpcEnums';
/* auto */ import { RequestedChunk } from './../vpcutils/vpcChunkResolution';

// the VpcCompleteVisitor interface will make it easier
// to see that all visitor methods are there

// the VisitingContext interface is just basically there
// while writing the visitor to get autocomplete in the code editor

/* generated code, any changes past this point will be lost: --------------- */

export interface VpcCompleteVisitor {
    RuleHAllPropertiesThatCouldBeUnary(ctx: VisitingContext): ChvITk;
    RuleHAnyFnNameOrAllPropertiesThatCouldBeNullary(ctx: VisitingContext): ChvITk;
    RuleHAnyFnName(ctx: VisitingContext): ChvITk;
    RuleHCouldBeAPropertyToSet(ctx: VisitingContext): ChvITk;
    RuleHAnyAllowedVariableName(ctx: VisitingContext): ChvITk;
    RuleObject(ctx: VisitingContext): RequestedVelRef;
    RuleObjectBtn(ctx: VisitingContext): RequestedVelRef;
    RuleObjectFld(ctx: VisitingContext): RequestedVelRef;
    RuleObjectCard(ctx: VisitingContext): RequestedVelRef;
    RuleObjectBg(ctx: VisitingContext): RequestedVelRef;
    RuleObjectStack(ctx: VisitingContext): RequestedVelRef;
    RuleObjectPart(ctx: VisitingContext): RequestedVelRef;
    RuleObjectSpecial(ctx: VisitingContext): RequestedVelRef;
    RuleOf(ctx: VisitingContext): ChvITk;
    RuleOrdinal(ctx: VisitingContext): OrdinalOrPosition;
    RulePosition(ctx: VisitingContext): OrdinalOrPosition;
    RuleMenuItem(ctx: VisitingContext): string;
    RuleMenu(ctx: VisitingContext): string;
    RuleWindow_1(ctx: VisitingContext): string;
    RuleWindow(ctx: VisitingContext): string;
    RuleMessageBox(ctx: VisitingContext): string;
    RuleHSimpleContainer(ctx: VisitingContext): RequestedContainerRef;
    RuleHContainer(ctx: VisitingContext): RequestedContainerRef;
    RuleHChunk(ctx: VisitingContext): RequestedChunk;
    RuleHChunkBound(ctx: VisitingContext): VpcVal;
    RuleHSource(ctx: VisitingContext): VpcVal;
    RuleHSource_1(ctx: VisitingContext): VpcVal;
    RuleHFnCallWParens(ctx: VisitingContext): VpcVal;
    RuleHUnaryPropertyGet(ctx: VisitingContext): VpcVal;
    RuleHOldStyleFnNonNullary(ctx: VisitingContext): VpcVal;
    RuleHOldStyleFnNullaryOrNullaryPropGet(ctx: VisitingContext): VpcVal;
    RuleHGenericFunctionCall(ctx: VisitingContext): VpcVal;
    RuleFnCallNumberOf(ctx: VisitingContext): VpcVal;
    RuleFnCallNumberOf_1(ctx: VisitingContext): VpcVal;
    RuleFnCallNumberOf_5(ctx: VisitingContext): VpcVal;
    RuleFnCallNumberOf_6(ctx: VisitingContext): VpcVal;
    RuleFnCallNumberOf_7(ctx: VisitingContext): VpcVal;
    RuleFnCallNumberOf_8(ctx: VisitingContext): VpcVal;
    RuleFnCallNumberOf_9(ctx: VisitingContext): VpcVal;
    RuleFnCallThereIs(ctx: VisitingContext): VpcVal;
    RuleAnyPropertyVal(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleExpr(ctx: VisitingContext): VpcVal;
    RuleLvl1Expression(ctx: VisitingContext): VpcVal;
    RuleLvl2Expression(ctx: VisitingContext): VpcVal;
    RuleLvl3Expression(ctx: VisitingContext): VpcVal;
    RuleLvl4Expression(ctx: VisitingContext): VpcVal;
    RuleLvl5Expression(ctx: VisitingContext): VpcVal;
    RuleLvl6Expression(ctx: VisitingContext): VpcVal;
    RuleAndOrOr(ctx: VisitingContext): string;
    RuleContainsOrGreaterLessEqual(ctx: VisitingContext): string;
    RuleIsExpression(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdAdd(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdAnswer(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdAsk(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdBeep(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdVpccalluntrappablechoose(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdClick(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdDelete(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdDial(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdDisable(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdDivide(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdDomenu(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdVpccalluntrappabledomenu(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdDrag(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleHBuiltinCmdDrag_1(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdEnable(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdInternalvpcgocardimpl(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleHBuiltinCmdGoDest(ctx: VisitingContext): RequestedVelRef;
    RuleBuiltinCmdHide(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdMark(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdMultiply(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdPlay(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdPut(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdReset(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdReplace(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdSelect(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdSend(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdSet(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdShow(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdInternalvpcsort(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdStart(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdStop(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdSubtract(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdUnlock(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdVisual(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdWait(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleInternalCmdRequestEval(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleInternalCmdUserHandler(ctx: VisitingContext): IntermedMapOfIntermedVals;
}

export interface VisitingContext {
    [index: string]: any;
    RuleHAllPropertiesThatCouldBeUnary: any[];
    RuleHAnyFnNameOrAllPropertiesThatCouldBeNullary: any[];
    RuleHAnyFnName: any[];
    RuleHCouldBeAPropertyToSet: any[];
    RuleHAnyAllowedVariableName: any[];
    RuleObject: any[];
    RuleObjectBtn: any[];
    RuleObjectFld: any[];
    RuleObjectCard: any[];
    RuleObjectBg: any[];
    RuleObjectStack: any[];
    RuleObjectPart: any[];
    RuleObjectSpecial: any[];
    RuleOf: any[];
    RuleOrdinal: any[];
    RulePosition: any[];
    RuleMenuItem: any[];
    RuleMenu: any[];
    RuleWindow_1: any[];
    RuleWindow: any[];
    RuleMessageBox: any[];
    RuleHSimpleContainer: any[];
    RuleHContainer: any[];
    RuleHChunk: any[];
    RuleHChunkBound: any[];
    RuleHSource: any[];
    RuleHSource_1: any[];
    RuleHFnCallWParens: any[];
    RuleHUnaryPropertyGet: any[];
    RuleHOldStyleFnNonNullary: any[];
    RuleHOldStyleFnNullaryOrNullaryPropGet: any[];
    RuleHGenericFunctionCall: any[];
    RuleFnCallNumberOf: any[];
    RuleFnCallNumberOf_1: any[];
    RuleFnCallNumberOf_5: any[];
    RuleFnCallNumberOf_6: any[];
    RuleFnCallNumberOf_7: any[];
    RuleFnCallNumberOf_8: any[];
    RuleFnCallNumberOf_9: any[];
    RuleFnCallThereIs: any[];
    RuleAnyPropertyVal: any[];
    RuleExpr: any[];
    RuleLvl1Expression: any[];
    RuleLvl2Expression: any[];
    RuleLvl3Expression: any[];
    RuleLvl4Expression: any[];
    RuleLvl5Expression: any[];
    RuleLvl6Expression: any[];
    RuleAndOrOr: any[];
    RuleContainsOrGreaterLessEqual: any[];
    RuleIsExpression: any[];
    RuleBuiltinCmdAdd: any[];
    RuleBuiltinCmdAnswer: any[];
    RuleBuiltinCmdAsk: any[];
    RuleBuiltinCmdBeep: any[];
    RuleBuiltinCmdVpccalluntrappablechoose: any[];
    RuleBuiltinCmdClick: any[];
    RuleBuiltinCmdDelete: any[];
    RuleBuiltinCmdDial: any[];
    RuleBuiltinCmdDisable: any[];
    RuleBuiltinCmdDivide: any[];
    RuleBuiltinCmdDomenu: any[];
    RuleBuiltinCmdVpccalluntrappabledomenu: any[];
    RuleBuiltinCmdDrag: any[];
    RuleHBuiltinCmdDrag_1: any[];
    RuleBuiltinCmdEnable: any[];
    RuleBuiltinCmdInternalvpcgocardimpl: any[];
    RuleHBuiltinCmdGoDest: any[];
    RuleBuiltinCmdHide: any[];
    RuleBuiltinCmdMark: any[];
    RuleBuiltinCmdMultiply: any[];
    RuleBuiltinCmdPlay: any[];
    RuleBuiltinCmdPut: any[];
    RuleBuiltinCmdReset: any[];
    RuleBuiltinCmdReplace: any[];
    RuleBuiltinCmdSelect: any[];
    RuleBuiltinCmdSend: any[];
    RuleBuiltinCmdSet: any[];
    RuleBuiltinCmdShow: any[];
    RuleBuiltinCmdInternalvpcsort: any[];
    RuleBuiltinCmdStart: any[];
    RuleBuiltinCmdStop: any[];
    RuleBuiltinCmdSubtract: any[];
    RuleBuiltinCmdUnlock: any[];
    RuleBuiltinCmdVisual: any[];
    RuleBuiltinCmdWait: any[];
    RuleInternalCmdRequestEval: any[];
    RuleInternalCmdUserHandler: any[];
    tkStringLiteral: ChvITk[];
    tkBlockComment: ChvITk[];
    tkLineComment: ChvITk[];
    tkContinuedLineOrWhiteSpace: ChvITk[];
    tkCardAtEndOfLine: ChvITk[];
    tkBgAtEndOfLine: ChvITk[];
    tkStackAtEndOfLine: ChvITk[];
    tkNewLine: ChvITk[];
    tkSyntaxPlaceholder: ChvITk[];
    tkNumLiteral: ChvITk[];
    tkStack: ChvITk[];
    tkBg: ChvITk[];
    tkBgPlural: ChvITk[];
    tkCard: ChvITk[];
    tkCardPlural: ChvITk[];
    tkBtn: ChvITk[];
    tkBtnPlural: ChvITk[];
    tkFld: ChvITk[];
    tkFldPlural: ChvITk[];
    tkPart: ChvITk[];
    tkPartPlural: ChvITk[];
    tkTopObject: ChvITk[];
    tkAdjective: ChvITk[];
    tkOrdinal: ChvITk[];
    tkPosition: ChvITk[];
    tkChunkGranularity: ChvITk[];
    tkInOnly: ChvITk[];
    tkOfOnly: ChvITk[];
    tkA: ChvITk[];
    _not: ChvITk[];
    _there: ChvITk[];
    _is: ChvITk[];
    _no: ChvITk[];
    _and: ChvITk[];
    _or: ChvITk[];
    _contains: ChvITk[];
    _within: ChvITk[];
    _the: ChvITk[];
    _message: ChvITk[];
    _window: ChvITk[];
    _windows: ChvITk[];
    _box: ChvITk[];
    _me: ChvITk[];
    _target: ChvITk[];
    _recent: ChvITk[];
    _back: ChvITk[];
    _forth: ChvITk[];
    _marked: ChvITk[];
    _to: ChvITk[];
    _menuItem: ChvITk[];
    _menu: ChvITk[];
    _id: ChvITk[];
    _number: ChvITk[];
    _selection: ChvITk[];
    tkComma: ChvITk[];
    tkLParen: ChvITk[];
    tkRParen: ChvITk[];
    tkPlusOrMinus: ChvITk[];
    tkMultDivideExpDivMod: ChvITk[];
    tkStringConcat: ChvITk[];
    tkGreaterOrLessEqualOrEqual: ChvITk[];
    tkIdentifier: ChvITk[];
    tkAllUnaryPropertiesIfNotAlready: ChvITk[];
    tkAllNullaryOrUnaryPropertiesIfNotAlready: ChvITk[];
}

/* generated code, any changes above this point will be lost: --------------- */

interface VisitingContextWithin {
    name: string;
    children: VisitingContext;
}