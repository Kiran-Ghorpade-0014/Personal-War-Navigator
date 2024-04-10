// campaigns.js
console.log("campaign.js loaded");
export function hello(){
  console.log("hello world");
}

import {
  createItem,
  readAllItems,
  updateItemProperty,
  deleteItem,
} from "./dataManagement.js";

// Function to create a new campaign
function createCampaign(newCampaign) {
  createItem("campaigns", newCampaign);
}

// Function to read all campaigns
function readAllCampaigns() {
  return readAllItems("campaigns");
}

// Function to update a specific property of a campaign
function updateCampaignProperty(campaignIndex, property, value) {
  updateItemProperty("campaigns", campaignIndex, property, value);
}

// Function to delete a campaign
function deleteCampaign(campaignIndex) {
  deleteItem("campaigns", campaignIndex);
}

// Handle Form Input
function handleCampaignForm(event) {
  event.preventDefault();

  console.log('handleCampaignForm() called');
  
  const form = document.getElementById("campaignForm");
  const formData = new FormData(form);
  const newCampaign = {};
  campaign.status = "";
  campaign.start_date = start_date;
  campaign.end_date = end_date;
  campaign.note = note;
  campaign.resources = {};
  campaign.missions = [];
  campaign.progress = {};


  formData.forEach((value, key) => {
    newCampaign[key] = value;
  });

  createCampaign(newCampaign);
  form.reset();
}

export {handleCampaignForm};
