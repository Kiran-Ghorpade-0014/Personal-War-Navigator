// Function to create a new item in the specified collection
function createItem(collection, newItem) {
  let items = JSON.parse(localStorage.getItem(collection)) || [];
  items.push(newItem);
  localStorage.setItem(collection, JSON.stringify(items));
  console.log(`New ${collection.slice(0, -1)} created successfully.`);
}

// Function to read all items from the specified collection
function readAllItems(collection) {
  return JSON.parse(localStorage.getItem(collection)) || [];
}

// Function to update a specific property of an item in the specified collection
function updateItemProperty(collection, itemIndex, property, value) {
  let items = JSON.parse(localStorage.getItem(collection)) || [];
  let item = items[itemIndex];
  if (item) {
    setNestedProperty(item, property.split("."), value);
    localStorage.setItem(collection, JSON.stringify(items));
    console.log(
      `${collection.slice(0, -1).toUpperCase()} ${property
        .split(".")
        .pop()} updated successfully.`
    );
  } else {
    console.error(`Item at index ${itemIndex} not found in ${collection}.`);
  }
}

// Function to delete an item from the specified collection
function deleteItem(collection, itemIndex) {
  let items = JSON.parse(localStorage.getItem(collection)) || [];
  items.splice(itemIndex, 1);
  localStorage.setItem(collection, JSON.stringify(items));
  console.log(`${collection.slice(0, -1).toUpperCase()} deleted successfully.`);
}

// Function to set nested property value
function setNestedProperty(obj, path, value) {
  for (let i = 0; i < path.length - 1; i++) {
    obj = obj[path[i]];
  }
  obj[path.pop()] = value;
}

// ---------------------------------------------------------------------------------------------
// tasks.js

// Function to create a new task for a mission
function createTask(campaignIndex, missionIndex, newTask) {
  let campaigns = readAllItems("campaigns");

  if (campaigns[campaignIndex]?.missions[missionIndex]) {
    let missions = campaigns[campaignIndex].missions;
    missions[missionIndex].tasks.push(newTask);

    updateItemProperty("campaigns", campaignIndex, "missions", missions);
  } else {
    console.error(
      `Task at index ${taskIndex} in Mission at index ${missionIndex} not found in campaign at index ${campaignIndex}.`
    );
  }

  render();
}

// Function to read all tasks of a mission
function readAllTasks(campaignIndex, missionIndex) {
  let campaigns = readAllItems("campaigns");
  return campaigns[campaignIndex]?.missions[missionIndex]?.tasks || [];
}

// Function to update a specific property of a task
function updateTaskProperty(
  campaignIndex,
  missionIndex,
  taskIndex,
  property,
  value
) {
  updateItemProperty(
    "campaigns",
    campaignIndex,
    `missions[${missionIndex}].tasks[${taskIndex}].${property}`,
    value
  );
  render();
}

// Function to delete a task from a mission
function deleteTask(campaignIndex, missionIndex, taskIndex) {
  let campaigns = readAllItems("campaigns");

  if (campaigns[campaignIndex]?.missions[missionIndex]) {
    let missions = campaigns[campaignIndex].missions;
    missions[missionIndex].tasks.splice(taskIndex, 1);

    updateItemProperty("campaigns", campaignIndex, "missions", missions);
  } else {
    console.error(
      `Task at index ${taskIndex} in Mission at index ${missionIndex} not found in campaign at index ${campaignIndex}.`
    );
  }

  render();
}

function populateCampaignsDropdown() {
  const campaignSelect = document.getElementById("campaignSelect");
  //campaignsData is an array of campaign objects fetched from localStorage
  let campaignsData = readAllItems("campaigns");

  campaignsData.forEach((campaign, index) => {
    const option = document.createElement("option");
    option.value = index.toString(); // Set value as index for easy retrieval
    option.textContent = campaign.name;
    campaignSelect.appendChild(option);
  });
}

