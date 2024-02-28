// function loadPhone = async () => {
//     const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
//     const data = await res.json()
//     console.log(data)
// }
// loadPhone()

async function loadPhone(searchText='a',isShowAll) {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones=data.data;
    // console.log(phones);
    displayPhone(phones,isShowAll);
}

const displayPhone = (phones,isShowAll) => {
    const phoneContainer =document.getElementById('phone-container');
    phoneContainer.innerText = '';
//  display show all button if there are more than 12 phone
    const showAllContainer=document.getElementById('show-all-container')
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    }
    else {
        showAllContainer.classList.add('hidden')
    };
    // console.log('is show all',isShowAll);
    // display only first 12 phones if not show all
    if(!isShowAll){
      phones = phones.slice(0,12);
    }
    phones.forEach(phone => {
        // console.log(phone);
        // 1 create a div
        const phoneCard =document.createElement('div')
        phoneCard.classList ='card  bg-base-100 p-4 shadow-xl';
        // set inner html
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name
                      }!</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick ="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
        `;
        // apppend child
        phoneContainer.appendChild(phoneCard)
    })
    // hide loading spinner
    toggleLoadingSpinner(false);
}


const handleShowDetails =async (id) => {
  console.log('click show details',id);
  // load single phone data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089-${id}`);
  const data = await res.json();;
  const phone =data.data;
  showPhoneDetails(phone)
}

// show phone details
const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName=document.getElementById('phone-name');
  phoneName.innerText=phone.name;

  const showDetailContainer =document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
  <img src ="${phone.image}"alt ="" />
  <p><span>storage: </span> ${phone.mainFeatures.storage} </p>
  `
  // show the modal
  show_detail_modal.showModal();
}


// handle search button 
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField =document.getElementById('search-field');
  const searchTerm = searchField.value;
  console.log(searchTerm);
  loadPhone(searchTerm,isShowAll);
}
// handle search recap
// const handleSearch2 = () =>{
//   toggleLoadingSpinner(true);
//   const searchField=document.getElementById('search-field2');
//   const searchText=searchField.value;
//   loadPhone(searchText)
// }

const toggleLoadingSpinner = (isloading) => {
  const loadingSpinner =document.getElementById('loading-spinner');
  if(isloading){
    loadingSpinner.classList.remove('hidden');
  }
  else{
    loadingSpinner.classList.add('hidden');
  }
}

// handle show all
const handleShowAll = () =>{
  handleSearch(true);
}

loadPhone()