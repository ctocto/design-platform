import { Component } from 'react';
import PropTypes from 'prop-types';
import Tree from 'antd/lib/tree';

import styles from './Overview';

const { TreeNode } = Tree;

export default class Overview extends Component {
  static defaultProps = {
    data: [],
    activeComponentId: null,
    onActive() {},
  }
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      component: PropTypes.string,
      id: PropTypes.string,
      props: PropTypes.object,
    })),
    activeComponentId: PropTypes.string,
    onActive: PropTypes.func,
  }
  static renderNode = node => (
    <TreeNode
      title={node.component}
      key={node.id}
    >
      {
        node.children.length > 0 ?
          node.children.map(Overview.renderNode) :
          null
      }
    </TreeNode>
  )
  handleSelect = (keys) => {
    if (keys.length >= 0) {
      this.props.onActive(keys[0]);
    }
  }
  render() {
    const { data, activeComponentId } = this.props;
    return (
      <div>
        <Tree
          defaultExpandAll
          showLine
          selectedKeys={[activeComponentId]}
          onSelect={this.handleSelect}
        >
          { data.map(Overview.renderNode) }
        </Tree>
      </div>
    );
  }
}