function populateMissionsDropdown() {
  const selectedCampaignIndex = parseInt(
    document.getElementById("campaignSelect").value
  );
  const missionSelect = document.getElementById("missionSelect");
  missionSelect.innerHTML = ""; // Clear previous options
  // Assume campaignsData is an array of campaign objects fetched from localStorage
  let campaignsData = readAllItems("campaigns");

  campaignsData[selectedCampaignIndex].missions.forEach((mission, index) => {
    const option = document.createElement("option");
    option.value = index.toString(); // Set value as index for easy retrieval
    option.textContent = mission.name;
    missionSelect.appendChild(option);
  });
}

function populateAssetsDropdown() {
  const assetSelect = document.getElementById("assetSelect");
  // Assume assetsData is an array of asset objects fetched from localStorage
  const assetsData = readAllItems('assets');

  assetsData.forEach((asset) => {
    const option = document.createElement("option");
    option.value = asset.id; // Set value as unique identifier for easy retrieval
    option.textContent = asset.name;
    assetSelect.appendChild(option);
  });
}

// Handle Form Input
function handleTaskFormSubmit(event) {
  event.preventDefault();

  const form = document.getElementById("taskForm");
  const formData = new FormData(form);
  const newTask = {};
  newTask.status = "";
  newTask.note = "";
  // newTask.start_time = new Date();

  formData.forEach((value, key) => {
    newTask[key] = value;
  });

  const campaignIndex = parseInt(
    document.getElementById("campaignSelect").value
  );
  const missionIndex = parseInt(document.getElementById("missionSelect").value);
  createTask(campaignIndex, missionIndex, newTask);

  form.reset();
}

function handleDeleteClick(key, missionkey, taskindex) {
  let value = confirm("Are you sure to stop this Task !!!");

  if (value == true) {
    let confirmvalue = confirm("Are you REALLY sure to stop this Task !!!");
    if (value == confirmvalue) {
      if (confirmvalue == true) {
        if (
          prompt(
            "This will Stop This Task Permanently.\nWhat is Sum " +
              key +
              " + " +
              missionkey +
              " + " +
              taskindex
          ) ||
          -1 == missionkey + key + taskindex
        ) {
          deleteTask(key, missionkey, taskindex);
          alert("Command Executed : Task Stopped...");
        } else alert("Command to Stop Task Aborted...");
      }
    }
  }
}

// -------------------------------------------------------------------------------------------------
// View / UI manipulation Layer
// HTML management

const tasksBar = document.getElementById("tasksBar");

function render() {
  let element = processCards();
  tasksBar.innerHTML = element;
}

function processCards() {
  let campaignsData = readAllItems("campaigns");

  cards = "";
  campaignsData.forEach((campaign) => {
    campaign.missions.forEach((mission) => {
      mission.tasks.forEach((task) => {
        cards += `
            <div class="card" style="width:22rem;">
                <div class="card-body text-dark bg-component bg-gradient shadow">
                    <div class="d-flex align-items-center justify-content-between">
                        <h5 class="card-title" data-bs-toggle="modal" data-bs-target="#campaignDetails"> ${
                          task.name
                        }
                        </h5>
                        <div class="card-title h6"> Status : ${
                          task.status ? task.status : "🔴 None"
                        }</div>
                    </div>
                    <h6 class="card-subtitle mb-1">@${task.priority}</h6>
                    <div class="mt-2 d-flex flex-wrap gap-1 justify-content-around">
                    <button class="btn btn-small btn-primary bg-component" onClick="handleDeleteClick(${campaignsData.indexOf(
                      campaign
                    )}, ${campaign.missions.indexOf(mission)}, ${mission.tasks.indexOf(task)})"> Delete </button>
                        <button class="btn btn-small btn-warning">Report Status</button>
                        <button class="btn btn-small btn-primary">Update</button>
                    </div>
                </div>
            </div>
   `;
      });
    });
  });

  return cards;
}

render_reset = setInterval(()=>{
  render();
},1000)

populateCampaignsDropdown();
populateAssetsDropdown();
