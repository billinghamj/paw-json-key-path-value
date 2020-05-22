class JsonKeyPathValue {
	evaluate() {
		const json = tryParseJson(this.json);

		if (!json || !this.keyPath)
			return json;

		return this.key.split('.').reduce((a, c) => a[c], json);
	}
}

JsonKeyPathValue.identifier = 'com.jamesbillingham.JsonKeyPathValue';
JsonKeyPathValue.title = 'JSON key path';

JsonKeyPathValue.inputs = [
	InputField('json', 'JSON input', 'String', {
		persisted: true,
		defaultValue: '{}',
	}),
	InputField('keyPath', 'Key path', 'String', {
		persisted: true,
		placeholder: 'foo.bar',
	}),
];

registerDynamicValueClass(JsonKeyPathValue);

function tryParseJson(json) {
	try {
		return JSON.parse(json);
	} catch (e) {
		return null;
	}
}
