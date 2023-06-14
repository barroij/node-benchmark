"use strict";

//---------------------------------------------------------------------------------------
// XfObj
function newXf4Obj(Xx, Xy, Yx, Yy) {
    return { Xx, Xy, Yx, Yy };
}
//---------------------------------------------------------------------------------------
// XfCls1
class XfCls1 {
    Xx;
    Xy;
    Yx;
    Yy;
    constructor(Xx, Xy, Yx, Yy) {
        this.Xx = Xx;
        this.Xy = Xy;
        this.Yx = Yx;
        this.Yy = Yy;
    }
}

function newXf4Cls1(Xx, Xy, Yx, Yy) {
    return new XfCls1(Xx, Xy, Yx, Yy);
}

//---------------------------------------------------------------------------------------
// XfCls2
class XfCls2 {
    constructor(Xx, Xy, Yx, Yy) {
        this.Xx = Xx;
        this.Xy = Xy;
        this.Yx = Yx;
        this.Yy = Yy;
    }
}

function newXf4Cls2(Xx, Xy, Yx, Yy) {
    return new XfCls2(Xx, Xy, Yx, Yy);
}

//---------------------------------------------------------------------------------------
// XfCls3
class XfCls3 {
    Xx = -0;
    Xy = -0;
    Yx = -0;
    Yy = -0;
    constructor(Xx, Xy, Yx, Yy) {
        this.Xx = Xx;
        this.Xy = Xy;
        this.Yx = Yx;
        this.Yy = Yy;
    }
}

function newXf4Cls3(Xx, Xy, Yx, Yy) {
    return new XfCls3(Xx, Xy, Yx, Yy);
}


//---------------------------------------------------------------------------------------
function newXf4Arr1(Xx, Xy, Yx, Yy) {
    return [Xx, Xy, Yx, Yy];
}

//---------------------------------------------------------------------------------------
function newXf4Arr2(Xx, Xy, Yx, Yy) {
    return [-0 + Xx, -0 + Xy, -0 + Yx, -0 + Yy];
}

//---------------------------------------------------------------------------------------
function readAndWriteProps_obj(parent/*: Readonly<IXfObj>*/, child/*: Readonly<IXfObj>*/, out /*: IXfObj*/) {
    const { Xx: p_Xx, Xy: p_Xy, Yx: p_Yx, Yy: p_Yy } = parent;
    const { Xx: c_Xx, Xy: c_Xy, Yx: c_Yx, Yy: c_Yy } = child;
    const Xx = (out.Xx = p_Xx * c_Xx + p_Yx * c_Xy);
    const Xy = (out.Xy = p_Xy * c_Xx + p_Yy * c_Xy);
    const Yx = (out.Yx = p_Xx * c_Yx + p_Yx * c_Yy);
    const Yy = (out.Yy = p_Xy * c_Yx + p_Yy * c_Yy);
    // retun a value the is non-sense, but that should be roughly the same as the one returned by readPropsOnly
    return (0.1 + Xx) - (-0.1 + Xy) + (0.1 + Yx) - (-0.1 + Yy);
}

//---------------------------------------------------------------------------------------

function readPropsOnly_obj(parent/*: Readonly<IXfObj>*/, child/*: Readonly<IXfObj>*/, out /*: Readonly<IXfObj>*/) {
    const { Xx: p_Xx, Xy: p_Xy, Yx: p_Yx, Yy: p_Yy } = parent;
    const { Xx: c_Xx, Xy: c_Xy, Yx: c_Yx, Yy: c_Yy } = child;
    const { Xx: o_Xx, Xy: o_Xy, Yx: o_Yx, Yy: o_Yy } = out;
    const Xx =  o_Xx + p_Xx * c_Xx + p_Yx * c_Xy;
    const Xy = -o_Xy + p_Xy * c_Xx + p_Yy * c_Xy;
    const Yx =  o_Yx + p_Xx * c_Yx + p_Yx * c_Yy;
    const Yy = -o_Yy + p_Xy * c_Yx + p_Yy * c_Yy;
    return Xx - Xy + Yx - Yy;  // retun a value the is non-sense
}

//---------------------------------------------------------------------------------------
function readAndWriteProps_arr(parent/*: ReadonlyArray<number>*/, child/*: ReadonlyArray<number>*/, out /*: Array<number>*/) {
    const [ p_Xx, p_Xy, p_Yx, p_Yy ] = parent;
    const [ c_Xx, c_Xy, c_Yx, c_Yy ] = child;
    const Xx = (out[0] = p_Xx * c_Xx + p_Yx * c_Xy);
    const Xy = (out[1] = p_Xy * c_Xx + p_Yy * c_Xy);
    const Yx = (out[2] = p_Xx * c_Yx + p_Yx * c_Yy);
    const Yy = (out[3] = p_Xy * c_Yx + p_Yy * c_Yy);
    // retun a value the is non-sense, but that should be roughly the same as the one returned by readPropsOnly
    return (0.1 + Xx) - (-0.1 + Xy) + (0.1 + Yx) - (-0.1 + Yy);
}


//---------------------------------------------------------------------------------------
function readPropsOnly_arr(parent/*: ReadonlyArray<number>*/, child/*: ReadonlyArray<number>*/, out /*: ReadonlyArray<number>*/) {
    const [ p_Xx, p_Xy, p_Yx, p_Yy ] = parent;
    const [ c_Xx, c_Xy, c_Yx, c_Yy ] = child;
    const [ o_Xx, o_Xy, o_Yx, o_Yy ] = out;
    const Xx =  o_Xx + p_Xx * c_Xx + p_Yx * c_Xy;
    const Xy = -o_Xy + p_Xy * c_Xx + p_Yy * c_Xy;
    const Yx =  o_Yx + p_Xx * c_Yx + p_Yx * c_Yy;
    const Yy = -o_Yy + p_Xy * c_Yx + p_Yy * c_Yy;
    return Xx - Xy + Yx - Yy; // retun a value the is non-sense
}

