import React from "react";
import { Card, Button, Input, Empty } from "antd";
import _ from "lodash";
import Task from "../components/Task";

class App extends React.Component {
  // add ref for input
  inputRef = React.createRef();
  state = {
    input: "",
    tasks: []
  };

  componentDidMount() {
    // focus on input when component was mounted
    // this.inputRef.current.focus();
  }

  handleTaskCreation = () => {
    const tasks = _.cloneDeep(this.state.tasks);

    /* 1. Create task object */
    const task = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 0,
      title: this.state.input,
      complete: false
    };

    /* 2. Update state */
    tasks.push(task);
    this.setState({ tasks, input: "" });
  };
  handleStatusChange = (taskId, complete) => {
    /* Do not mutate */
    let tasks = _.cloneDeep(this.state.tasks);

    /* 1. Find task & change status */
    for (let task of tasks) {
      if (task.id === taskId) {
        task.complete = complete;
        break;
      }
    }

    /* 2. Update task */
    this.setState({ tasks });
  };

  render() {
    let taskComponents = this.state.tasks.map(task => (
      <Task
        key={task.id}
        task={task}
        handleStatusChange={this.handleStatusChange}
      />
    ));
    if (taskComponents.length === 0) {
      taskComponents = <Empty />;
    }

    return (
      <div className="App">
        <div className="Content">
          <div
            style={{
              width: 400,
              display: "flex",
              justifyContent: "flex-end",
              paddingBottom: 8
            }}
          >
            <Input
              ref={this.inputRef}
              value={this.state.input}
              onChange={event => this.setState({ input: event.target.value })}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.handleTaskCreation();
                }
              }}
              placeholder="New task"
              style={{ marginRight: 8 }}
            />
            <Button type="primary" onClick={this.handleTaskCreation}>
              +Add
            </Button>
          </div>
          <Card
            style={{ width: 400 }}
            bodyStyle={{
              height: "100%",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div style={{ flexGrow: 1 }}>{taskComponents}</div>
          </Card>
        </div>
      </div>
    );
  }
}

export default App;
