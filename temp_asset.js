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
// assets.js

// Function to create a new Asset
function createAsset(newAsset) {
  createItem("assets", newAsset);
  render();
}

// Function to read all assets
function readAllAssets() {
  return readAllItems("assets");
}

// Function to update a specific property of a Asset
function updateAssetProperty(AssetIndex, property, value) {
  updateItemProperty("assets", AssetIndex, property, value);
  render();
}

// Function to delete a Asset
function deleteAsset(AssetIndex) {
  deleteItem("assets", AssetIndex);
  render();
}

// Handle Form Input
function handleAssetForm(event) {
  event.preventDefault();

  console.log("handleAssetForm() called");

  const form = document.getElementById("assetForm");
  const formData = new FormData(form);
  const newAsset = {};
  newAsset.status = "";
  newAsset.currentstock = 0;
  newAsset.start_time = new Date();

  formData.forEach((value, key) => {
    newAsset[key] = value;
  });

  createAsset(newAsset);
  form.reset();
}

function handleDeleteClick(key) {
  let value = confirm("Are you sure to stop this Asset !!!");

  if (value == true) {
    let confirmvalue = confirm("Are you REALLY sure to stop this Asset !!!");
    if (value == confirmvalue) {
      if (confirmvalue == true) {
        if (
          prompt(
            "This will Affect All Related Missions and Tasks also.\nWhat is Sum 2 + " +
              key
          ) ||
          -1 == 2 + key
        ) {
          deleteAsset(key);
          alert("Command Executed : Asset Stopped...");
        } else alert("Command to Stop Asset Aborted...");
      }
    }
  }
}

// -------------------------------------------------------------------------------------------
// View / UI manipulation Layer
// HTML management

const AssetBar = document.getElementById("assetBar");

function render() {
  let element = processCards();
  AssetBar.innerHTML = element;
}

function processCards() {
  let assetsData = readAllAssets();

  cards = "";
  assetsData.forEach((asset) => {
    let currentPercentage =
      ((asset.totalstock - asset.currentstock) / asset.totalstock) * 100;
    let deadlinePercentage = 0;
    const currentTime = new Date();

    if (new Date(asset.end_time) >= currentTime) {
      
        start_time = new Date(asset.start_time).getTime()/1000;
        end_time = new Date(asset.end_time).getTime()/1000;
        total_time = end_time - start_time;
        time_remains = end_time - currentTime.getTime()/1000;
        deadlinePercentage = Math.floor((time_remains / total_time) * 100);
       
    }
    cards += `
              <div class="card" style="width: 10rem;">
                    <div class="card-body vstack gap-1 text-dark bg-component bg-gradient shadow">
                        <h5 class="card-title text-center"> 
                        ${asset.name} 
                        <span class="card-subtitle text-warning text-center"> ${asset.currentstock}/${asset.totalstock} </span>
                        </h5>
                        <button class="btn btn-sm btn-warning">Update Asset</button>
                        <div class="progress" role="progressbar" aria-label="Animated striped example"
                        aria-valuenow="${currentPercentage}" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar bg-success" style="width: ${currentPercentage}%;">${currentPercentage}%</div>
                        </div>    
                        <div class="progress text-center" role="progressbar" aria-label="Animated striped example"
                        aria-valuenow="${deadlinePercentage}" aria-valuemin="10" aria-valuemax="100">
                            <div class="progress-bar bg-primary" style="width: ${deadlinePercentage}%;">${deadlinePercentage}%</div>
                            ${(deadlinePercentage>0) ? "":'⚠️'}
                        </div>    
                    </div>
                </div>
     `;
  });

  return cards;
}

function showAssetDetails(AssetId) {
  let assetsData = readAllAssets();
  let Asset = assetsData[AssetId];

  let modal = `
              <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">${Asset.name}</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                          <h5 class="card-title">${Asset.status}</h5>
                          <h6 class="card-subtitle mb-2">@TaskCategory</h6>
                          <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                              the card's
                              content.</p>
                          <a href="#" class="btn btn-primary">Mark Completed</a>
                          <a href="#" class="btn btn-secondary">Skip</a>
              </div>
    `;

  document.getElementById("details").innerHTML = modal;
}

render_reset = setInterval(()=>{
    render();
},1000)