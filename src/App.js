import React from "react";
import * as _ from "underscore";

class App extends React.Component {
	state = {
		elements: {},
	};

	newElement() {
		this.setState({
			...this.state,
			elements: {
				...this.state.elements,
				[Object.keys(this.state.elements).length + 1]: {
					mass: "0",
					percentage: "0",
				},
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

	delete(e) {
		const newState = {
			elements: _.omit(this.state.elements, e.target.id),
		};
		this.setState(newState);
	}

	render() {
		const { elements } = this.state;
		return (
			<div>
				<h1>get the atomic mass of an arbitrary atom</h1>
				<p>you copy paste the following</p>
				<h1>
					{Object.keys(elements).map((key, index) => (
						<>
							{elements[key].mass}*{elements[key].percentage}
							{Object.keys(elements).length >= 2 &&
								index + 1 !== Object.keys(elements).length && (
									<> + </>
								)}
						</>
					))}{" "}
					={" "}
					{Object.keys(elements).length !== 0 &&
						Object.keys(elements)
							.reduce(
								(a, cv) =>
									a +
									parseFloat(elements[`${cv}`].mass) *
										parseFloat(
											elements[`${cv}`].percentage
										) *
										0.01,
								0
							)
							.toFixed(2)}{" "}
					amu
				</h1>
				<button
					onClick={this.newElement.bind(this)}
					style={{ margin: "5px" }}
				>
					new isotope
				</button>
				<br />
				{Object.keys(elements).map((e) => (
					<>
						<input
							value={elements[`${e}`].mass}
							placeholder='mass'
							id={e}
							onChange={this.onChange.bind(this)}
							style={{ margin: "5px" }}
						/>
						<input
							value={elements[`${e}`].percentage}
							placeholder='percentage'
							id={e}
							onChange={this.onChange.bind(this)}
							style={{ margin: "5px", marginBottom: "5px" }}
						/>
						<button id={e} onClick={this.delete.bind(this)}>
							x
						</button>
						<br />
					</>
				))}
			</div>
		);
	}
}

export default App;
