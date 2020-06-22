function fetchCategories() {
    return  fetch("http://localhost:9000/categories",
        {
            mode: 'cors',
            method: 'GET'
        })
        .then(result => result.json())
}
export default fetchCategories;