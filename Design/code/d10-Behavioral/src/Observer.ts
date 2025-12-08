export default interface Observer<t> {
  update(arg: t): void;
}
