// This file is part of cgeo-wkb, copyright (c) 2017 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import * as cgeo from 'cgeo';
import { State } from './Geometry';

@cgeo.mixin()
export class LineString extends cgeo.LineString {

	measureWKB(state: State) {
		let size = 16;

		if(state.hasZ) size += 8;
		if(state.hasM) size += 8;

		return(9 + this.x.length * size);
	}

	writeWKB(state: State) {
		const writer = state.writer;
		const x = this.x;
		const y = this.y;
		const z = this.z;
		const m = this.m;
		const count = this.x.length;

		writer.u32(count);

		for(let num = 0; num < count; ++num) {
			if(state.flipXY) {
				writer.f64(y[num]);
				writer.f64(x[num]);
			} else {
				writer.f64(x[num]);
				writer.f64(y[num]);
			}

			if(state.hasZ) writer.f64((z && z[num]) || 0);
			if(state.hasM) writer.f64((m && m[num]) || 0);
		}
	}

	readWKB(state: State) {
		const reader = state.reader;
		const count = reader.u32();

		if(state.hasZ) this.z = [];
		if(state.hasM) this.m = [];

		for(let num = 0; num < count; ++num) {
			if(state.flipXY) {
				this.y[num] = reader.f64();
				this.x[num] = reader.f64();
			} else {
				this.x[num] = reader.f64();
				this.y[num] = reader.f64();
			}

			if(state.hasZ) this.z![num] = reader.f64();
			if(state.hasM) this.m![num] = reader.f64();
		}
	}

}
