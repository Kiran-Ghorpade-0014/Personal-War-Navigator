export function createTask(
  name,
  description,
  type,
  priority,
  status,
  start_date,
  end_date,
  resources,
  notes
) {
  const task = {};
  task.name = name;
  task.description = description;
  task.type = type;
  task.start_date = start_date;
  task.end_date = end_date;
  task.priority = priority;
  task.status = status;
  task.tasks = tasks;
  task.resources = resources;
  task.notes = notes;

  return task;
}
