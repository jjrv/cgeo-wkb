// This file is part of cgeo-wkb, copyright (c) 2017 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import * as cgeo from 'cgeo';
import { Reader, Writer } from 'cbin';
import { OptionsWKB } from './Geometry';

@cgeo.mixin()
export class GeometryCollection<Member extends cgeo.Geometry = cgeo.Geometry> extends cgeo.GeometryCollection {

	measureWKB() {
		let size = 9;

		for(let child of this.childList) {
			if(child) size += child.measureWKB();
		}

		return(size);
	}

	writeWKB(writer: Writer, options: OptionsWKB) {
		let count = 0;

		for(let child of this.childList) {
			if(child) ++count;
		}

		writer.u32(count);

		for(let child of this.childList) {
			if(child) child.writeFullWKB(writer, options);
		}
	}

	readWKB(reader: Reader, options: OptionsWKB) {
		const count = reader.u32();

		for(let num = 0; num < count; ++num) {
			this.addChild(cgeo.Geometry.readWKB(reader, options) as Member);
		}
	}

}
