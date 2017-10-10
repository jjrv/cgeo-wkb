// This file is part of cgeo-wkb, copyright (c) 2017 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import * as cgeo from 'cgeo';
import { Point as Super } from 'cgeo';
import { Reader, Writer } from 'cbin';
import { OptionsWKB } from './Geometry';

@cgeo.mixin(Super)
export class Point extends cgeo.mix(Super) {

	measureWKB() {
		return(21);
	}

	writeWKB(writer: Writer, options: OptionsWKB) {
		super.writeWKB(writer, options);

		writer.f64(this.pos[0]);
		writer.f64(this.pos[1]);
	}

	readWKB(reader: Reader, options: OptionsWKB) {
		this.pos[0] = reader.f64();
		this.pos[1] = reader.f64();
	}

}
