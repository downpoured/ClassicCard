
/* auto */ import { VpcElType, checkThrow } from './../vpcutils/vpcEnums';
/* auto */ import { PropGetter, PropSetter, PrpTyp, VpcElBase, VpcElSizable, VpcHandleLinkedVels } from './velBase';
/* auto */ import { Util512, getEnumToStrOrFallback, getStrToEnum } from './../../ui512/utils/util512';
/* auto */ import { UI512BtnStyle } from './../../ui512/elements/ui512ElementButton';
/* auto */ import { TextFontSpec } from './../../ui512/drawtext/ui512DrawTextClasses';
/* auto */ import { UI512ComplexFontChanges } from './../../ui512/drawtext/ui512ComplexFontChanges';

/* (c) 2019 moltenform(Ben Fisher) */
/* Released under the GPLv3 license */

/**
 * a vipercard "button"
 */
export class VpcElButton extends VpcElSizable {
    protected _is_bg_velement_id = '';

    protected _autohilite = true;
    protected _enabled = true;
    protected _hilite = false;
    protected _hilite_uniquetocard = false;
    protected _checkmark = false;
    protected _checkmark_uniquetocard = false;
    protected _icon = 0;
    protected _showlabel = true;
    protected _style: number = VpcBtnStyle.Rectangle;
    protected _label = '';
    protected _textalign = 'center';
    protected _textfont = 'chicago';
    protected _textsize = 12;
    protected _textstyle = 0;
    protected _visible = true;
    protected _script = '';
    protected _name = '';

    protected _sharedhilite = true;

    constructor(id: string, parentId: string) {
        super(id, parentId);
    }

    /* cached getters */
    static cachedGetters: { [key: string]: PropGetter<VpcElBase> };

    /* cached setters */
    static cachedSetters: { [key: string]: PropSetter<VpcElBase> };

    /**
     * type of element
     */
    getType() {
        return VpcElType.Btn;
    }

    /**
     * re-use cached getters and setter callback functions for better perf
     */
    startGettersSetters() {
        VpcElButton.btnInit();
        this.getters = VpcElButton.cachedGetters;
        this.setters = VpcElButton.cachedSetters;
    }

    /**
     * define getters
     */
    static btnGetters(getters: { [key: string]: PropGetter<VpcElBase> }) {
        getters['textalign'] = [PrpTyp.Str, 'textalign'];
        getters['textstyle'] = [PrpTyp.Str, (me: VpcElButton) => UI512ComplexFontChanges.intToStyleList(me.getN('textstyle'))];
        getters['style'] = [
            PrpTyp.Str,
            (me: VpcElButton) => {
                let ret = getEnumToStrOrFallback(VpcBtnStyle, me.getN('style'));
                return ret.replace(/osstandard/g, 'standard').replace(/osdefault/g, 'default');
            }
        ];

        getters['hilite'] = [
            PrpTyp.Bool,
            (me: VpcElButton) => {
                let p = me.getB('sharedhilite') ? 'hilite' : 'hilite_uniquetocard';
                return me.getB(p);
            }
        ];

        getters['checkmark'] = [
            PrpTyp.Bool,
            (me: VpcElButton) => {
                let p = me.getB('sharedhilite') ? 'checkmark' : 'checkmark_uniquetocard';
                return me.getB(p);
            }
        ];
    }

