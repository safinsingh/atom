import React from "react";

class App extends React.Component {
	state = {
		elements: {},
	};

	newElement() {
		this.setState({
			...this.state,
			elements: {
				...this.state.elements,
				[Object.keys(this.state.elements).length + 1]: [
					{
						mass: "0",
						percentage: "0",
					},
				],
			},
		});
	}

	onChange(e) {
		if (e.target.placeholder === "mass") {
			this.setState({
				...this.state,
				elements: {
					...this.state.elements,
					[e.target.id]: {
						...this.state.elements[e.target.id],
						mass: e.target.value,
					},
				},
			});
		} else {
			this.setState({
				...this.state,
				elements: {
					...this.state.elements,
					[e.target.id]: {
						...this.state.elements[e.target.id],
						percentage: e.target.value,
					},
				},
			});
		}
	}

	render() {
		return (
			<div>
				<h1>get the atomic mass of an arbitrary atom</h1>
				<h1>
					{Object.keys(this.state.elements).length !== 0 &&
						Object.keys(this.state.elements)
							.reduce(
								(a, cv) =>
									a +
									parseFloat(
										this.state.elements[`${cv}`].mass
									) *
										parseFloat(
											this.state.elements[`${cv}`]
												.percentage
										) *
										0.01,
								0
							)
							.toFixed(3)}
				</h1>
				<button onClick={this.newElement.bind(this)}>
					new isotope
				</button>
				<br />
				{Object.keys(this.state.elements).map((e) => (
					<>
						<input
							value={this.state.elements[`${e}`].mass}
							placeholder='mass'
							id={e}
							onChange={this.onChange.bind(this)}
						/>
						<input
							value={this.state.elements[`${e}`].percentage}
							placeholder='percentage'
							id={e}
							onChange={this.onChange.bind(this)}
						/>
						<br />
					</>
				))}
			</div>
		);
	}
}

export default App;
