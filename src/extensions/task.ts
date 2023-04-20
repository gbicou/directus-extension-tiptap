import { TaskList } from "@tiptap/extension-task-list";
import type { TaskItemOptions } from "@tiptap/extension-task-item";
import { TaskItem } from "@tiptap/extension-task-item";
import { Extension } from "@tiptap/core";
import type { IExtension } from "../extensions";

// Wrapper for TaskList + TaskItem
const TaskKit = Extension.create<TaskItemOptions>({
  name: "task",

  addExtensions() {
    return [TaskList, TaskItem.configure(this.options)];
  },
});

const defaults: Partial<TaskItemOptions> = {
  nested: false,
};

const extension: IExtension<typeof TaskKit> = {
  name: "task",
  title: "TaskList",
  package: "@tiptap/extension-task-(list|item)",
  group: "node",
  defaults,
  options: [
    {
      field: "taskItemNested",
      name: "Task list item nesting",
      type: "boolean",
      meta: {
        interface: "boolean",
        width: "half",
        note: "Whether the task items are allowed to be nested within each other",
      },
      schema: {
        default_value: defaults.nested,
      },
    },
  ],
  load(props) {
    return TaskKit.configure({
      nested: props.taskItemNested ?? defaults.nested,
    });
  },
};

export default extension;
