declare module goo {
    export class Matrix {
        constructor(rows: number, cols: number);

        static add(lhs: Matrix, rhs: Matrix, target: Matrix): Matrix;
        add(rhs: Matrix): Matrix;

        static sub(lhs: Matrix, rhs: Matrix, target: Matrix): Matrix;
        sub(rhs: Matrix): Matrix;

        static mul(lhs: Matrix, rhs: Matrix, target: Matrix): Matrix;
        mul(rhs: Matrix): Matrix;

        static div(lhs: Matrix, rhs: Matrix, target: Matrix): Matrix;
        div(rhs: Matrix): Matrix;

        static combine(lhs: Matrix, rhs: Matrix, target: Matrix): Matrix;
        combine(rhs: Matrix): Matrix;

        static transpose(source: Matrix, target: Matrix): Matrix;
        transpose(): Matrix;

        static copy(source: Matrix, target: Matrix): Matrix;
        copy(source): Matrix;

        static equals(lhs: Matrix, rhs: Matrix): boolean;
        equals(rhs: Matrix): boolean;

        isOrthogonal(): boolean;
        isNormal(): boolean;
        isOrthonormal(): boolean;

        clone(): Matrix;

        set(value: Matrix): Matrix;
        set(values: number[]): Matrix;
        set(...values: number[]): Matrix;

        toString(): string;
    }

    export class Vector {
        static add(lhs: Vector, rhs: Vector, target: Vector): Vector;
        add(rhs: Vector): Vector;

        static sub(lhs: Vector, rhs: Vector, target: Vector): Vector;
        sub(rhs: Vector): Vector;

        static mul(lhs: Vector, rhs: Vector, target: Vector): Vector;
        mul(rhs: Vector): Vector;
        mul(rhs: number): Vector;

        static div(lhs: Vector, rhs: Vector, target: Vector): Vector;
        div(rhs: Vector): Vector;
        div(rhs: number): Vector;

        static copy(source: Vector, target: Vector): Vector;
        copy(source: Vector): Vector;

        static dot(lhs: Vector, rhs: Vector): number;
        dot(rhs: Vector): number;

        static apply(lhs: Matrix, rhs: Vector, target: Vector): Vector;
        apply(lhs: Matrix): Vector;

        static equals(lhs: Vector, rhs: Vector): boolean;
        equals(rhs: Vector): boolean;

        static distanceSquared(lhs: Vector, rhs: Vector): number;
        distanceSquared(rhs: Vector): number;

        static distance(lhs: Vector, rhs: Vector): number;
        distance(rhs: Vector): number;

        lengthSquared(): number;
        length(): number;

        scale(factor: number): Vector;
        invert(): Vector;
        normalize(): Vector;
        clone(): Vector;

        set(value: Vector): Vector;
        set(values: number[]): Vector;
        set(...values: number[]): Vector;

        toString(): string;
    }

    export class Vector2 extends Vector {
	    x: number;
	    y: number;
	    data: number[];

        ZERO: Vector2;
        ONE: Vector2;
        UNIT_X: Vector2;
        UNIT_Y: Vector2;

        constructor(x: number, y: number);

        static add(lhs: Vector2, rhs: Vector2, target: Vector2): Vector2;
        add(rhs: Vector2): Vector2;

        static sub(lhs: Vector2, rhs: Vector2, target: Vector2): Vector2;
        sub(rhs: Vector2): Vector2;

        static mul(lhs: Vector2, rhs: Vector2, target: Vector2): Vector2;
        mul(rhs: Vector2): Vector2;
        mul(rhs: number): Vector2;

        static div(lhs: Vector2, rhs: Vector2, target: Vector2): Vector2;
        div(rhs: Vector2): Vector2;
        div(rhs: number): Vector2;

        static dot(lhs: Vector2, rhs: Vector2): number;
        dot(rhs: Vector2): number;
        dotVector(rhs: Vector2): number;

        reflect(normal: Vector2): Vector2;

        setDirect(x: number, y: number): Vector2;
        setArray(array: number[]): Vector2;
        setVector(vector: Vector2): Vector;

        addDirect(x: number, y: number): Vector2;
        addVector(vector: Vector2): Vector2;

        mulDirect(x: number, y: number): Vector2;
        mulVector(vector: Vector2): Vector2;

        subDirect(x: number, y: number): Vector2;
        subVector(vector: Vector2): Vector2;

        scale(factor: number): Vector2;

        clone(): Vector2;

        copy(vector: Vector2): Vector2;
        copyTo(vector: Vector2): Vector2;
    }
    
    export class MathUtils {
        static clamp(value: number, min: number, max: number): number;
    }
}

declare module 'goo' {
	export = goo;
}