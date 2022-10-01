const onCreate = '';

export default {
    onCreate: document.addEventListener("DOMContentLoaded", function () {
        console.log('created');
    }),

    onMounted: document.addEventListener("onload", function () {
        console.log('loaded');
    })
}