import React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';
import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import Task, {TaskPropsType} from "./Task";
import {TaskType} from "./App";

export default {
    title: 'Todolists/Task',
    component: Task
} as Meta;

const changeStatusCallback = action('Status changed')
const changeTaskTitleCallback = action('Title changed')
const removeTaskCallback = action('Remove Button')

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const baseArgs = {
    changeStatus: changeStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1',isDone: true, title: 'JS'},
    todolistId: 'todolistId1'
        }
;
export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '2',isDone: false, title: 'React'},
    todolistId: 'todolistId2'
        };

