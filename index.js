import React, { Component } from 'react';
import { Form, Tree, Tooltip } from 'antd';

export default class InputTree extends Component {
	renderTree() {
		const { value = '[]', toolTip = {} } = this.props;

		let newValue = JSON.parse(value);
		newValue = newValue.length != 0 ? newValue : [{ title: 'Root', key: 'root' }];

		const tree = (
			<div style={{ height: 400 }}>
				<Tree draggable showLine selectable={false} treeData={newValue || []} />
			</div>
		);

		return Object.keys(toolTip).length === 0 ? tree : <Tooltip {...toolTip}>{tree}</Tooltip>;
	}

	render() {
		const { label = '', required = false, withLabel = false } = this.props;

		const formItemCommonProps = {
			colon: false,
			label: withLabel ? label : false,
			required
		};

		return <Form.Item {...formItemCommonProps}>{this.renderTree()}</Form.Item>;
	}
}
