import React, { Component } from 'react';
import { Form, Tree, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

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
		const { label = '', required = false, withLabel = false, toolTip = '' } = this.props;

		const formItemCommonProps = {
			colon: false,
			label: withLabel ? (
				<span class="label">
					{label}{' '}
					{toolTip && (
						<Tooltip title={toolTip}>
							<QuestionCircleOutlined />
						</Tooltip>
					)}
				</span>
			) : (
				false
			),
			required
		};

		return <Form.Item {...formItemCommonProps}>{this.renderTree()}</Form.Item>;
	}
}
