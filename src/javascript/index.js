//imports
import { capitalize } from './functions';
import { logCalories } from './functions';
import 'js-snackbar/snackbar.css';
import { show, ACTION_TYPE } from 'js-snackbar';
import { getTotalCalories } from './functions';
import { stringtoNumbers } from './functions';

const fetchURL = 'http://localhost:3000/documents/';

// imports via the DOM

const form = document.querySelector('#food-form');
const selectedValue = document.querySelector('#value-selected');
const getCarbs = document.querySelector('#create-carbs');
const getProtein = document.querySelector('#create-protein');
const getFat = document.querySelector('#create-fat');
const row = document.querySelector('#row');
const row1 = document.querySelector('#row1');

// SUBMITS the Form

form.addEventListener('submit', (event) => {
  event.preventDefault();
  fetch(fetchURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    // FETCHES the data into the server

    body: JSON.stringify({
      fields: {
        name: { stringValue: selectedValue.value },
        carbs: { integerValue: getCarbs.value },
        protein: { integerValue: getProtein.value },
        fat: { integerValue: getFat.value },
      },
    }),
  })
    .then((response) => {
      return response.json();
    })

    // Logs the FORM SUBMITED data

    .then(() => {
      show({ text: 'Data successfuly added' });
      row.insertAdjacentHTML(
        'beforeend',
        `
        <div class="col-2" id="col">
        <div class="card text-bg-primary mb-3" style="max-width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">${capitalize(selectedValue.value)}</h5>
        <p class="card-text">Calories: ${logCalories(
          getFat.value,
          getCarbs.value,
          getProtein.value
        )}</p>
            <p class="card-text">Fat: ${getFat.value}</p>
            <p class="card-text"> Carbs: ${getCarbs.value}</p>
            <p class="card-text">Protein: ${getProtein.value}</p>
            </div>
            </div>
        </div>
    </div>`
      );

      // Cleans the FORM

      selectedValue.value = '';
      getCarbs.value = '';
      getProtein.value = '';
      getFat.value = '';
    });
});

fetch(fetchURL + '?pageSize=10')
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((data) => {
    console.log(data);
    data.forEach((item) => {
      // Logs the SERVER DATA

      row.insertAdjacentHTML(
        'beforeend',
        `
        <div class="col-2" id="col">
        <div class="card text-bg-primary mb-3" style="max-width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">${capitalize(item.fields.name.stringValue)}</h5>
        <p class="card-text">Calories: ${logCalories(
          item.fields.fat.integerValue,
          item.fields.carbs.integerValue,
          item.fields.protein.integerValue
        )}</p>
            <p class="card-text">Fat: ${item.fields.fat.integerValue}</p>
            <p class="card-text"> Carbs: ${item.fields.carbs.integerValue}</p>
            <p class="card-text">Protein: ${
              item.fields.protein.integerValue
            }</p>
            </div>
            </div>
        </div>
    </div>`
      );
    });

    // REDUCES THE SERVER DATA INTO THE TOTAL CALORIES OF ALL ITEMS

    const reduce = data.reduce(function (total, current) {
      return (
        total +
        Number.parseInt(current.fields.fat.integerValue, 10) * 4 +
        Number.parseInt(current.fields.protein.integerValue, 10) * 4 +
        Number.parseInt(current.fields.carbs.integerValue, 10) * 4
      );
    }, 0);
    row1.insertAdjacentHTML(
      'beforeend',
      ` <div class="col-2" id="col">
    <div class="card text-bg-warning mb-3" style="max-width: 18rem;">
    <div class="card-body">
    <h5 class="card-title">Get Total Calories</h5>
    <p class="card-text">Calories:${reduce} </p>
        </div>
        </div>
    </div>`
    );
    console.log(reduce);
  });
