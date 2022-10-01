import apiService from './common/api.service.js';
import templateService from './common/render.service.js';
import arrayService from './common/array.service.js';
    
// Variables
let currencyKeys = null;
let dateEl = document.querySelector('#date');

const fetchCurrencies = async () => {
    currencyKeys = await apiService.get();
    
    let currencyKeysArr = Object.keys(currencyKeys);

    currencyKeysArr.forEach(item => {
        templateService.render(`
            <option 
                key="${item}" 
                data-id="${item}" 
                value="${item}"
                ${item === 'usd' && 'selected'}> 
            ${item.toUpperCase()} </option>
        `, '#select');
    });

    let localData = apiService.getPrevData();

    if (localData) {
        let currencies = arrayService.currencyObjToArr(localData.prevData,localData.code);

        renderCurrencyGroups(currencies, localData.prevData.date);
    }
}

const renderCurrencyGroups = async (currencies, date) => {
    const groupWrapper = document.querySelector("#groups");
    dateEl.innerHTML = `Exchange rates as of ${date}`;

    if (groupWrapper.hasChildNodes()) {
        groupWrapper.replaceChildren();
    }

    currencies.map(item => {
        let groupEl = document.createElement('div');
        let groupTitle = document.createElement('h1');
        let groupCount = document.createElement('p');
        
        groupEl.className = `group-${item.group}`;

        groupTitle.innerHTML = `Group ${item.group}`;
        groupCount.innerHTML = `Count: ${item.items.length}`;

        groupWrapper.appendChild(groupEl);
        groupEl.appendChild(groupTitle);
        groupEl.appendChild(groupCount);

        let ul = document.createElement('ul');
        ul.className = 'card';
        groupEl.appendChild(ul);
        
        item.items.map(list => {
            
            let li = document.createElement('li');
            ul.appendChild(li);

            li.setAttribute('data-id', list.key);
            li.setAttribute('key', list.key);

            li.innerHTML = `${list.key} - ${list.value}`;
        });
    })
}

select.addEventListener('change', async (e) => {
    e.preventDefault();
    let currencies = null;

    let response = await apiService.show(e.target.value);

    currencies = arrayService.currencyObjToArr(response, e.target.value);

    renderCurrencyGroups(currencies, response.date);
})

fetchCurrencies();