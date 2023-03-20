# node-benchmark

## `Plain Object` Vs `Class` Vs `Array`

`obj` means plain javascript object such as `{ Xx: 1, Xy: 0, Yx: 0, Yy: 1, Tx: 0, Ty: 0 }`

`cls1` is for a class **with** field declarations **without** default value
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

`cls3` is for a class **with** field declarations and **with** default values
```javascript
class XfCls3 {
    Xx = -0;
    Xy = -0;
    Yx = -0;
    Yy = -0;
    Tx = -0;
    Ty = -0;
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

`arr1` stands for a number array of length 6 such as `[1, 0, 0, 1, 0, 0]`. In this case V8 chooses to use PACKED_SMI_ELEMENTS or PACKED_DOUBLE_ELEMENTS

`arr2` stands for a number array of length 6 in which all the values are forced to be float64 at creation time (PACKED_DOUBLE_ELEMENTS) `[-0 + 1, -0, -0, -0 + 1, -0, -0]`

`arr3`/`arr4` are the same as `arr1`/`arr2` but instead of using array destructuring to access its elements (`const [ Xx, Xy, Yx, Yy, Tx, Ty ] = arr`), we acces them one by one using the index : `const Xx = arr[0]`, `const Xy = arr[1]`, ...

## ReadnAndWrite Vs ReadOnly

By default the operation performed on the Xfs reads the values of 2 Xfs and write in the 3rd Xf. It is a read and write (`rw`) operation. To compare performance when only read operations are made on the xf, the option `ro` can be added as a second argument.

## How to run

`node main.js obj rw` or `node main.js obj ro` or `node main.js cls1 rw` or `node main.js cls1 ro`...


## run them all

`yarn run-all`

## results

| objType | rw time (ms) | ro time (ms)|
|---------|:------------:|------------:|
|  obj    | 3816         | 3816        |
|  cls1   | **12982**    | **2696**    |
|  cls2   | 2760         | 3314        |
|  cls3   | 2684         | 2899        |
|  arr1   | **15601**    | **17121**   |
|  arr2   | **5415**     | **8152**    |
|  arr3   | 2237         | 2111        |
|  arr4   | 2219         | 2055        |


## profiling

`node --cpu-prof --cpu-prof-name cls1_rw.cpuprofile  main.js cls1 rw` and open it with Chrome Dev Tools
