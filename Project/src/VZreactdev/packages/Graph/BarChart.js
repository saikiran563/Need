import React, { Component } from "react";

import {Bar,
    BarChart,   
    CartesianGrid,
    Cell,
    LabelList, 
    Legend,
    ResponsiveContainer,
    Tooltip, 
    XAxis, 
    YAxis,
} from 'recharts';

export default class VzwBarChart extends React.Component {

	render () {
		const { data, labelPrefix } = this.props;
		data.map(item => {
			if(!item.label)	item.label = labelPrefix + item.value;				
			if(typeof item.value !== 'Number') item.value = Number(item.value);
		});
		return (
			<ResponsiveContainer width="100%" height="100%">
				<BarChart  barSize={40} barGap="1" barCategoryGap="1" data={data} margin={{top: 15}}>
					<CartesianGrid strokeDasharray="3" vertical={false} />
					<XAxis dataKey="xAxisKey" />
					<Bar dataKey="value" fill="#0F87C9">
						{
							data.map((entry, index) => (
								<Cell opacity={(index/10) * 2 + 0.5}/>
							))
						}
						<LabelList opacity="1" dataKey="label" position="top"/>
					</Bar>
				</BarChart>
			</ResponsiveContainer>
			);
    }
}
