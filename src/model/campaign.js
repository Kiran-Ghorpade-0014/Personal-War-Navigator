export function createCampaign(
  name,
  description,
  type,
  priority,
  status,
  start_date,
  end_date,
  missions,
  resources,
  progress,
  notes
) {
  const campaign = {};
  campaign.name = name;
  campaign.description = description;
  campaign.type = type;
  campaign.start_date = start_date;
  campaign.end_date = end_date;
  campaign.priority = priority;
  campaign.status = status;
  campaign.missions = missions;
  campaign.resources = resources;
  campaign.progress = progress;
  campaign.notes = notes;

  return campaign;
}
