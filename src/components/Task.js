import React from "react";
import { Checkbox } from "antd";

class Task extends React.Component {
  // prevent unneeded rendering
  shouldComponentUpdate(nextProps) {
    // shallow compare of object
    return nextProps.task !== this.props.task;
  }

  render() {
    const { task, handleStatusChange } = this.props;

    let styles = {
      item: {
        display: "flex",
        flexShrink: 0,
        alignItems: "center",
        borderBottom: "solid 1px #E0E0E0",
        height: 46
      },
      title: {
        marginBottom: 0
      }
    };

    if (task.complete) {
      styles.title.textDecoration = "line-through";
    }

    return (
      <div style={styles.item}>
        <Checkbox
          checked={task.complete}
          style={{ marginRight: 8 }}
          onChange={event => handleStatusChange(task.id, event.target.checked)}
        />
        <h4 style={styles.title}>{task.title}</h4>
      </div>
    );
  }
}

export default Task;