//---------------------------------------------------------------------------------------
function readAndWriteProps_arr2(parent/*: ReadonlyArray<number>*/, child/*: ReadonlyArray<number>*/, out /*: Array<number>*/) {
    const p_Xx = parent[0];
    const p_Xy = parent[1];
    const p_Yx = parent[2];
    const p_Yy = parent[3];
    const c_Xx = child[0];
    const c_Xy = child[1];
    const c_Yx = child[2];
    const c_Yy = child[3];
    const Xx = (out[0] = p_Xx * c_Xx + p_Yx * c_Xy);
    const Xy = (out[1] = p_Xy * c_Xx + p_Yy * c_Xy);
    const Yx = (out[2] = p_Xx * c_Yx + p_Yx * c_Yy);
    const Yy = (out[3] = p_Xy * c_Yx + p_Yy * c_Yy);
    // retun a value the is non-sense, but that should be roughly the same as the one returned by readPropsOnly
    return (0.1 + Xx) - (-0.1 + Xy) + (0.1 + Yx) - (-0.1 + Yy);
}

//---------------------------------------------------------------------------------------

function readPropsOnly_arr2(parent/*: ReadonlyArray<number>*/, child/*: ReadonlyArray<number>*/, out /*: ReadonlyArray<number>*/) {
    const p_Xx = parent[0];
    const p_Xy = parent[1];
    const p_Yx = parent[2];
    const p_Yy = parent[3];
    const c_Xx = child[0];
    const c_Xy = child[1];
    const c_Yx = child[2];
    const c_Yy = child[3];
    const o_Xx = out[0];
    const o_Xy = out[1];
    const o_Yx = out[2];
    const o_Yy = out[3];
    const Xx =  o_Xx + p_Xx * c_Xx + p_Yx * c_Xy;
    const Xy = -o_Xy + p_Xy * c_Xx + p_Yy * c_Xy;
    const Yx =  o_Yx + p_Xx * c_Yx + p_Yx * c_Yy;
    const Yy = -o_Yy + p_Xy * c_Yx + p_Yy * c_Yy;
    return Xx - Xy + Yx - Yy; // retun a value the is non-sense
}

//---------------------------------------------------------------------------------------
function main() {
    const args = process.argv.slice(2);
    const objType = args[0]
    let opType = 'rw'
    if (args[1]) {
        opType = args[1]
    }

    if (opType !== 'rw' && opType !== 'ro') {
        throw new Error (`unknown operation type ${objType}`)
    }

    let newXf4
    let op
         if (objType === 'obj' ) { newXf4 =  newXf4Obj; op = opType === 'rw' ?  readAndWriteProps_obj : readPropsOnly_obj; }
    else if (objType === 'cls1') { newXf4 = newXf4Cls1; op = opType === 'rw' ?  readAndWriteProps_obj : readPropsOnly_obj; }
    else if (objType === 'cls2') { newXf4 = newXf4Cls2; op = opType === 'rw' ?  readAndWriteProps_obj : readPropsOnly_obj; }
    else if (objType === 'cls3') { newXf4 = newXf4Cls3; op = opType === 'rw' ?  readAndWriteProps_obj : readPropsOnly_obj; }
    else if (objType === 'arr1') { newXf4 = newXf4Arr1; op = opType === 'rw' ?  readAndWriteProps_arr : readPropsOnly_arr; }
    else if (objType === 'arr2') { newXf4 = newXf4Arr2; op = opType === 'rw' ?  readAndWriteProps_arr : readPropsOnly_arr; }
    else if (objType === 'arr3') { newXf4 = newXf4Arr1; op = opType === 'rw' ? readAndWriteProps_arr2 : readPropsOnly_arr2; }
    else if (objType === 'arr4') { newXf4 = newXf4Arr2; op = opType === 'rw' ? readAndWriteProps_arr2 : readPropsOnly_arr2; }
    else { throw new Error (`unknown object type ${objType}`) }



    const N = 500;
    // --- Initialisation of 3 arrays of 2*N*N Xfs. Some with integer/smi values, other with double values
    const leftXfs = [];
    const rightXfs = [];
    const outXfs = [];
    for (let i = 0; i < N; ++i) {
        for (let j = 0; j < N; ++j) {
            leftXfs.push(newXf4(i + 1, 0, j - 1, 0));
            leftXfs.push(newXf4(i + 1.1, -0, j - 1.1, -0));
            rightXfs.push(newXf4(i + 1.1, -0, j - 1.1, -0));
            rightXfs.push(newXf4(i + 1, 0, j - 1, 0));
            outXfs.push(newXf4(0.1, 0.1, 0.1, 0.1));
            outXfs.push(newXf4(0.1, 0.1, 0.1, 0.1));
        }
    }

    // this the main operation that will be run multiple times to be measured
    let x = 0
    const cb = () => {
        let leftK = 0;
        let rightK = 0;
        let outK = 0;
        for (let i = 0; i < N; ++i) {
            for (let j = 0; j < N; ++j) {
                x = 0
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
    console.log(`xf4 : objType = ${args[0]} - operation = ${opType} : ${time} ms.`);
   // console.log(x)
}

main()
