// This file is part of cgeo-wkb, copyright (c) 2017 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import * as cgeo from 'cgeo';
import { LineString as Super } from 'cgeo';
import { Reader, Writer } from 'cbin';
import { OptionsWKB } from './Geometry';

@cgeo.mixin(Super)
export class LineString extends cgeo.mix(Super) {

	measureWKB() {
		return(9 + this.posList.length * 8);
	}

	writeWKB(writer: Writer, options: OptionsWKB) {
		super.writeWKB(writer, options, this.posList.length >> 1);

		for(let coord of this.posList) writer.f64(coord);
	}

	readWKB(reader: Reader, options: OptionsWKB) {
		const count = reader.u32() * 2;

		for(let num = 0; num < count; ++num) this.posList[num] = reader.f64();
	}

}
