const arr = {
    currencyObjToArr (currencies, toMatch) {
        let currencyGroup = [];

        let currenciesArr = Object.entries(currencies).map(([key, value]) => ({key,value}));

        let currenciesSelected = currenciesArr.find(item => {return item.key === toMatch});

        let currenciesFinalArray = Object.entries(currenciesSelected.value).map(([key, value]) => ({key,value}));

        currencyGroup.push({
            group: 'one',
            items: currenciesFinalArray.filter(item => { return item.value < 1 }).sort()
        });


        currencyGroup.push({
            group: 'two',
            items: currenciesFinalArray.filter(item => { return item.value >= 1 && item.value < 1.5 }).sort()
        });

        currencyGroup.push({
            group: 'three',
            items: currenciesFinalArray.filter(item => { return item.value >= 1.5 }).sort()
        });

        return currencyGroup;
    },

    
}

export default arr