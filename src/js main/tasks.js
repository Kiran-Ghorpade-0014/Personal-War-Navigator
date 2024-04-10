// tasks.js

// Function to create a new task for a mission
function createTask(campaignIndex, missionIndex, newTask) {
    let campaigns = readAllItems('campaigns');
    if (campaigns[campaignIndex]?.missions[missionIndex]) {
        createItem(`campaigns[${campaignIndex}].missions[${missionIndex}].tasks`, newTask);
    } else {
        console.error(`Mission at index ${missionIndex} not found in campaign at index ${campaignIndex}.`);
    }
}

// Function to read all tasks of a mission
function readAllTasks(campaignIndex, missionIndex) {
    let campaigns = readAllItems('campaigns');
    return campaigns[campaignIndex]?.missions[missionIndex]?.tasks || [];
}

// Function to update a specific property of a task
function updateTaskProperty(campaignIndex, missionIndex, taskIndex, property, value) {
    updateItemProperty('campaigns', campaignIndex, `missions[${missionIndex}].tasks[${taskIndex}].${property}`, value);
}

// Function to delete a task from a mission
function deleteTask(campaignIndex, missionIndex, taskIndex) {
    deleteItem('campaigns', campaignIndex, missionIndex, taskIndex);
}


function populateMissionsDropdown(selectedCampaignIndex) {
    const missionSelect = document.getElementById('missionSelect');
    missionSelect.innerHTML = ''; // Clear previous options
    // Assume campaignsData is an array of campaign objects fetched from localStorage
    campaignsData[selectedCampaignIndex].missions.forEach((mission, index) => {
        const option = document.createElement('option');
        option.value = index.toString(); // Set value as index for easy retrieval
        option.textContent = mission.name;
        missionSelect.appendChild(option);
    });
}


function populateAssetsDropdown() {
    const assetSelect = document.getElementById('assetSelect');
    // Assume assetsData is an array of asset objects fetched from localStorage
    assetsData.forEach(asset => {
        const option = document.createElement('option');
        option.value = asset.id; // Set value as unique identifier for easy retrieval
        option.textContent = asset.name;
        assetSelect.appendChild(option);
    });
}