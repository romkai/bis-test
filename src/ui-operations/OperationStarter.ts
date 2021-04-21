class OperationCancelledError extends Error {
	message = 'Операция отменена';
}

class OperationStarter {
	execute<InputType, ResultType>(input: InputType, ComponentClassPromise: Promise<{ default: any }>): Promise<ResultType> {
		return ComponentClassPromise
			.then(({ default: ComponentClass }) => new Promise((resolve, reject) => {
				const root = document.getElementById('app');
				if (root === null) {
					reject(new Error('Element "app" not found'));
				} else {
					const finishOperation = (result: ResultType) => {
						console.log('OPERATION FINISHED, result: ', result);
						uiComponent.$destroy();
						root.removeChild(uiComponent.$el);
						resolve(result);
					};
					const cancelOperation = () => {
						console.log('OPERATION CANCELLED');
						uiComponent.$destroy();
						root.removeChild(uiComponent.$el);
						reject(new OperationCancelledError());
					};
					const uiComponent = new ComponentClass({
						propsData: {
							operationInput: input,
							finishOperation,
							cancelOperation,
						},
					});
					uiComponent.$mount();
					root.appendChild(uiComponent.$el);
				}
			}));
	}
}

export default new OperationStarter();
