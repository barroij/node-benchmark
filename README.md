# node-benchmark
micro-benchmark to challenge get the best out of v8

## `obj` Vs `cls1` Vs `cls2`

`obj` means plain javascript object such as `{ Xx: 1, Xy: 0, Yx: 0, Yy: 1, Tx: 0, Ty: 0 }`

`cls1` is for a class **with** field declarations as typescript or babel might generate them
```javascript
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
```

`cls2` is for a class **without** field declarations such as
```javascript
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
```

## How to run

`node main.js obj`

`node main.js cls1`

`node main.js cls2`


## Variations

By default the operation performed on the Xfs reads the values of 2 Xfs and write in the 3rd Xf. It is a read and write operation. To compare performance when only read operations are made on the xf, the option `ro` can be added as a secodn argument.

`node main.js obj ro`

`node main.js cls1 ro`

`node main.js cls2 ro`


## run them all

`node main.js obj rw && node main.js obj ro && node main.js cls1 rw && node main.js cls1 ro && node main.js cls2 rw && node main.js cls2 ro`

## results

objType = obj - operation = rw : 3131 ms.

objType = obj - operation = ro : 2939 ms.

objType = cls1 - operation = rw : 12883 ms.

objType = cls1 - operation = ro : 1646 ms.

objType = cls2 - operation = rw : 2310 ms.

objType = cls2 - operation = ro : 2265 ms.
