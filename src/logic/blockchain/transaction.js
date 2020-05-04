
export class Transaction {
  constructor(source, target, value, time, signature) {
    this.source = source;
    this.target = target;
    this.value = value;
    this.time = time;
    this.signature = signature;
  }

  getSource() {
    return this.source;
  }

  getTarget() {
    return this.target;
  }

  getValue() {
    return this.value;
  }

  getTime() {
    return this.time;
  }

  getSignature() {
    return this.signature;
  }

}