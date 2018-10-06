/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Variables to work with
const page = document.querySelector('div.page');
const studentCards = document.querySelectorAll('li.student-item');
let linkList = null;
let paginationContainer = null;
let itemList = null;

const studentsPerPage = 10;
let pageToDisplay = 1;
let searchText = '';




showStudents(studentCards, pageToDisplay, createPagination);
createSearchBox();
activePage();


// Displaying the correct items,
// and calls a function to create pagination when its provided in the function invoke
function showStudents(list, page, fn) {
    let counter2 = 0;

    for (let i = 0; i <= list.length - 1; i++) {
        if (searchText === '') {
            if (i >= (studentsPerPage * page) - studentsPerPage  && i < page * studentsPerPage) {
                list[i].style.display = '';
            } else {
                list[i].style.display = 'none';
            }
        } else {
            if (i >= (studentsPerPage * page) - studentsPerPage  && i < page * studentsPerPage && 
                (list[i].firstElementChild.children[1].textContent.includes(searchText) || 

                i >= (studentsPerPage * page) - studentsPerPage  && i < page * studentsPerPage &&
                list[i].firstElementChild.children[2].textContent.includes(searchText))) {

                    list[i].style.display = '';

            } else {
                list[i].style.display = 'none';
                counter2++;
            }
        }
    }

    if (searchText !== '' && counter2 === list.length) {
        createMessage();
    } else if (searchText !== '' && counter2 !== list.length) {
        removeMessage();
    }

    if (fn !== undefined) {
        fn(list);
    }
}

// Creating DOM elements

// Creating search box
function createSearchBox() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'student-search';
    page.firstElementChild.appendChild(searchContainer);
    const searchInputField = document.createElement('input');
    searchInputField.placeholder = 'Search for students...';
    searchContainer.appendChild(searchInputField);
    const button = document.createElement('button');
    button.textContent = 'Search';
    searchContainer.appendChild(button);

// Adding event listeners
    searchInputField.addEventListener('keyup', searchStudents);
    button.addEventListener('click', searchStudents);

}

// Creating message
function createMessage() {
    if (document.querySelector('div.notFound') === null) {
        const messageBox = document.createElement('div');
        messageBox.className = 'notFound';
        page.insertBefore(messageBox, paginationContainer);
        const message = document.createElement('p');
        message.textContent = 'Searched student not found!';
        messageBox.appendChild(message);
    }
}

// Removing message
function removeMessage() {
    const boxToRemove = document.querySelector('div.notFound');
    const messageToRemove = document.querySelector('div.notFound p')
    if (boxToRemove !== null) {
        boxToRemove.removeChild(messageToRemove);
        page.removeChild(boxToRemove);
    }
}

// Creating pagination links
function createPagination(list) {
    let linkNumber = 1;
    let counter = 1;

    if (searchText === '') {
        linkNumber = Math.ceil(list.length / studentsPerPage);
    } else { 
        for (let i = 0; i < list.length; i++) {
            if (list[i].style.display === '') {
                counter++;
            }
        }
        linkNumber = Math.ceil(counter / studentsPerPage)        
    }
    
    function createLinks() {
        paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination';
        page.appendChild(paginationContainer);
        itemList = document.createElement('ul');
        paginationContainer.appendChild(itemList);
    
        itemList.addEventListener('click', clicked);   // Adding event listener and functionality

        for (let i = 1; i <= linkNumber; i++) {
            let li = document.createElement('li');
            itemList.appendChild(li);
            let a = document.createElement('a');
            a.href = '#';
            a.textContent = i;
            li.appendChild(a);
        }  
        linkList = document.querySelectorAll('div.pagination ul li');     
    }

    function removeLinks() {
        page.removeChild(paginationContainer); 
        paginationContainer = null;
        itemList = null;
    }

    if (paginationContainer === null && linkList === null) {
        createLinks();
    } else {
        removeLinks();
        createLinks();
    }
}


// Functions for functionality

// Clicking function
function clicked(e) {
    let clickedElement = e.target;

    if (clickedElement.tagName === 'A') {
        pageToDisplay = parseInt(clickedElement.textContent);
        showStudents(studentCards, pageToDisplay);
        activePage();
    }
}

// Applying the active class to the showed page
function activePage() {
    for (let i = 0; i < linkList.length; i++) {
        if (i === pageToDisplay - 1) {
            linkList[i].firstElementChild.className = 'active';
        } else {
            linkList[i].firstElementChild.className = '';
        }
    }
}

// Search function
function searchStudents() {
    searchText = document.querySelector('input').value.toLowerCase();
    showStudents(studentCards, pageToDisplay, createPagination);
    activePage();    
}









