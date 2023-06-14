"use strict";

function newObj(idx) {
    return { idx:idx, name:'', count: 0 }
}

function makeId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

//---------------------------------------------------------------------------------------
function main() {
    const args = process.argv.slice(2);
    const opType = args[0]

    if (opType !== 'op1' && opType !== 'op2') {
        throw new Error (`unknown operation type ${opType}`)
    }

    const N = 100000;

    const map = new Map()
    for (let i = 0; i < N; ++i) {
        const obj = newObj(i)
        const name = makeId(12)
        obj.name = name
        map.set(name, obj)
    }

    let cb
    if (opType === 'op1' ) {
        cb = () => {
            for (const [k, v] of map) {
                if (k !== v.name) {
                    v.count++
                    console.log(JSON.stringify(v))
                }
            }
        }
    }
    else {
        cb = () => {
            for (const {0:k, 1:v} of map) {
                if (k !== v.name) {
                    v.count++
                    console.log(JSON.stringify(v))
                }
            }
        }
    }

    const runCount = 1000;
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
