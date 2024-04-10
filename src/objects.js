export const priority = {
  LOW,
  MEDIUM,
  HIGH,
};

export const status = {
  NOT_STARTED,
  STARTED,
  WAITING,
  COMPLETED,
};

export const campaign_type = {
  GLOBAL,
  LOCAL,
  JOINT,
};

export const mission_type = {
  combat: {
    OFFENSIVE,
    DEFENSE,
    DETERRANCE,
    COUNTER_INSURGENCY,
    RECONNAISSANCE,
    PEACEKEEPING,
  },
  support: {
    LOGISTIC,
    MEDICAL,
    ENGINEERING,
    INTELIIGENCE,
    COMMUNICATION,
  },
  training: {
    PHYSICAL_TRAINING,
    INDIVIDUAL_TRAINING,
    UNIT_TRAINING,
    JOINT_TRAINING,
    SPECIALIZED_TRAINING,
  },
  SPECIAL_MISSION,
};

export const task_type = {
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
