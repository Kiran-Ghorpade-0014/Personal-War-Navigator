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

// Function to read all items from the specified collection
function filterByProperty(collection, property, value) {
  return collection.filter((mission) => mission[property] === value);
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

function populateDropdown(element_id, collection) {
  const collectionSelect = document.getElementById(element_id);
  collectionSelect.innerHTML = "";
  let collectionData = [];

  // Assume storagesData is an array of storage objects fetched from localStorage
  // if collection is string , fetch from string
  if (collection instanceof String || typeof collection === 'string') {
    collectionData = readAllItems(collection);
  } else {
    collectionData = collection;
  }

  collectionData.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.name; // Set value as unique identifier for easy retrieval
    option.textContent = item.name;
    collectionSelect.appendChild(option);
  });
}

// ---------------------------------------------------------------------------------------------
// missions.js

// Function to create a new mission for a campaign
function createMission(newMission) {
  createItem("missions", newMission)
  render();
}

// Function to read all missions of a campaign
function readAllMissions(campaignIndex) {
  let missions = readAllItems("missions");
  return missions;
}

// Function to update a specific property of a mission
function updateMissionProperty(campaignIndex, missionIndex, property, value) {
  updateItemProperty(
    "campaigns",
    campaignIndex,
    `missions[${missionIndex}].${property}`,
    value
  );
  render();
}

// Function to delete a mission from a campaign
function deleteMission(missionIndex) {
  deleteItem("missions", missionIndex);
  render();
}

// Handle Form Input
function handleMissionForm(event) {
  event.preventDefault();

  const form = document.getElementById("missionForm");
  const formData = new FormData(form);
  const newMission = {};
  newMission.status = "";
  newMission.progress = {};

  formData.forEach((value, key) => {
    newMission[key] = value;
  });

  createMission(newMission);
  form.reset();
}

function handleDeleteClick(missionkey) {
  let value = confirm("Are you sure to stop this Mission !!!");
  key = Math.floor(Math.random()*10);

  if (value == true) {
    let confirmvalue = confirm("Are you REALLY sure to stop this Mission !!!\nThis will Stop All Related Tasks also.");
    if (value == confirmvalue) {
      if (confirmvalue == true) {
        if (
          prompt("This will Stop All Related Missions and Tasks also.\nWhat is Sum " + key + " + " + missionkey)||-1 ==
          missionkey + key
        ) {
          deleteMission(missionkey);
          alert("Command Executed : Mission Stopped...");
        } else alert("Command to Stop Mission Aborted...");
      }
    }
  }
}

// -------------------------------------------------------------------------------------------
// View / UI manipulation Layer
// HTML management

const missionBar = document.getElementById("missionBar");
let cache_element = '';

function render() {
  let element = processCards();
  if(cache_element == element){
    return;
  }
  missionBar.innerHTML = element;
  cache_element = element;
}

function processCards() {
  let missionsData = readAllItems("missions");

    cards = "";
    missionsData.forEach((mission) => {
      cards += `
            <div class="card  bg-component" style="width:22rem;">
                <div class="card-body vstack gap-2 text-light shadow">
                    <div class="hstack gap-2 justify-content-between">
                        <h5 class="card-title" data-bs-toggle="modal" data-bs-target="#campaignDetails"> ${
                          mission.name
                        }
                        </h5>
                        <h6 class="card-subtitle ">@${mission.campaign}</h6>
                    </div>
                    <div class="hstack justify-content-between">
                        <div class="card-title h6"> Status : ${
                          mission.status ? mission.status : "🔴 None"
                        }</div>
                        <div class="hstack gap-2 justify-content-around">
                            <button class="d-inline btn btn-sm btn-light"> ✏️ </button>
                            <button class="d-inline btn btn-sm btn-dark" onClick="handleDeleteClick(${missionsData.indexOf(mission)})"> 🗑️ </button>
                        </div>
                    </div>
                    <div class="progress  text-center" role="progressbar" aria-label="Animated striped example"
                    aria-valuenow="75" aria-valuemin="10" style="height: 0.5rem;" aria-valuemax="100">
                        <div class="progress-bar bg-warning" style="width: 75%;">75%</div>
                    </div>   
                </div>
            </div>
   `;
    });

  return cards;
}

render_reset = setInterval(()=>{
  render();
},1000)

populateDropdown('campaignSelect', 'campaigns');
