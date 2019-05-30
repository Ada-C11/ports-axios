const URL = 'https://petdibs.herokuapp.com/pets';

//
// Status Management
//
const reportStatus = (message) => {
  $('#status-message').html(message);
};

const reportApiError = (error) => {
  console.log("encountered error when posting", error);

  let errorHtml = `<p>${error.message}</p><ul>`;

  // Based on our exploration, we determined that
  // fieldProblems will be of form:
  // {
  //   field: [problem, problem, problem],
  //   field: [problem...],
  //   ...
  // }
  const fieldProblems = error.response.data.errors;

  // JavaScript is weird about looping through a hash
  Object.keys(fieldProblems).forEach(field => {
    const problems = fieldProblems[field];
    problems.forEach(problem => {
      errorHtml += `<li><strong>${field}:</strong> ${problem}</li>`;
    });
  });

  errorHtml += '</ul>';
  reportStatus(errorHtml);
}

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

const readPetForm = () => {
  return {
    // name: "dan's ports pet don't use this name please I need it for debugging",
    age: 14,
    owner: "ports"
  };
}

const handlePetFormSubmit = (event) => {
  event.preventDefault();

  const petData = readPetForm();

  reportStatus("About to post pet data...");
  console.log("About to post pet data", petData);

  axios.post(URL, petData)
    .then((response) => {
      console.log("successfully posted pet data", response);

      const petId = response.data.id;
      reportStatus(`Successfully created a new pet with ID ${petId}`);
    })
    .catch((error) => {
      reportApiError(error);
    })
};


//
// OK GO!!!!!
//
$(document).ready(() => {
  $('#load').click(loadPets);

  $('#pet-form').submit(handlePetFormSubmit);
});