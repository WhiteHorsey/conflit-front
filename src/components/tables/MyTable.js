import React from "react";
import Table from "react-bootstrap/Table";

function TableHead({ head }) {
	return (
		<thead>
			<tr>
				{head.map((item, index) => (
					<th key={index}>{item}</th>
				))}
			</tr>
		</thead>
	);
}

function MyTable(props) {
	return (
		<Table striped>
			<TableHead head={props.head} />
			<tbody>{props.children}</tbody>
		</Table>
	);
}

export default MyTable;