    /**
     * define setters
     */
    static btnSetters(setters: { [key: string]: PropSetter<VpcElBase> }) {
        setters['name'] = [PrpTyp.Str, 'name'];
        setters['textstyle'] = [
            PrpTyp.Str,
            (me: VpcElButton, s: string, h: VpcHandleLinkedVels) => {
                let next = UI512ComplexFontChanges.setGeneralTextStyleAdvancedInt(me.getN('textstyle'), s);
                me.setOnVel('textstyle', next, h);
            }
        ];

        setters['style'] = [
            PrpTyp.Str,
            (me: VpcElButton, s: string, h: VpcHandleLinkedVels) => {
                let styl = getStrToEnum<VpcBtnStyle>(VpcBtnStyle, 'Button style', s);
                checkThrow((styl as any) !== VpcBtnStyle.Osboxmodal, '7D|this style is only supported internally');
                me.setOnVel('style', styl, h);
            }
        ];

        setters['textalign'] = [
            PrpTyp.Str,
            (me: VpcElButton, s: string, h: VpcHandleLinkedVels) => {
                s = s.toLowerCase().trim();
                if (s === 'left') {
                    me.setOnVel('textalign', 'left', h);
                } else if (s === 'center') {
                    me.setOnVel('textalign', 'center', h);
                } else {
                    checkThrow(false, `4z|we don't currently support setting text align to ${s}`);
                }
            }
        ];

        setters['hilite'] = [
            PrpTyp.Bool,
            (me: VpcElButton, v: boolean, h: VpcHandleLinkedVels) => {
                let p = me.getB('sharedhilite') ? 'hilite' : 'hilite_uniquetocard';
                me.setOnVel(p, v, h);
            }
        ];

        setters['checkmark'] = [
            PrpTyp.Bool,
            (me: VpcElButton, v: boolean, h: VpcHandleLinkedVels) => {
                let p = me.getB('sharedhilite') ? 'checkmark' : 'checkmark_uniquetocard';
                me.setOnVel(p, v, h);
            }
        ];
    }

    static simpleBtnGetSet(): [string, PrpTyp][] {
        return [
            ['autohilite', PrpTyp.Bool],
            ['sharedhilite', PrpTyp.Bool],
            ['enabled', PrpTyp.Bool],
            ['icon', PrpTyp.Num],
            ['label', PrpTyp.Str],
            ['showlabel', PrpTyp.Bool],
            ['visible', PrpTyp.Bool],
            ['textfont', PrpTyp.Str],
            ['textsize', PrpTyp.Num]
        ];
    }

    /**
     * define getters and setters
     */
    static btnInit() {
        if (!VpcElButton.cachedGetters || !VpcElButton.cachedSetters) {
            VpcElButton.cachedGetters = {};
            VpcElButton.cachedSetters = {};
            VpcElBase.simpleGetSet(VpcElButton.cachedGetters, VpcElButton.cachedSetters, VpcElButton.simpleBtnGetSet());
            VpcElButton.btnGetters(VpcElButton.cachedGetters);
            VpcElSizable.initSizeGetters(VpcElButton.cachedGetters);
            VpcElButton.btnSetters(VpcElButton.cachedSetters);
            VpcElSizable.initSizeSetters(VpcElButton.cachedSetters);
            Util512.freezeRecurse(VpcElButton.cachedGetters);
            Util512.freezeRecurse(VpcElButton.cachedSetters);
        }
    }

    /**
     * from internal textfont to "geneva_12_biuosdce"
     */
    getFontAsUI512() {
        let spec = new TextFontSpec(this.getS('textfont'), this.getN('textstyle'), this.getN('textsize'));
        return spec.toSpecString();
    }
}

/**
 * button styles
 */
export enum VpcBtnStyle {
    __isUI512Enum = 1,
    __UI512EnumCapitalize,
    Transparent = UI512BtnStyle.Transparent,
    Rectangle = UI512BtnStyle.Rectangle,
    Opaque = UI512BtnStyle.Opaque,
    Roundrect = UI512BtnStyle.RoundRect,
    Plain = UI512BtnStyle.Plain,
    Shadow = UI512BtnStyle.Shadow,
    Osstandard = UI512BtnStyle.OSStandard,
    Osdefault = UI512BtnStyle.OSDefault,
    Osboxmodal = UI512BtnStyle.OSBoxModal,
    Checkbox = UI512BtnStyle.Checkbox,
    Radio = UI512BtnStyle.Radio,
    __AlternateForm__Standard = UI512BtnStyle.OSStandard,
    __AlternateForm__Default = UI512BtnStyle.OSDefault,
    __AlternateForm__Rect = UI512BtnStyle.Rectangle
}
