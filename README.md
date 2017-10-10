cgeo-wkb
========

Adds WKB export support to [cgeo](https://github.com/charto/cgeo).

Usage
-----

```TypeScript
import * as cgeo from 'cgeo';
import 'cgeo-wkb';

const point = new cgeo.Point(12, 34);

console.log(Buffer.from(point.toWKB()).toString('hex'));
```

License
=======

[The MIT License](https://raw.githubusercontent.com/charto/cgeo-wkb/master/LICENSE)

Copyright (c) 2017 BusFaster Ltd
