export const priority = [
  { name: "LOW" },
  { name: "MEDIUM" },
  { name: "HIGH" },
];

export const status = [
  { name: "NOT_STARTED" },
  { name: "STARTED" },
  { name: "WAITING" },
  { name: "COMPLETED" },
];

export const campaign_categories = [
  { name: "GLOBAL" , type:"none"},
  { name: "LOCAL" , type:"none"},
  { name: "JOINT" , type:"none"},
];

export const mission_categories = [
    { name: "OFFENSIVE", type:"Combat" },
    { name: "DEFENSE", type:"Combat" },
    { name: "DETERRANCE", type:"Combat" },
    { name: "COUNTER_INSURGENCY", type:"Combat" },
    { name: "RECONNAISSANCE", type:"Combat" },
    { name: "PEACEKEEPING", type:"Combat" },

    { name: "LOGISTIC", type:"Support" },
    { name: "MEDICAL", type:"Support" },
    { name: "ENGINEERING", type:"Support" },
    { name: "INTELIIGENCE", type:"Support" },
    { name: "COMMUNICATION", type:"Support" },

    { name: "PHYSICAL_TRAINING", type:"training" },
    { name: "INDIVIDUAL_TRAINING", type:"training" },
    { name: "UNIT_TRAINING", type:"training" },
    { name: "JOINT_TRAINING", type:"training" },
    { name: "SPECIALIZED_TRAINING", type:"training" },
    
    { name: "SPECIAL_MISSION", type:"SPECIAL_MISSION"}
];

export const task_categories = {
  combat: {
    ASSAULT,
    MOVEMENT_OF_CONTACT,
    EXPLOITATION,
    PURSUIT,
  },
  support: {
    AREA_DEFENSE,
    MOBILE_DEFENCE,
    SECURITY,
    RETROGRADE,
  },
  special: {
    RAID,
    AMBUSH,
    SABOTAGE,
  },
};

export const asset_type = {
  personal: {
    physical: {
      property,
      elctronic_devices: { smartphone },
      clothing: { tops, bottoms, outerwares, accesories },
      appliances,
    },
    financial: { cash, savings, investment, expenses },
    digital: { online_docs, subscriptions, digital_files, recharges },
    human: {
      skills,
      knowledge,
      experties,
      educational_certifications,
      professional_network,
    },
    time: {
      work_time,
      leisure_time,
      personal_development_time,
      family_time,
      socializing_time,
      rest_relax_time,
    },
    emotional: { relationships, support_systems },
    health: { exercise_equipment, health_insurance, medical_records },
    envionmental: { homespace, workspace, publicspace },
    social: { social_connections, social_network },
    storage: { storage_units, containers, digital_storage },
    mobility: { vehicle, bagpacks },
  },
  shared: {
    physical: {
      property,
      elctronic_devices: { smartphone },
      clothing: { tops, bottoms, outerwares, accesories },
      appliances,
    },
    financial: { cash, savings, investment, expenses },
    digital: { online_docs, subscriptions, digital_files, recharges },
    storage: { storage_units, containers, digital_storage },
    mobility: { vehicle, bagpacks },
  },
  community: {
    personal: {
      physical: {
        property,
        elctronic_devices: { smartphone },
        appliances,
      },
      financial: { cash, savings, investment, expenses },
      digital: { online_docs, subscriptions, digital_files, recharges },
      storage: { storage_units, containers, digital_storage },
      mobility: { public_transport },
    },
  },
};
