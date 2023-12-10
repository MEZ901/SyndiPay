import NotFoundError from "../infrastructure/exceptions/NotFoundError.js";

class Container {
  constructor() {
    this.dependencies = {};
  }

  register(name, dependency) {
    this.dependencies[name] = dependency;
  }

  resolve(name) {
    if (this.dependencies[name]) {
      return this.dependencies[name];
    }
    throw new NotFoundError(`Dependency '${name}' not found`);
  }
}

export default new Container();
