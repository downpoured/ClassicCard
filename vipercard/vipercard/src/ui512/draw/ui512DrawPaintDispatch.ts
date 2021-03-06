
/* auto */ import { ModifierKeys } from './../utils/utilsKeypressHelpers';
/* auto */ import { CanvasWrapper } from './../utils/utilsCanvasDraw';
/* auto */ import { O } from './../utils/util512Base';
/* auto */ import { assertTrue, assertWarn } from './../utils/util512Assert';
/* auto */ import { Util512, assertEq } from './../utils/util512';
/* auto */ import { clrWhite, needsPatternSupport, simplifyPattern } from './ui512DrawPatterns';
/* auto */ import { UI512Painter } from './ui512DrawPainterClasses';
/* auto */ import { UI512PainterCvDataAndPatterns } from './ui512DrawPainter';

/* (c) 2019 moltenform(Ben Fisher) */
/* Released under the GPLv3 license */

/**
 * painted shapes supported
 */
export enum UI512PaintDispatchShapes {
    __isUI512Enum = 1,
    SmearPencil,
    SmearRectangle,
    SmearSmallBrush,
    SmearSpraycan,
    ShapeLine,
    ShapeRectangle,
    ShapeEllipse,
    ShapeRoundRect,
    ShapeCurve,
    Bucket,
    IrregularPolygon
}

/**
 * high-level interface for painting a shape on a canvas
 */
export class UI512PaintDispatch {
    mods: ModifierKeys;
    cardId: string;
    constructor(
        public shape: UI512PaintDispatchShapes,
        public xPts: number[],
        public yPts: number[],
        public color: number,
        public fillColor: number,
        public isFilled = true,
        public lineSize = 1
    ) {}

    /**
     * get arguments based on flags
     */
    static fromMemoryOpts(
        shape: UI512PaintDispatchShapes,
        isErase: boolean,
        fromOptsPattern: string,
        fromOptsFillcolor: number,
        fromOptsLineColor: number,
        fromOptsWide: boolean
    ) {
        let fill = fromOptsFillcolor;
        let isFilled = fromOptsFillcolor !== -1;
        if (shape === UI512PaintDispatchShapes.Bucket) {
            let pattern = fromOptsPattern;
            isFilled = true;
            fill = 0;
            if (pattern.startsWith('pattern')) {
                let npattern = Util512.parseInt(pattern.substr('pattern'.length));
                fill = npattern ?? 0;
            }
        }

        let ret = new UI512PaintDispatch(
            shape,
            [],
            [],
            fromOptsLineColor,
            fill,
            isFilled,
            fromOptsWide ? 5 : 1
        );
        if (isErase) {
            ret.color = clrWhite;
            ret.fillColor = clrWhite;
            ret.isFilled = true;
        }

        return ret;
    }

    /**
     * apply paint onto canvas
     */
    static go(args: UI512PaintDispatch, painter: UI512Painter) {
        let color: number = args.color;
        let fill: O<number> = args.isFilled ? simplifyPattern(args.fillColor) : undefined;
        if (args.shape !== UI512PaintDispatchShapes.Bucket) {
            assertTrue(
                !needsPatternSupport(color) && !needsPatternSupport(fill),
                'I=|not yet implemented (currently kinda slow when tested)'
            );
        }

        let xPts = args.xPts;
        let yPts = args.yPts;
        switch (args.shape) {
            case UI512PaintDispatchShapes.SmearPencil: {
                return painter.publicSmearPencil(xPts, yPts, color);
            }
            case UI512PaintDispatchShapes.SmearRectangle: {
                return painter.publicSmearRectangle(xPts, yPts, color, 16, 16);
            }
            case UI512PaintDispatchShapes.SmearSpraycan: {
                return painter.publicSmearSpraycan(xPts, yPts, color);
            }
            case UI512PaintDispatchShapes.SmearSmallBrush: {
                return painter.publicSmearSmallBrush(xPts, yPts, color);
            }
            case UI512PaintDispatchShapes.IrregularPolygon: {
                return painter.fillPolygon(
                    0,
                    0,
                    painter.getCanvasWidth(),
                    painter.getCanvasHeight(),
                    xPts,
                    yPts,
                    color
                );
            }
            case UI512PaintDispatchShapes.ShapeLine: {
                assertEq(2, xPts.length, 'I<|ShapeLine');
                assertEq(2, yPts.length, 'I;|ShapeLine');
                return painter.publicStraightLine(
                    xPts[0],
                    yPts[0],
                    xPts[1],
                    yPts[1],
                    color,
                    args.lineSize
                );
            }
            case UI512PaintDispatchShapes.ShapeRectangle: {
                assertEq(2, xPts.length, 'I:|ShapeRectangle');
                assertEq(2, yPts.length, 'I/|ShapeRectangle');
                return painter.publicRectangle(
                    xPts[0],
                    yPts[0],
                    xPts[1],
                    yPts[1],
                    color,
                    fill,
                    args.lineSize
                );
            }
            case UI512PaintDispatchShapes.ShapeEllipse: {
                assertEq(2, xPts.length, 'I.|ShapeEllipse');
                assertEq(2, yPts.length, 'I-|ShapeEllipse');
                return painter.publicPlotEllipse(
                    xPts[0],
                    yPts[0],
                    xPts[1],
                    yPts[1],
                    color,
                    fill,
                    args.lineSize
                );
            }
            case UI512PaintDispatchShapes.ShapeRoundRect: {
                assertEq(2, xPts.length, 'I,|ShapeRoundRect');
                assertEq(2, yPts.length, 'I+|ShapeRoundRect');
                return painter.publicRoundRect(
                    xPts[0],
                    yPts[0],
                    xPts[1],
                    yPts[1],
                    color,
                    fill,
                    args.lineSize
                );
            }
            case UI512PaintDispatchShapes.ShapeCurve: {
                assertEq(3, xPts.length, 'I*|ShapeCurve');
                assertEq(3, yPts.length, 'I)|ShapeCurve');
                return painter.publicCurve(
                    xPts[0],
                    yPts[0],
                    xPts[1],
                    yPts[1],
                    xPts[2],
                    yPts[2],
                    color,
                    args.lineSize
                );
            }
            case UI512PaintDispatchShapes.Bucket: {
                assertEq(1, xPts.length, 'I(|Bucket');
                assertEq(1, yPts.length, 'I&|Bucket');
                return UI512PaintDispatch.paintBucketSlowButWorks(
                    painter,
                    xPts[0],
                    yPts[0],
                    fill ?? 0
                );
            }
            default: {
                assertWarn(false, 'I%|unknown shape', args.shape);
            }
        }
    }

    /**
     * the other shapes work against either a canvas or against raw data
     * this one needs to be against raw data, so might need to call getImageData.
     */
    static paintBucketSlowButWorks(
        painter: UI512Painter,
        x: number,
        y: number,
        fillPattern: number
    ) {
        fillPattern = simplifyPattern(fillPattern);
        if (painter.readPixelSupported()) {
            painter.floodFill(x, y, fillPattern);
        } else {
            /* unfortunately, we'll have to make a new painter that
            supports reading pixels */
            let cv: CanvasWrapper = painter.getBackingSurface();
            assertTrue(cv instanceof CanvasWrapper, 'I$|cv instanceof CanvasWrapper');
            const w = cv.canvas.width;
            const h = cv.canvas.height;
            let data = cv.context.getImageData(0, 0, w, h);

            let painterWithData = new UI512PainterCvDataAndPatterns(data.data, w, h);
            painterWithData.floodFill(x, y, fillPattern);
            cv.context.putImageData(data, 0, 0);
        }
    }
}
