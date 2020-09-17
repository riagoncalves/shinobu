import React from 'react';

const CommandsTable = (props) => (
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
								<a href={`/commands/${row.id}/delete`} className="info-white info-xsl">Delete</a>
							</td>}
					</tr>
				);
			})}
		</tbody>
	</table>
);

export default CommandsTable;