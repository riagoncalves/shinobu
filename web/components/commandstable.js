import React from 'react';

const CommandsTable = (props) => {

	const handleDelete = (commandId) => {
		fetch(`/commands/${commandId}`, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then(response => response.json())
			.then(data => {
				if(data.success == true) return window.location.assign('/commands');
			})
			.catch(error => console.log(error));
	};

	return (
		<table className={`${props.title}`}>
			<thead>
				<tr>
					<th colSpan="5" className="title-white title-xsl bg-main">
						{props.title}
					</th>
				</tr>
				<tr>
					<th className="info-xsl info-white info-sbold">Name</th>
					<th className="info-xsl info-white info-sbold">Description</th>
					<th className="info-xsl info-white info-sbold">Usage</th>
					<th className="info-xsl info-white info-sbold">Aliases</th>
					{props.user && props.user.userID == process.env.ownerID &&
						<th className="info-xsl info-white info-sbold">Actions</th>}
				</tr>
			</thead>
			<tbody>
				{props.rows.map((row) => {
					return (
						<tr key={row.id}>
							<td className="info-xsl info-gray">{row.name}</td>
							<td className="info-xsl info-gray">{row.description}</td>
							<td className="info-xsl info-gray">{row.usage}</td>
							<td className="info-xsl info-gray">{row.aliases.join(', ')}</td>
							{props.user && props.user.userID == process.env.ownerID &&
								<td className="info-xsl info-gray flex flex-col">
									<a href={`/commands/${row.id}/edit`} className="info-white info-xsl">Edit</a>
									<a href='#' onClick={(e) => {
										e.preventDefault();
										handleDelete(row.id);
									}} className="info-white info-xsl">Delete</a>
								</td>}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default CommandsTable;