export class Galery {
	#db;
	#currentIndex = 0;
	#galeryPath = './images/';
	constructor(source) {
		this.#db = source.map((el) => this.#galeryPath.concat(el));
	}

	getCurrent() {
		return this.#makeObject(this.#currentIndex);
	}

	setCurrent(index) {
		this.#currentIndex = parseInt(index);
	}

	getNext() {
		this.#currentIndex = (this.#currentIndex + 1) % this.#db.length;
		return this.#makeObject(this.#currentIndex);
	}

	getPrevious() {
		this.#currentIndex = (this.#currentIndex - 1 + this.#db.length) % this.#db.length;
		return this.#makeObject(this.#currentIndex);
	}

	getAll() {
		return this.#db;
	}

	#makeObject(index) {
		return { id: index, path: this.#db[index] };
	}
}
