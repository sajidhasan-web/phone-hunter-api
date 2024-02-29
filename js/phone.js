const loadPhone = async (searchText = '13', isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);

  const data = await res.json();
  const phones = data.data;
  // console.log(phones)
  displayPhones(phones, isShowAll);
};



const displayPhones = (phones, isShowAll) => {
   console.log(phones)
  const phoneContainer = document.getElementById("phones-container");
// clear phoneContainer before add new cards
phoneContainer.textContent = '';

// console.log(phones.length)


// display show all btn if there are more than 9 phones
const showAllContainer = document.getElementById('showAll-container')
if(phones.length > 9 && !isShowAll){
  showAllContainer.classList.remove('hidden')
}
else{
    showAllContainer.classList.add('hidden')
}

console.log('isShowAll', isShowAll)
// display only first 9 phones if not show all 


if(!isShowAll){
    phones = phones.slice(0, 9)
}


  phones.forEach((phone) => {
    // console.log(phone);

    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-6 border`;

    phoneCard.innerHTML = `
    <div class="bg-[#0D6EFD0C] flex justify-center p-10 rounded-lg"><img src="${phone.image}" alt=""></div>
    <div class="text-center mt-6 space-y-4">
     <h4 class="text-2xl font-bold">${phone.phone_name}</h4>
     <p class="text-[#706F6F] text-lg">There are many variations of <br> passages of available, but the <br> majority have suffered</p>
     <p class="text-2xl font-bold">$999</p>
     <button onclick = "handleShowDetails('${phone.slug}')" class="btn text-xl font-semibold bg-[#0D6EFD] text-white">Show Details</button>
    </div>
    `;

    phoneContainer.appendChild(phoneCard);

  });
    // hide loading Spinner
    toggleLoadingSpinner(false);
};


// handle search button
const handleSearch = isShowAll => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    // console.log(searchText)
    loadPhone(searchText, isShowAll)
   
    // clear Input field

}


const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner')
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }else{
        loadingSpinner.classList.add('hidden')
    }
}



// handle Show Details
const handleShowDetails = async (id) => {
    console.log(id)
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data
    console.log(phone)
    showPhoneDetails(phone)
}


const showPhoneDetails = (phone) =>{
    const showDetailsContainer = document.getElementById('show-detail-container')
    showDetailsContainer.innerHTML = `
    <div class="flex justify-center"><img src="${phone.image}" alt=""></div>
    <h3 class="font-bold text-2xl">${phone.name}</h3>
    <p><span class="font-semibold">Storage: </span>${phone.mainFeatures?.storage}</p>
    <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Close</button>
                </form>
                </div>

    `
   show_details_modal.showModal()
}






// handle show all

const handleShowAll = () => {
    handleSearch(true)
}

loadPhone();
