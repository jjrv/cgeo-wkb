// This file is part of cgeo-wkb, copyright (c) 2017 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import * as cgeo from 'cgeo';
import { Reader, Writer } from 'cbin';
import { OptionsWKB } from './Geometry';

@cgeo.mixin()
export class CurvePolygon extends cgeo.CurvePolygon {

	measureWKB() {
		return(cgeo.MultiCurve.prototype.measureWKB.call(this));
	}

	writeWKB(writer: Writer, options: OptionsWKB) {
		return(cgeo.MultiCurve.prototype.writeWKB.call(this, writer, options));
	}

	readWKB(reader: Reader, options: OptionsWKB) {
		return(cgeo.MultiCurve.prototype.readWKB.call(this, reader, options));
	}

}
