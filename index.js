const URL = 'https://petdibs.herokuapp.com/pets';

//
// Status Management
//
const reportStatus = (message) => {
  $('#status-message').html(message);
};

//
// Loading Pets
//
const loadPets = () => {
  reportStatus('Loading pets...');

  const petList = $('#pet-list');
  petList.empty();

  axios.get(URL)
    .then((response) => {
      reportStatus(`Successfully loaded ${response.data.length} pets`);
      response.data.forEach((pet) => {
        petList.append(`<li>${pet.name}</li>`);
      });
    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading pets: ${error.message}`);
      console.log(error);
    });
};


//
// OK GO!!!!!
//
$(document).ready(() => {
  $('#load').click(loadPets);
});