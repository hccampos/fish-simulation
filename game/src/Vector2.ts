/// <reference path="../definitions/goojs.d.ts" />

class Vector2 extends goo.Vector2 {
	constructor(x = 0, y = 0) {
		super(x, y);
	}

	/**
	 * Gets the current angle  of the vector going counterclockwise from the X
	 * axis to the Y axis.
	 *
	 * @returns {number}
	 *      The angle of the vector.
	 */
	public angle() : number {
		return Math.atan2(this.y, this.y);
	}

	/**
	 * Sets the angle of the vector going counterclockwise from the X axis to
	 * the Y axis.
	 *
	 * @param {number} angle
	 *      The new angle of the vector.
	 *
	 * @returns {Vector2}
	 *      Self, for chaining.
	 */
	setAngle(angle: number): Vector2 {
		var length = this.length();
		this.x = length * Math.cos(angle);
		this.y = length * Math.sin(angle);
		return this;
	}

	/**
	 * Sets the length of the vector to the specified value.
	 *
	 * @param {number} length
	 *      The new length of the vector.
	 *
	 * @returns {Vector2}
	 *      Self, for chaining.
	 */
	setLength(length: number): Vector2 {
		var angle = this.angle();
		this.x = length * Math.cos(angle);
		this.y = length * Math.sin(angle);
		return this;
	}

	/**
	 * Limits the length of the vector to the specified value.
	 *
	 * @param {number} limit
	 *      The maximum allowed length of the vector.
	 *
	 * @returns {Vector2}
	 *      Self, for chaining.
	 */
	limit(limit: number): Vector2 {
		var length = this.length();
		if (length > limit) {
			this.setLength(limit);
		}
		return this;
	}

	/**
	 * Sets the coordinates of the vector to random values in the interval
	 * [-scale * 0.5, scale * 0.5].
	 *
	 * @param {number} scale
	 *      The scale of the random numbers.
	 *
	 * @returns {Vector2}
	 *      Self, for chaining.
	 */
	random(scale: number = 1.0): Vector2 {
		this.x = Math.random() * scale - scale * 0.5;
		this.y = Math.random() * scale - scale * 0.5;
		return this;
	}
}

export = Vector2;