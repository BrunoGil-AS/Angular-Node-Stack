class DataStorage<T> {
  constructor(private _storage: Array<T>) {}

  get storage(): Array<T> {
    return this._storage;
  }
  set storage(storage: Array<T>) {
    this._storage = storage;
  }
  addItem(item: T): void {
    this._storage.push(item);
  }
  removeItem(id: number): void {
    this._storage.splice(id, 1);
  }
  getAll(): Array<T> {
    return this._storage;
  }
}
