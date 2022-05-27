const addItemBtn = document.querySelector('.add-item-btn');
const balanceEl = document.querySelector('#balance');
const itemNameInput = document.querySelector('#item-name-input');
const itemDateInput = document.querySelector('#item-date-input');
const itemTypeInput = document.querySelector('#select-types');
const itemPriceInput = document.querySelector('#item-price-input');
const deleteItem = document.querySelector('.delete-icon');
const itemsContainer = document.querySelector('.items ul');

const addItem = function () {
  const inputElements = [itemPriceInput, itemNameInput, itemDateInput];
  inputElements.forEach((el) => {
    if (el.value === '') {
      el.classList.add('input-error');
    } else {
      el.classList.remove('input-error');
    }
  });

  for (let i = 0; i < inputElements.length; i++) {
    if (inputElements[i].value === '') return;
  }

  if (itemPriceInput.value < 1) {
    return;
  }

  const itemName = itemNameInput.value;
  const itemPrice = +itemPriceInput.value;
  const itemDate = addDateCharacter(itemDateInput.value);
  const itemType = itemTypeInput.value;
  generateMarkup(itemName, itemPrice, itemDate, itemType);
};

const addDateCharacter = function () {
  const itemDate = itemDateInput.value;
  const itemDateArr = itemDate.split('-');
  return itemDateArr[2] + '/' + itemDateArr[1] + '/' + itemDateArr[0];
};

const generateMarkup = function (itemName, itemPrice, itemDate, itemType) {
  balanceEl.textContent = Math.floor(itemPrice + +balanceEl.textContent);
  const markup = `
  <li>
    <div class="item">
      <p class="item-name">
        Item name:
        <span id="item-name-span">${itemName}</span>
      </p>
      <p class="item-date">
        Date:
        <span id="item-date-span">${itemDate}</span>
      </p>
      <p class="item-type">
        Item type:
        <span id="item-type-span">${itemType}</span>
      </p>
      <p class="item-price">
        Item price: <b>$</b><span class="price-element" id="item-price-span">${itemPrice}</span>
      </p>
      <div class="delete-item">
        <i class="fa-solid fa-trash delete-icon"></i>
      </div>
    </div>
  </li>`;
  addMarkup(markup);
};

const addMarkup = function (markup) {
  itemsContainer.insertAdjacentHTML('afterbegin', markup);
  itemNameInput.value = itemPriceInput.value = '';
};

itemsContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete-icon')) {
    const itemList = event.target.parentElement.parentElement.parentElement;
    const priceDeleted =
      event.target.parentElement.parentElement.parentElement.children[0]
        .children[3].children[1].textContent;
    balanceEl.textContent = balanceEl.textContent - priceDeleted;

    itemList.remove();
  }
});

addItemBtn.addEventListener('click', addItem);
