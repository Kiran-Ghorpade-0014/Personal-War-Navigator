export function createProgress(completed, total, completion_percentage) {
  const progress = {};
  progress.completed = completed;
  progress.total = total;
  progress.completion_percentage = completion_percentage;

  return progress;
}
