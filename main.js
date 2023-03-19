"use strict";

//---------------------------------------------------------------------------------------
// XfObj
function newXfObj(Xx, Xy, Yx, Yy, Tx, Ty) {
    return { Xx, Xy, Yx, Yy, Tx, Ty };
}
//---------------------------------------------------------------------------------------
// XfCls1
class XfCls1 {
    Xx;
    Xy;
    Yx;
    Yy;
    Tx;
    Ty;
    constructor(Xx, Xy, Yx, Yy, Tx, Ty) {
        this.Xx = Xx;
        this.Xy = Xy;
        this.Yx = Yx;
        this.Yy = Yy;
        this.Tx = Tx;
        this.Ty = Ty;
    }
}

function newXfCls1(Xx, Xy, Yx, Yy, Tx, Ty) {
    return new XfCls1(Xx, Xy, Yx, Yy, Tx, Ty);
}
//---------------------------------------------------------------------------------------
// XfCls2
class XfCls2 {
    constructor(Xx, Xy, Yx, Yy, Tx, Ty) {
        this.Xx = Xx;
        this.Xy = Xy;
        this.Yx = Yx;
        this.Yy = Yy;
        this.Tx = Tx;
        this.Ty = Ty;
    }
}

function newXfCls2(Xx, Xy, Yx, Yy, Tx, Ty) {
    return new XfCls2(Xx, Xy, Yx, Yy, Tx, Ty);
}
//---------------------------------------------------------------------------------------

function readAndWriteProps(parent/*: Readonly<IXfObj>*/, child/*: Readonly<IXfObj>*/, out /*: IXfObj*/) {
    const { Xx: p_Xx, Xy: p_Xy, Yx: p_Yx, Yy: p_Yy, Tx: p_Tx, Ty: p_Ty } = parent;
    const { Xx: c_Xx, Xy: c_Xy, Yx: c_Yx, Yy: c_Yy, Tx: c_Tx, Ty: c_Ty } = child;
    out.Xx = p_Xx * c_Xx + p_Yx * c_Xy;
    out.Xy = p_Xy * c_Xx + p_Yy * c_Xy;
    out.Yx = p_Xx * c_Yx + p_Yx * c_Yy;
    out.Yy = p_Xy * c_Yx + p_Yy * c_Yy;
    out.Tx = p_Xx * c_Tx + p_Yx * c_Ty + p_Tx;
    out.Ty = p_Xy * c_Tx + p_Yy * c_Ty + p_Ty;
}

//---------------------------------------------------------------------------------------

function readPropsOnly(parent/*: Readonly<IXfObj>*/, child/*: Readonly<IXfObj>*/, out /*: IXfObj*/) {
    const { Xx: p_Xx, Xy: p_Xy, Yx: p_Yx, Yy: p_Yy, Tx: p_Tx, Ty: p_Ty } = parent;
    const { Xx: c_Xx, Xy: c_Xy, Yx: c_Yx, Yy: c_Yy, Tx: c_Tx, Ty: c_Ty } = child;
    const { Xx: o_Xx, Xy: o_Xy, Yx: o_Yx, Yy: o_Yy, Tx: o_Tx, Ty: o_Ty } = out;
    const Xx = o_Xx + p_Xx * c_Xx + p_Yx * c_Xy;
    const Xy = o_Xy + p_Xy * c_Xx + p_Yy * c_Xy;
    const Yx = o_Yx + p_Xx * c_Yx + p_Yx * c_Yy;
    const Yy = o_Yy + p_Xy * c_Yx + p_Yy * c_Yy;
    const Tx = o_Tx + p_Xx * c_Tx + p_Yx * c_Ty + p_Tx;
    const Ty = o_Ty + p_Xy * c_Tx + p_Yy * c_Ty + p_Ty;
    return Xx -Xy + Yx - Yy + Tx - Ty
}


//---------------------------------------------------------------------------------------
function main() {
    const args = process.argv.slice(2);
    const objType = args[0]

    let newXf
         if (objType === 'obj' ) { newXf = newXfObj  }
    else if (objType === 'cls1') { newXf = newXfCls1 }
    else if (objType === 'cls2') { newXf = newXfCls2 }
    else { throw new Error (`unknown object type ${objType}`) }

    let opType = 'rw'
    if (args[1]) {
        opType = args[1]
    }

    let op
         if (opType === 'rw') { op = readAndWriteProps }
    else if (opType === 'ro') { op = readPropsOnly     }
    else { throw new Error (`unknown operation type ${objType}`) }

    const N = 500;
    // --- Initialisation of 3 arrays of 2*N*N Xfs. Some with integer/smi values, other with double values
    const leftXfs = [];
    const rightXfs = [];
    const outXfs = [];
    for (let i = 0; i < N; ++i) {
        for (let j = 0; j < N; ++j) {
            leftXfs.push(newXf(i + 1, 0, j - 1, 0, i, j));
            leftXfs.push(newXf(i + 1.1, -0, j - 1.1, -0, i + 0.1, j + 0.1));
            rightXfs.push(newXf(i + 1.1, -0, j - 1.1, -0, i + 0.1, j + 0.1));
            rightXfs.push(newXf(i + 1, 0, j - 1, 0, i, j));
            outXfs.push(newXf(0.1, 0.1, 0.1, 0.1, 0.1, 0.1));
            outXfs.push(newXf(0.1, 0.1, 0.1, 0.1, 0.1, 0.1));
        }
    }

    // this the main operation that will be run multiple times to be measured
    const cb = () => {
        let leftK = 0;
        let rightK = 0;
        let outK = 0;0
        let x = 0
        for (let i = 0; i < N; ++i) {
            for (let j = 0; j < N; ++j) {
                x += op(leftXfs[leftK++], rightXfs[rightK++], outXfs[outK++]);
                x -= op(leftXfs[leftK++], rightXfs[rightK++], outXfs[outK++]);
            }
        }
    }

    const runCount = 200;
    const run = () => {
        for (let i = 0; i < runCount; ++i) {
            cb();
        }
    };
    run(); // warm up
    globalThis.gc?.(); // gc if possible
    const t0 = performance.now();
    run(); // bench
    const t1 = performance.now();
    const time = `${(t1 - t0).toFixed(0)}`;
    console.log(`objType = ${args[0]} - operation = ${opType} : ${time} ms.`);
}

main()
