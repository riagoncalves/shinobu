import React from 'react';

const CommandsTable = (props) => (
	<table>
		<thead>
			<tr>
				<th colSpan="4" className="title-white title-xsl bg-main">
					{props.title}
				</th>
			</tr>
			<tr>
				<th className="info-xsl info-white info-sbold">Name</th>
				<th className="info-xsl info-white info-sbold">Description</th>
				<th className="info-xsl info-white info-sbold">Usage</th>
				<th className="info-xsl info-white info-sbold">Aliases</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td className="info-xsl info-gray">activity</td>
				<td className="info-xsl info-gray">Switches bot's activity!</td>
				<td className="info-xsl info-gray">Write activity listening/playing/watching activity to use.</td>
				<td className="info-xsl info-gray">act, at</td>
			</tr>
			<tr>
				<td className="info-xsl info-gray">activity</td>
				<td className="info-xsl info-gray">Switches bot's activity!</td>
				<td className="info-xsl info-gray">Write activity listening/playing/watching activity to use.</td>
				<td className="info-xsl info-gray">act, at</td>
			</tr>
			<tr>
				<td className="info-xsl info-gray">activity</td>
				<td className="info-xsl info-gray">Switches bot's activity!</td>
				<td className="info-xsl info-gray">Write activity listening/playing/watching activity to use.</td>
				<td className="info-xsl info-gray">act, at</td>
			</tr>
			<tr>
				<td className="info-xsl info-gray">activity</td>
				<td className="info-xsl info-gray">Switches bot's activity!</td>
				<td className="info-xsl info-gray">Write activity listening/playing/watching activity to use.</td>
				<td className="info-xsl info-gray">act, at</td>
			</tr>
		</tbody>
	</table>
);

export default CommandsTable;