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


