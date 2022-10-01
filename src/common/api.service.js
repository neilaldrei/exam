const url = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies';
const extMin = '.min.json';
const ext = '.json';

const apiService = {
    async get () {
        let data = null;

        await fetch(`${url}${extMin}`)
        .then(response => response.json())
        .then(json => {
            data = json
        });

        return data;
    },

    async show (currencyCode) {
        let data = null;

        await fetch(`${url}/${currencyCode}${ext}`)
        .then(response => response.json())
        .then(json => {
            data = json
        })

        localStorage.setItem('prevData', JSON.stringify(data));
        localStorage.setItem('prevDataCode', currencyCode);
    
        return data;
    },

    getPrevData () {
        let prevData = JSON.parse(localStorage.getItem('prevData'));
        let prevDataCode = localStorage.getItem('prevDataCode');

        return {
            'prevData': prevData,
            'code': prevDataCode
        }
    }
}

export default apiService