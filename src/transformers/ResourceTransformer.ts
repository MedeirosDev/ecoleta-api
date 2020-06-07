import BaseTransformer from "./BaseTransformer";

export default class ResourceTransforme<T> {
	private transformer: BaseTransformer<T>;
	
	constructor(transformer: BaseTransformer<T>) {
		this.transformer = transformer;
	}

	transform(entities: T[]): T[] {
		return entities.map(entity => this.transformer.transform(entity));
	}
}