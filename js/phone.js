const loadPhone = async (searchText) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);

  const data = await res.json();
  const phones = data.data;
  // console.log(phones)
  displayPhones(phones);
};



const displayPhones = (phones) => {
   console.log(phones)
  const phoneContainer = document.getElementById("phones-container");
// clear phoneContainer before add new cards
phoneContainer.textContent = '';

console.log(phones.length)


// display show all btn if there are more than 9 phones
const showAllContainer = document.getElementById('showAll-container')
if(phones.length > 9){
  showAllContainer.classList.remove('hidden')
}
else{
    showAllContainer.classList.add('hidden')
}


// display only first 12 phones
 phones = phones.slice(0, 9)

  phones.forEach((phone) => {
    console.log(phone);

    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-6 border`;

    phoneCard.innerHTML = `
    <div class="bg-[#0D6EFD0C] flex justify-center p-10 rounded-lg"><img src="${phone.image}" alt=""></div>
    <div class="text-center mt-6 space-y-4">
     <h4 class="text-2xl font-bold">${phone.phone_name}</h4>
     <p class="text-[#706F6F] text-lg">There are many variations of <br> passages of available, but the <br> majority have suffered</p>
     <p class="text-2xl font-bold">$999</p>
     <button class="btn text-xl font-semibold bg-[#0D6EFD] text-white">Show Details</button>
    </div>
    `;

    phoneContainer.appendChild(phoneCard);

  });
    // hide loading Spinner
    toggleLoadingSpinner(false);
};


// handle search button
const handleSearch = () =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    console.log(searchText)
    loadPhone(searchText)
   
    // clear Input field
    searchField.value = '';
}


const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner')
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }else{
        loadingSpinner.classList.add('hidden')
    }
}




// handle show all

const handleShowAll = () => {
    
}

// loadPhone();
