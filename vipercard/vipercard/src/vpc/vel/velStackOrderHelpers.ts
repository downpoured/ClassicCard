
/* auto */ import { VpcElStack } from './velStack';
/* auto */ import { VpcModelTop } from './velModelTop';
/* auto */ import { O } from './../../ui512/utils/util512Base';
/* auto */ import { ensureDefined } from './../../ui512/utils/util512Assert';

/* (c) 2019 moltenform(Ben Fisher) */
/* Released under the GPLv3 license */

export const StackOrderHelpers = /* static class */ {
    /**
     * position of card within the stack. return undefined if card not found
     */
    findCardStackPosition(stack: VpcElStack, cardId: string): O<number> {
        let cdids = stack.getCardOrder();
        let found = cdids.findIndex(s => s === cardId);
        return found === -1 ? undefined : found;
    },

    /**
     * position of card within the stack. throw if card not found
     */
    getCardStackPosition(stack: VpcElStack, cardId: string) {
        return ensureDefined(this.findCardStackPosition(stack, cardId), '4v|card id not found', cardId);
    },

    /**
     * position of card within the stack, to card. "go to card 6", which card is it?
     * 0-based index
     */
    findFromCardStackPosition(model: VpcModelTop, pos: number) {
        let cdids = model.stack.getCardOrder();
        if (pos >= 0 && pos < cdids.length) {
            return model.getCardById(cdids[pos]);
        } else {
            return undefined;
        }
    },

    /**
     * position of card within the stack, to card.
     * "go to card 6", which card is it? throws if not exist
     * 0-based index
     */
    getFromCardStackPosition(model: VpcModelTop, pos: number) {
        return ensureDefined(this.findFromCardStackPosition(model, pos), '4u|card number not found', pos);
    }
};
