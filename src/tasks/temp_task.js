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
// tasks.js

// Function to create a new task for a mission
function createTask(newTask) {
  createItem("tasks", newTask);
  render();
}

// Function to read all Tasks
function readAllCategories() {
  return readAllItems("tasks");
}

// Function to update a specific property of a Task
function updateTaskProperty(taskIndex, event) {
  event.preventDefault();
  let value = document.forms["updateTaskForm"]["name"].value;
  console.log(value);
  updateItemProperty("tasks", taskIndex, "name", value);
  render();
}

// Function to delete a task
function deleteTask(taskIndex) {
  deleteItem("tasks", taskIndex);
  render();
}

function populateMissionsDropdown() {
  // Assume storagesData is an array of storage objects fetched from localStorage
  const missions = readAllItems("missions");

  const selectedCampaignIndex = document.getElementById("campaignSelect");

  // collectionData = missions.filter(mission => mission.campaign === 'Avengers');
  if (selectedCampaignIndex) {
    let missionsData = filterByProperty(
      missions,
      "campaign",
      selectedCampaignIndex.value
    );

    populateDropdown("missionSelect", missionsData);
    return;
  }

  populateDropdown("missionSelect", "missions");
}

// Handle Form Input
function handleTaskFormSubmit(event) {
  event.preventDefault();

  const form = document.getElementById("taskForm");
  const formData = new FormData(form);
  const newTask = {};
  newTask.status = "";
  // newTask.start_time = new Date();

  formData.forEach((value, key) => {
    newTask[key] = value;
  });

  createTask(newTask);

  form.reset();
}

function handleDeleteClick(taskindex) {
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
          deleteTask(taskindex);
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
let cache_element = "";

function render() {
  let element = processCards();
  if (cache_element == element) {
    return;
  }
  tasksBar.innerHTML = element;
  cache_element = element;
}
function processCards() {
  let tasksData = readAllItems("tasks");

  cards = "";
  tasksData.forEach((task) => {
    cards += `
            <div class="card bg-component" style="width:22rem;">
                <div class="card-body text-dark shadow">
                    <div class="d-flex align-items-center justify-content-between">
                        <h5 class="card-title" data-bs-toggle="modal" data-bs-target="#campaignDetails"> ${
                          task.name
                        }
                        </h5>
                        <h6 class="card-subtitle">@${task.mission}</h6>
                    </div>
                    <div class="hstack justify-content-between">
                        <div class="card-title h6"> Status : ${
                          task.status ? task.status : "🔴 None"
                        } </div>
                        <div class="mt-2 hstack gap-2 justify-content-around">
                            <button class="d-inline btn btn-sm btn-dark" onClick="handleDeleteClick(${tasksData.indexOf(
                              task
                            )})"> 🗑️ </button>
                            <button class="d-inline btn btn-sm btn-light"> ✏️ </button>
                        </div>
                    </div>
                    <button class="btn btn-sm btn-warning ">Report Status</button>
                </div>
            </div>
   `;
  });

  return cards;
}

render_reset = setInterval(() => {
  render();
}, 1000);

populateDropdown("campaignSelect", "campaigns");
populateDropdown("assetSelect", "assets");
populateMissionsDropdown();
