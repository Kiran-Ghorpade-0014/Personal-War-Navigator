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
// units.js

// Function to create a new Unit
function createUnit(newUnit) {
  createItem("units", newUnit);
  render();
}

// Function to read all units
function readAllUnits() {
  return readAllItems("units");
}

// Function to update a specific property of a Unit
function updateUnitProperty(unitIndex, event) {
  event.preventDefault();
  let value = document.forms["updateCategoryForm"]["name"].value;
    console.log(value);
  console.log(unitIndex+" "+value);
  updateItemProperty("units", unitIndex, 'name', value);
  render();
}

// Function to delete a Unit
function deleteUnit(unitIndex) {
  deleteItem("units", unitIndex);
  render();
}

// Handle Form Input
function handleCategoryForm(event) {
  // event.preventDefault();

  const form = document.getElementById("categoryForm");
  const formData = new FormData(form);
  const newUnit = {};

  formData.forEach((value, key) => {
    newUnit[key] = value;
  });

  createUnit(newUnit);
  form.reset();
}

// Handle Update of existing unit
function handleUpdateClick(index, name) {

    modal = `
        <form id="updateCategoryForm" class="form text-light" action="#" onsubmit="updateUnitProperty(${index}, event); return false;">
            <label for="unitName">Unit Name:</label>
            <input type="text" class="form-control" id="unitName" name="name" value="${name}" required><br>
            <button type="submit" class="form-control btn btn-primary"  data-bs-toggle="modal" data-bs-target="#updateFormModal" >Update Unit</button>
        </form>
    `

    const modalForm = document.getElementById("updateCategoryForm");
    modalForm.outerHTML = modal;
}

// Delete Existing Unit
function handleDeleteClick(key) {
  let value = confirm("Are you sure to delete this Unit !!!");

  if (value == true) {
    let confirmvalue = confirm("Are you REALLY sure to delete this Unit !!!");
    if (value == confirmvalue) {
      if (confirmvalue == true) {
        if (
          prompt(
            "This will Affect All Related Missions and Tasks also.\nWhat is Sum 2 + " +
              key
          ) ||
          -1 == 2 + key
        ) {
          deleteUnit(key);
          alert("Command Executed : Unit Deleted...");
        } else alert("Command to delete Unit Aborted...");
      }
    }
  }
}

// -------------------------------------------------------------------------------------------
// View / UI manipulation Layer
// HTML management

const UnitBar = document.getElementById("unitBar");
let cache_element = "";

function render() {
  let element = processCards();
  if (cache_element == element) {
    return;
  }
  UnitBar.innerHTML = element;
  cache_element = element;
}

function processCards() {
  let unitsData = readAllUnits();

  cards = "";
  unitsData.forEach((unit) => {
    cards += `
                <div class="btn btn-lg hstack justify-content-between text-start text-light bg-component shadow">
                    <h4 href="../tasks/category.html" class=" text-start fw-bold"> ${
                      unit.name
                    } </h4>
                    <div class="hstack gap-2 justify-content-around">
                        <button onClick="handleUpdateClick(${unitsData.indexOf(unit)},'${unit.name}')" data-bs-toggle="modal"
                        data-bs-target="#updateFormModal" class="d-inline btn btn-sm btn-light"> ✏️ </button>
                        <button onClick="handleDeleteClick(${unitsData.indexOf(unit)})" class="d-inline btn btn-sm btn-dark"> 🗑️ </button>
                    </div>
                </div>
       `;
  });

  return cards;
}

render();
