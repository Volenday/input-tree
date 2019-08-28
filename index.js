import React, { Component } from 'react';
import { v1 } from 'uuid';
import SortableTree, { addNodeUnderParent, changeNodeAtPath, removeNodeAtPath } from 'react-sortable-tree';

// antd
import Tree from 'antd/es/tree';

// antd css
import 'antd/es/tree/style/css';

export default class InputTree extends Component {
	renderTree() {
		const { id, onChange, value = '[]' } = this.props;
		const getNodeKey = ({ treeIndex }) => treeIndex;

		let newValue = JSON.parse(value);
		newValue = newValue.length != 0 ? newValue : [{ title: 'Root', key: 'root' }];

		return (
			<div style={{ height: 400 }}>
				<Tree draggable showLine selectable={false} treeData={newValue || []} />
			</div>
		);
	}

	render() {
		const { id, label = '', withLabel = false, required = false } = this.props;

		if (withLabel) {
			return (
				<div class="form-group">
					<label for={id}>{required ? `*${label}` : label}</label>
					{this.renderTree()}
				</div>
			);
		} else {
			return this.renderTree();
		}
	}
}
