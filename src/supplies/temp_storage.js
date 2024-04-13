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
  // category.js
  
  // Function to create a new Category
  function createCategory(newCategory) {
    createItem("storage", newCategory);
    render();
  }
  
  // Function to read all Categorys
  function readAllCategories() {
    return readAllItems("storage");
  }
  
  // Function to update a specific property of a Category
  function updateCategoryProperty(categoryIndex, event) {
    event.preventDefault();
    let value = document.forms["updateCategoryForm"]["name"].value;
      console.log(value);
    console.log(categoryIndex+" "+value);
    updateItemProperty("storage", categoryIndex, 'name', value);
    render();
  }
  
  // Function to delete a Category
  function deleteCategory(categoryIndex) {
    deleteItem("storage", categoryIndex);
    render();
  }
  
  // Handle Form Input
  function handleCategoryForm(event) {
    // event.preventDefault();
  
    const form = document.getElementById("categoryForm");
    const formData = new FormData(form);
    const newCategory = {};
  
    formData.forEach((value, key) => {
      newCategory[key] = value;
    });
  
    createCategory(newCategory);
    form.reset();
  }
  
  // Handle Update of existing Category
  function handleUpdateClick(index, name) {
  
      modal = `
          <form id="updateCategoryForm" class="form text-light" action="#" onsubmit="updateCategoryProperty(${index}, event); return false;">
              <label for="categoryName">Storage Name:</label>
              <input type="text" class="form-control" id="categoryName" name="name" value="${name}" required><br>
              <button type="submit" class="form-control btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateFormModal">Update Storage</button>
          </form>
      `
  
      const modalForm = document.getElementById("updateCategoryForm");
      modalForm.outerHTML = modal;
  }
  
  // Delete Existing Category
  function handleDeleteClick(key) {
    let value = confirm("Are you sure to delete this Storage !!!");
  
    if (value == true) {
      let confirmvalue = confirm("Are you REALLY sure to delete this Storage !!!");
      if (value == confirmvalue) {
        if (confirmvalue == true) {
          if (
            prompt(
              "This will Affect All Related Missions and Tasks also.\nWhat is Sum 2 + " +
                key
            ) ||
            -1 == 2 + key
          ) {
            deleteCategory(key);
            alert("Command Executed : Storage Deleted...");
          } else alert("Command to delete Storage Aborted...");
        }
      }
    }
  }
  
  // -------------------------------------------------------------------------------------------
  // View / UI manipulation Layer
  // HTML management
  
  const CategoryBar = document.getElementById("categoryBar");
  let cache_element = "";
  
  function render() {
    let element = processCards();
    if (cache_element == element) {
      return;
    }
    CategoryBar.innerHTML = element;
    cache_element = element;
  }
  
  function processCards() {
    let categorysData = readAllCategories();
  
    cards = "";
    categorysData.forEach((category) => {
      cards += `
                  <div class="btn btn-lg hstack justify-content-between text-start text-light bg-component shadow">
                      <h4 class=" text-start fw-bold"> ${
                        category.name
                      } </h4>
                      <div class="hstack gap-2 justify-content-around">
                          <button onClick="handleUpdateClick(${categorysData.indexOf(category)},'${category.name}')" data-bs-toggle="modal"
                          data-bs-target="#updateFormModal" class="d-inline btn btn-sm btn-light"> ✏️ </button>
                          <button onClick="handleDeleteClick(${categorysData.indexOf(category)})" class="d-inline btn btn-sm btn-dark"> 🗑️ </button>
                      </div>
                  </div>
         `;
    });
  
    return cards;
  }
  
  render();
  