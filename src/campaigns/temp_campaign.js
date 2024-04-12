// Database Layer / Storage Layer
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
// Controller / Logic Layer
// campaigns.js

// Function to create a new campaign
function createCampaign(newCampaign) {
  createItem("campaigns", newCampaign);
  render();
}

// Function to read all campaigns
function readAllCampaigns() {
  return readAllItems("campaigns");
}

// Function to update a specific property of a campaign
function updateCampaignProperty(campaignIndex, property, value) {
  updateItemProperty("campaigns", campaignIndex, property, value);
  render();
}

// Function to delete a campaign
function deleteCampaign(campaignIndex) {
  deleteItem("campaigns", campaignIndex);
  render();
}

// Handle Form Input
function handleCampaignForm(event) {
  event.preventDefault();

  console.log("handleCampaignForm() called");

  const form = document.getElementById("campaignForm");
  const formData = new FormData(form);
  const newCampaign = {};
  newCampaign.status = "";
  newCampaign.missions = [];
  newCampaign.progress = {};

  formData.forEach((value, key) => {
    newCampaign[key] = value;
  });

  createCampaign(newCampaign);
  form.reset();
}

function handleDeleteClick(key) {
  let value = confirm("Are you sure to stop this Campaign !!!");

  if (value == true) {
    let confirmvalue = confirm(
      "Are you REALLY sure to stop this Campaign !!!\nThis will Stop All Related Missions and Tasks also."
    );
    if (value == confirmvalue) {
      if (confirmvalue == true) {
        if (
          prompt(
            "This will Stop All Related Missions and Tasks also.\nWhat is Sum 2 + " +
              key
          ) ||
          -1 == 2 + key
        ) {
          deleteCampaign(key);
          alert("Command Executed : Campaign Stopped...");
        } else alert("Command to Stop Campaign Aborted...");
      }
    }
  }
}

// -------------------------------------------------------------------------------------------
// View / UI manipulation Layer
// HTML management

const campaignBar = document.getElementById("campaignBar");
let cache_element = '';

function render() {
  let element = processCards();
  if(cache_element == element){
    return;
  }
  campaignBar.innerHTML = element;
  cache_element = element;
}

function processCards() {
  let campaignsData = readAllCampaigns();

  cards = "";
  campaignsData.forEach((campaign) => {
    cards += `
            <div class="card bg-component" style="width:22rem;">
                <div class="card-body vstack gap-2 text-light shadow">
                    <div class="hstack justify-content-between">
                        <h5 onclick="showCampaignDetails(${campaignsData.indexOf(campaign)})" class="card-title" data-bs-toggle="modal" data-bs-target="#campaignDetails"> ${
                          campaign.name
                        }
                        </h5>
                        <h6 class="card-subtitle mb-2">@${campaign.priority}</h6>
                    </div>
                    <div class="hstack justify-content-between">
                        <div class="card-title h6"> Status : ${
                          campaign.status ? campaign.status : "🔴 None"
                        }</div>
                        <div class="hstack gap-2 justify-content-around">
                            <button class="d-inline btn btn-sm btn-light"> ✏️ </button>
                            <button class="d-inline btn btn-sm btn-dark" onClick="handleDeleteClick(${campaignsData.indexOf(campaign)})"> 🗑️ </button>
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

function showCampaignDetails(campaignId) {
  let campaignsData = readAllCampaigns();
  let campaign = campaignsData[campaignId];

  let modal = `
            <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">${campaign.name}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                        <h5 class="card-title">${campaign.status}</h5>
                        <h6 class="card-subtitle mb-2">@TaskCategory</h6>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                            the card's
                            content.</p>
                        <a href="#" class="btn btn-primary">Mark Completed</a>
                        <a href="#" class="btn btn-secondary">Skip</a>
            </div>
  `;

  document.getElementById("details").innerHTML=modal;
}

render_reset = setInterval(()=>{
    render();
},1000)
