export function createMission(
  name,
  description,
  type,
  priority,
  status,
  start_date,
  end_date,
  tasks,
  resources,
  progress,
  notes
) {
  const mission = {};
  mission.name = name;
  mission.description = description;
  mission.type = type;
  mission.start_date = start_date;
  mission.end_date = end_date;
  mission.priority = priority;
  mission.status = status;
  mission.tasks = tasks;
  mission.resources = resources;
  mission.progress = progress;
  mission.notes = notes;

  return mission;
}
