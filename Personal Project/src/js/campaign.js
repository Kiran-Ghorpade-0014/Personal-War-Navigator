// const card = `
// <div class="card" style="width: 18rem;" data-bs-toggle="modal"
// data-bs-target="#campaignDetails">
//   <div class="card-body text-dark bg-component bg-gradient shadow">
//     <h5 class="card-title"> ${campaignObj.name}</h5>
//     <h6 class="card-subtitle mb-2">@${campaignObj.category}</h6>
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
//       content.</p>
//     <div class="progress mb-2" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
//       <div class="progress-bar bg-danger" style="width: 75%">75%</div>
//     </div>
//     <div class="progress mb-2" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
//       <div class="progress-bar" style="width: 75%">75%</div>
//     </div>
//     <div class="progress mb-2" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
//       <div class="progress-bar bg-warning" style="width: 25%">25%</div>
//     </div>
//     <div class="progress mb-2" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
//       <div class="progress-bar bg-success" style="width: 55%">55%</div>
//     </div>
//   </div>
// </div>
// </div>

// `

const compaignBar = document.getElementById('campaignBar');

const render = () => {
    let element = processCards();
    compaignBar.innerHTML = element;
}

const saveData = (object) => {
    try {
        localStorage.setItem("campaign", JSON.stringify(object));
        alert("Campaign Added...")
    } catch (error) {
        alert("Limit Exceeded! \nCan't add more Campaigns");
    }

}

const getData = () => {
    return JSON.parse(localStorage.getItem("campaign"));
}

const processCards = () => {
    const campaignObj = getData();

    let card = campaignObj;
    let cards = '';

    if(campaignObj==null) {
        return '';
    }
    campaignObj.forEach(card => {
        cards += `
    <div class="card" style="width: 18rem;" data-bs-toggle="modal"
    data-bs-target="#campaignDetails">
      <div class="card-body text-dark bg-component bg-gradient shadow">
        <h5 class="card-title">
             <img src="../assets/img/case.png" alt="" height="30" width="30" >
             ${card.name}
        </h5>
        <h6 class="card-subtitle mb-2">@${card.category}</h6>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
        <div class="progress mb-2" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar bg-danger" style="width: 75%">75%</div>
        </div>
        <div class="progress mb-2" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar" style="width: 75%">75%</div>
        </div>
        <div class="progress mb-2" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar bg-warning" style="width: 25%">25%</div>
        </div>
        <div class="progress mb-2" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar bg-success" style="width: 55%">55%</div>
        </div>
      </div>
    </div>
    </div>
    
    `;
   });

    return cards;

}

const addCampaign = () => {
    const campaignObj = getData();
    const campaign = {}
    let name = document.getElementById('name').value;
    let category = document.getElementById('category').value;

    campaign.name = name;
    campaign.category = category;

    campaignObj.push(campaign);
    name.value='';
    category.value='';
    saveData(campaignObj);
    render();
}

const addMission = (campaign)=>{
    const campaignObj = getData();
  

}




// driver code
render();




