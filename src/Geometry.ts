// This file is part of cgeo-wkb, copyright (c) 2017 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import * as cgeo from 'cgeo';
import { Reader, Writer, Endian } from 'cbin';

export interface OptionsWKB {
	endian: Endian;
}

export const wkbDefaults: OptionsWKB = {
	endian: Endian.little
};

export type This = Geometry & cgeo.Geometry;

@cgeo.mixin(cgeo.Geometry as any as { new(): cgeo.Geometry })
export class Geometry {

	measureWKB(this: This) { return(0); }

	readWKB(this: This, reader: Reader, options: OptionsWKB) {}

	writeWKB(this: This, writer: Writer, options: OptionsWKB, count?: number) {
		writer.data[writer.pos++] = writer.endian;
		writer.u32(this.kind);

		if(count || count === 0) writer.u32(count);
	}

	toWKB(this: This, options = wkbDefaults) {
		const writer = new Writer(new Uint8Array(this.measureWKB()));

		writer.endian = options.endian;
		this.writeWKB(writer, options);

		return(writer.data);
	}

	static readWKB(reader: Reader, options: OptionsWKB): cgeo.Geometry {
		reader.endian = reader.data[reader.pos++];

		const tag = reader.u32();
		const Type = cgeo.Geometry.typeList[tag];

		if(!Type) throw(new Error('Unknown WKB geometry type ' + tag));

		const geom = new Type();

		geom.readWKB(reader, options);

		return(geom);
	}

	static fromWKB(data: Uint8Array, options = wkbDefaults): cgeo.Geometry {
		return(Geometry.readWKB(new Reader(data), options));
	}

}
