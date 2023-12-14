import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem, type TaskItemOptions } from "@tiptap/extension-task-item";
import { Extension } from "@tiptap/core";
import type { ExtensionMeta } from "./index";

// Wrapper for TaskList + TaskItem
const TaskKit = Extension.create<TaskItemOptions>({
  name: "task",

  addExtensions() {
    return [TaskList, TaskItem.configure(this.options)];
  },
});

type Options = Pick<TaskItemOptions, "nested">;

const defaults: Options = {
  nested: false,
};

export type TaskProps = {
  taskItemNested: Options["nested"];
};

const extension: ExtensionMeta<Options, TaskProps> = {
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
