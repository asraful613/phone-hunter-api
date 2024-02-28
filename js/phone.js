// function loadPhone = async () => {
//     const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
//     const data = await res.json()
//     console.log(data)
// }
// loadPhone()

async function loadPhone(searchText,isShowAll) {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones=data.data;
    console.log(phones);
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
    console.log('is show all',isShowAll);
    // display only first 12 phones if not show all
    if(!isShowAll){
      phones = phones.slice(0,12);
    }
    phones.forEach(phone => {
        console.log(phone);
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
                      <div class="card-actions justify-end">
                        <button class="btn btn-primary">Buy Now</button>
                      </div>
                    </div>
        `;
        // apppend child
        phoneContainer.appendChild(phoneCard)
    })
    // hide loading spinner
    toggleLoadingSpinner(false);
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

// loadPhone()