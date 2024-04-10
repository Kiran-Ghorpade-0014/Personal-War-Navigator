// assets.js

const {
    createItem,
    readAllItems,
    updateItemProperty,
    deleteItem,
  } = require("./dataManagement.js");

// Function to create a new asset
function createAsset(newAsset) {
  createItem("assets", newAsset);
}

// Function to read all assets
function readAllAssets() {
  return readAllItems("assets");
}

// Function to update a specific property of an asset
function updateAssetProperty(assetIndex, property, value) {
  updateItemProperty("assets", assetIndex, property, value);
}

// Function to delete an asset
function deleteAsset(assetIndex) {
  deleteItem("assets", assetIndex);
}

const populateCards = () => {
  const data = readAllAssets();

  let cards = "";

  if (data == null) {
    return `<h1 class='text-warning'> No Assets Found </h1>`;
  }
  data.forEach((asset) => {
    let stockPercentage = (asset.stockStatus/asset.totalStock)*100;
    cards += `            
        <div class="card" style="width: 10rem;">
        <div class="card-body text-dark bg-component bg-gradient shadow">
            <!-- <img src="../assets/img/army_book.png" height="50" width="50" class="img-fluid text-center" alt=""> -->
            <h3 class="card-title mb-3 text-center" data-bs-toggle="modal" data-bs-target="#assetDetails">
                ${asset.name} </h3>
            <h6> Stock Remaining <div class="d-inline"> </div>
            </h6>
            <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="${asset.stockStatus}"
                aria-valuemin="0" aria-valuemax="${asset.totalStock}">
                <div class="progress-bar bg-warning" style="width: ${stockPercentage}%</div>
            </div>
        </div>
        </div>`;
  });

  const compaignBar = document.getElementById("assetBar");

  let element = processCards();
  compaignBar.innerHTML = element;

  return cards;
};

// Handle Form Input
function handleAssetForm(event) {
    event.preventDefault();

    console.log('handleAssetForm() called');
    const form = document.getElementById("assetForm");
    const formData = new FormData(form);
    const newAsset = {};
  
    formData.forEach((value, key) => {
      newAsset[key] = value;
    });
  
    createAsset(newAsset);
    form.reset();
  }
  




console.log("assets.js is Loaded...");
populateCards();
