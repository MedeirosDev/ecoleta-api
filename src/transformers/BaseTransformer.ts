export default abstract class BaseTransformer<T> {
  abstract transform(entity: T): T;
}