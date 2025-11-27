export default class TaskService {
  constructor(private _apiUrl: string) {}
  getTasks() {
    console.log(`Fetching tasks from ${this.apiUrl}`);
    // Simulate fetching tasks
    return [{ id: 1, title: "Sample Task" }];
  }

  set apiUrl(url: string) {
    this._apiUrl = url;
  }
  get apiUrl() {
    return this._apiUrl;
  }
}
