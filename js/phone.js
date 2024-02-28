// function loadPhone = async () => {
//     const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
//     const data = await res.json()
//     console.log(data)
// }
// loadPhone()

async function loadPhone(searchText) {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones=data.data;
    console.log(phones);
    displayPhone(phones);
}

const displayPhone = phones => {
    const phoneContainer =document.getElementById('phone-container');
    phoneContainer.innerText = '';

    const showAllContainer=document.getElementById('show-all-container')
    if (phones.length > 12) {
        showAllContainer.classList.remove('hidden')
    }
    else {
        showAllContainer.classList.add('hidden')
    };
    // display only first 12 phones
    phones = phones.slice(0,12);

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
}
// handle search button 

const handleSearch = () => {
  const searchField =document.getElementById('search-field');
  const searchTerm = searchField.value;
  console.log(searchTerm);
  loadPhone(searchTerm);
}

// loadPhone()