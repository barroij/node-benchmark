"use strict";

//---------------------------------------------------------------------------------------
function main() {
    const args = process.argv.slice(2);
    const opType = args[0]

    if (opType !== 'op1' && opType !== 'op2') {
        throw new Error (`unknown operation type ${opType}`)
    }

    const N = 100000;
    const arrays = []
    let cb
    if (opType === 'op1' ) {
        cb = () => {
            arrays.length = 0
            for (let i = 0; i < N; ++i) {
                arrays.push([0, 0, 0, 0, 0, 0])
            }

            for (let i = 0; i < N; ++i) {
                arrays[i][0] = 0.2
            }
        }
    }
    else {
        cb = () => {
            arrays.length = 0
            for (let i = 0; i < N; ++i) {
                arrays.push([0.1, 0, 0, 0, 0, 0])
            }

            for (let i = 0; i < N; ++i) {
                arrays[i][0] = 0.2
            }
        }
    }

    const runCount = 500;
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
    console.log(`Map for loop : operation = ${opType} : ${time} ms.`);
   // console.log(x)
}

main()
