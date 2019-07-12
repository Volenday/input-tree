import React, { Component } from 'react';
import { v1 } from 'uuid';
import SortableTree, { addNodeUnderParent, changeNodeAtPath, removeNodeAtPath } from 'react-sortable-tree';

export default class InputTree extends Component {
	renderTree() {
		const { id, onChange, value = '[]' } = this.props;
		const getNodeKey = ({ treeIndex }) => treeIndex;

		let newValue = JSON.parse(value);
		newValue = newValue.length != 0 ? newValue : [{ title: 'Root', id: 'root' }];

		return (
			<div style={{ height: 400 }}>
				<SortableTree
					treeData={newValue}
					onChange={d => onChange(id, JSON.stringify(d))}
					canDrag={true}
					generateNodeProps={({ node, path }) => ({
						title: (
							<input
								style={{ fontSize: 14, border: 0 }}
								value={node.title}
								class="form-control"
								onChange={async event => {
									const title = event.target.value;

									onChange(
										id,
										JSON.stringify(
											changeNodeAtPath({
												treeData: newValue,
												path,
												newNode: { ...node, title },
												getNodeKey
											})
										)
									);
								}}
							/>
						),
						buttons: [
							<a
								class="btn btn-flat btn-sm btn-success"
								onClick={e => {
									onChange(
										id,
										JSON.stringify(
											addNodeUnderParent({
												treeData: newValue,
												parentKey: path[path.length - 1],
												expandParent: true,
												getNodeKey,
												newNode: { title: 'New Children', id: v1() }
											}).treeData
										)
									);
								}}>
								<i class="fa fa-plus" />
							</a>,
							node.id !== 'root' && (
								<a
									style={{ marginLeft: 6 }}
									class="btn btn-flat btn-sm btn-danger"
									onClick={() => {
										onChange(
											id,
											JSON.stringify(
												removeNodeAtPath({
													treeData: newValue,
													path,
													getNodeKey
												})
											)
										);
									}}>
									<i class="fa fa-trash" />
								</a>
							)
						]
					})}
				/>
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
