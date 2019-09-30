import _ from "lodash";

import { ADD_TASK, COMPLETE_TASK } from "./actionTypes";

const initialState = {
  tasks: []
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.task]
      };
    case COMPLETE_TASK:
      console.log(action.taskId);
      let newTasks = _.cloneDeep(state.tasks);
      for (let task of newTasks) {
        if (task.id === action.taskId) {
          task.complete = true;
        }
      }
      return {
        ...state,
        tasks: newTasks
      };

    default:
      return state;
  }
};
