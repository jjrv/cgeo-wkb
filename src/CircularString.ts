// This file is part of cgeo-wkb, copyright (c) 2017 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import * as cgeo from 'cgeo';
import { Reader, Writer } from 'cbin';
import { OptionsWKB } from './Geometry';

@cgeo.mixin()
export class CircularString extends cgeo.CircularString {

	measureWKB() {
		return(cgeo.LineString.prototype.measureWKB.call(this));
	}

	writeWKB(writer: Writer, options: OptionsWKB) {
		return(cgeo.LineString.prototype.writeWKB.call(this, writer, options));
	}

	readWKB(reader: Reader, options: OptionsWKB) {
		return(cgeo.LineString.prototype.readWKB.call(this, reader, options));
	}

}
