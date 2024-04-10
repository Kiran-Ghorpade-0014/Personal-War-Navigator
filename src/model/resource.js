export function createResources(time, funds, assets) {
  const resources = {};
  resources.time = time;
  resources.funds = funds;
  resources.assets = assets;

  return resources;
}
