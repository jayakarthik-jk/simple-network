"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array(this.rows)
            .fill(0)
            .map(() => Array(this.cols).fill(0));
    }
    static fromArray(arr) {
        return new Matrix(arr.length, 1).map((_, i) => arr[i]);
    }
    toArray() {
        return this.data.reduce((arr, row) => arr.concat(row), []);
    }
    randomize() {
        return this.map((_) => Math.random() * 2 - 1);
    }
    dot(matrix) {
        if (this.cols !== matrix.rows) {
            throw new Error("Invalid dimensions for matrix multiplication");
        }
        const result = new Matrix(this.rows, matrix.cols);
        for (let i = 0; i < this.rows; i++) {
            result.data[i] = [];
            for (let j = 0; j < matrix.cols; j++) {
                let sum = 0;
                for (let k = 0; k < this.cols; k++) {
                    sum += this.data[i][k] * matrix.data[k][j];
                }
                result.data[i][j] = sum;
            }
        }
        return result;
    }
    transpose() {
        const result = new Matrix(this.cols, this.rows);
        for (let i = 0; i < this.cols; i++) {
            result.data[i] = [];
            for (let j = 0; j < this.rows; j++) {
                result.data[i][j] = this.data[j][i];
            }
        }
        return result;
    }
    add(matrix) {
        if (this.rows !== matrix.rows || this.cols !== matrix.cols) {
            throw new Error(`Invalid dimensions for matrix addition ${this.rows}x${this.cols} + ${matrix.rows}x${matrix.cols}`);
        }
        const result = new Matrix(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++) {
            result.data[i] = [];
            for (let j = 0; j < this.cols; j++) {
                result.data[i][j] = this.data[i][j] + matrix.data[i][j];
            }
        }
        return result;
    }
    addScalar(scalar) {
        const result = new Matrix(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++) {
            result.data[i] = [];
            for (let j = 0; j < this.cols; j++) {
                result.data[i][j] = this.data[i][j] + scalar;
            }
        }
        return result;
    }
    multiply(matrix) {
        if (this.rows !== matrix.rows || this.cols !== matrix.cols) {
            throw new Error(`Invalid dimensions for matrix multiplication ${this.rows}x${this.cols} * ${matrix.rows}x${matrix.cols}`);
        }
        const result = new Matrix(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++) {
            result.data[i] = [];
            for (let j = 0; j < this.cols; j++) {
                result.data[i][j] = this.data[i][j] * matrix.data[i][j];
            }
        }
        return result;
    }
    multiplyScalar(scalar) {
        const result = new Matrix(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++) {
            result.data[i] = [];
            for (let j = 0; j < this.cols; j++) {
                result.data[i][j] = this.data[i][j] * scalar;
            }
        }
        return result;
    }
    subtract(matrixB) {
        const result = new Matrix(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++) {
            result.data[i] = [];
            for (let j = 0; j < this.cols; j++) {
                result.data[i][j] = this.data[i][j] - matrixB.data[i][j];
            }
        }
        return result;
    }
    map(fn) {
        const result = new Matrix(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++) {
            result.data[i] = [];
            for (let j = 0; j < this.cols; j++) {
                result.data[i][j] = fn(this.data[i][j], i, j);
            }
        }
        return result;
    }
}
exports.default = Matrix;
