import Matrix from "../lib/Matrix";

class Layer {
  inputs: Matrix;
  weights: Matrix;
  biases: Matrix;
  outputs: Matrix;
  constructor(
    public inputCount: number,
    public outputCount: number,
    public layerIndex: number
  ) {
    this.inputs = new Matrix(inputCount, 1);
    this.outputs = new Matrix(outputCount, 1);
    this.biases = new Matrix(outputCount, 1);
    this.weights = new Matrix(outputCount, inputCount);
    this.weights = this.weights.randomize();
  }
  static #activationFnx(x: number) {
    return Math.tanh(x);
  }
  static #activationFnxDerivative(x: number) {
    return 1 - x * x;
  }
  static async feedForward(layer: Layer, inputs: Matrix) {
    layer.inputs = inputs;

    layer.outputs = layer.weights
      .dot(layer.inputs)
      .add(layer.biases)
      .map(Layer.#activationFnx);

    return layer.outputs;
  }

  static async backPropagate(
    layer: Layer,
    errorNext: Matrix,
    learningRate: number
  ) {
    const gradient = layer.outputs.map(Layer.#activationFnxDerivative);
    const delta = errorNext.multiply(gradient).multiplyScalar(learningRate);
    layer.biases = layer.biases.add(delta);
    const weightsDelta = delta.dot(layer.inputs.transpose());
    layer.weights = layer.weights.add(weightsDelta);
    return layer.weights.transpose().dot(delta);
  }
}

export default Layer;
