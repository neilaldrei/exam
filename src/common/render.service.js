const templateService = {
    render (template, selector) {
        var node = document.querySelector(selector);
        if (!node) return;
        node.insertAdjacentHTML('beforeend',template);
    },

    
}

export default templateService