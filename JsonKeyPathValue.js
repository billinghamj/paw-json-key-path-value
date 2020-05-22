class JsonKeyPathValue {
	evaluate() {
		const obj = tryParseJson(this.json);
		const kp = this.keyPath;

		if (!obj)
			return null;

		if (!kp)
			return JSON.stringify(obj);

		const result = kp.split('.').reduce((a, c) => a[c], obj);

		if (result == null)
			return null;

		switch (typeof result) {
			case 'string':
				return result;

			case 'object':
				return JSON.stringify(result);

			default:
				return String(result);
		}
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
