export function createAsset(
  name,
  type,
  quantity,
  description,
  value,
  location,
  status
) {
  const asset = {};
  asset.name = name;
  asset.type = type;
  asset.quantity = quantity;
  asset.description = description;
  asset.value = value;
  asset.location = location;
  asset.status = status;

  return asset;
}
