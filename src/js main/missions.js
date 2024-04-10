// missions.js

// Function to create a new mission for a campaign
function createMission(campaignIndex, newMission) {
    let campaigns = readAllItems('campaigns');
    if (campaigns[campaignIndex]) {
        createItem(`campaigns[${campaignIndex}].missions`, newMission);
    } else {
        console.error(`Campaign at index ${campaignIndex} not found.`);
    }
}

// Function to read all missions of a campaign
function readAllMissions(campaignIndex) {
    let campaigns = readAllItems('campaigns');
    return campaigns[campaignIndex]?.missions || [];
}

// Function to update a specific property of a mission
function updateMissionProperty(campaignIndex, missionIndex, property, value) {
    updateItemProperty('campaigns', campaignIndex, `missions[${missionIndex}].${property}`, value);
}

// Function to delete a mission from a campaign
function deleteMission(campaignIndex, missionIndex) {
    deleteItem('campaigns', campaignIndex, missionIndex);
}

function populateCampaignsDropdown() {
    const campaignSelect = document.getElementById("campaignSelect");
    //campaignsData is an array of campaign objects fetched from localStorage
    let campaignsData = readAllCampaigns();

    campaignsData.forEach((campaign, index) => {
      const option = document.createElement("option");
      option.value = index.toString(); // Set value as index for easy retrieval
      option.textContent = campaign.name;
      campaignSelect.appendChild(option);
    });
  }
  
// Handle Form Input
function handleMissionForm() {
    const form = document.getElementById("missionForm");
    const formData = new FormData(form);
    const newMission = {};
  
    formData.forEach((value, key) => {
      newMission[key] = value;
    });

    const campaignIndex = parseInt(document.getElementById('campaignIndex').value);
    createMission(campaignIndex, newMission);
    
    form.reset();
  }