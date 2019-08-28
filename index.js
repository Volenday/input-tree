import React, { Component } from 'react';
import { Form, Tree } from 'antd';

export default class InputTree extends Component {
	renderTree() {
		const { value = '[]' } = this.props;

		let newValue = JSON.parse(value);
		newValue = newValue.length != 0 ? newValue : [{ title: 'Root', key: 'root' }];

		return (
			<div style={{ height: 400 }}>
				<Tree draggable showLine selectable={false} treeData={newValue || []} />
			</div>
		);
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
