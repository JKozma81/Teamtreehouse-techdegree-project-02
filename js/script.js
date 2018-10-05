/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
const page = document.querySelector('div.page');
const studentCards = document.querySelectorAll('li.student-item');

const studentsPerPage = 10;
let pageToDisplay = 3;




showStudents(studentCards, pageToDisplay);
// Create a function to hide all of the items in the list excpet for the ten you want to show
// Tip: Keep in mind that with a list of 54 studetns, the last page will only display four

// Displaying the correct items
function showStudents(list, page) {
    let tempArray = Array.from(list);
    for (let i = 0; i <= tempArray.length - 1; i++) {
        if ( tempArray.indexOf(tempArray[i]) >= (studentsPerPage * page) - studentsPerPage  && tempArray.indexOf(tempArray[i]) < page * studentsPerPage) {
            tempArray[i].style.display = '';
        } else {
            tempArray[i].style.display = 'none';
        }
    }
}


// Creating pagination links

function createPaginationLinks(list) {
    let linkNumber = Math.ceil(list.length / studentsPerPage);

    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination';
    page.appendChild(paginationContainer);
    const itemList = document.createElement('ul');
    paginationContainer.appendChild(itemList);
    for (let i = 1; i <= linkNumber; i++) {
        let li = document.createElement('li');
        itemList.appendChild(li);
        let a = document.createElement('a');
        a.href = '#';
        a.textContent = i;
        li.appendChild(a);
    }
    itemList.firstChild.firstChild.className = 'active'
}





createPaginationLinks(studentCards);


// Adding event listener and functionality to pagination links






// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here





