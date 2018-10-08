document.addEventListener('DOMContentLoaded', () => {
// Variables
const page = document.querySelector('div.page');
const studentCards = document.querySelectorAll('li.student-item');
const searchInputField = document.createElement('input');
const messageBox = document.createElement('div');


const studentsPerPage = 10;
let pageToDisplay = 1;
let linkList = null;
let searchText = '';
const studentsArray = [];
let workarray = [];


const createDomElements = () => {
// Searchbox
  const searchContainer = document.createElement('div');
  searchContainer.className = 'student-search';
  page.firstElementChild.appendChild(searchContainer);
  searchInputField.placeholder = 'Search for students...';
  searchContainer.appendChild(searchInputField);
  const button = document.createElement('button');
  button.textContent = 'Search';
  searchContainer.appendChild(button);

// Pagination links
  let linkNumber = Math.ceil(studentCards.length / studentsPerPage);

  paginationContainer = document.createElement('div');
  paginationContainer.className = 'pagination';
  page.appendChild(paginationContainer);
  const itemList = document.createElement('ul');
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

// Message
  
  messageBox.style.color = '#888';
  messageBox.style.fontSize = '50px';
  messageBox.style.fontWeight = 'bold';
  messageBox.style.textAlign = 'center';
  page.insertBefore(messageBox, paginationContainer);
  const message = document.createElement('p');
  message.textContent = 'Searched student not found!';
  message.style.paddingTop = '150px';
  message.style.paddingBottom = '150px';
  messageBox.appendChild(message);
  messageBox.style.display = 'none';
  messageBox.className = 'noResult';

// Adding event listeners
  searchInputField.addEventListener('keyup', searching);
  button.addEventListener('click', searching);

  linkList = document.querySelectorAll('div.pagination ul li');

  activePage();
  studentsArray.push(...studentCards);
  showStudents(studentsArray, pageToDisplay);
}


// Showing students
const showStudents = (list, pageNumber) => {
  let counter = 0;

  for (let i = 0; i < studentCards.length; i++) {
    if (list.includes(studentCards[i])) {
      counter++;
      if (counter <= studentsPerPage * pageNumber && counter > (studentsPerPage * pageNumber) - studentsPerPage) {
        studentCards[i].style.display = '';
      } else {
        studentCards[i].style.display = 'none';
      }
    } else {
      studentCards[i].style.display = 'none';
    }
  }
  showPagination();
}

// Show pagination links
const showPagination = () => {
  let linksToShow = 1;

  if (searchText === '') {
    for (let i = 0; i < linkList.length; i++) {
      linkList[i].style.display = '';
    }
  } else if (searchText !== '' && workarray.length !== 0) {    
    linksToShow = Math.ceil(workarray.length / studentsPerPage);

    for (let i = 0; i < linkList.length; i++) {
      if (i < linksToShow) {
        linkList[i].style.display = '';  
      } else {
        linkList[i].style.display = 'none';
      }
    }
  } else {
    for (let i = 0; i < linkList.length; i++) {
      if (i === linksToShow - 1) {
        linkList[i].style.display = '';  
      } else {
        linkList[i].style.display = 'none';
      }
    }
  }

}


// FUNCTIONALITY
// Click function
const clicked = (e) => {
  let clickedElement = e.target;

  if (clickedElement.tagName === 'A') {
      pageToDisplay = parseInt(clickedElement.textContent);

      if (workarray.length === 0 && searchText === '') {
        showStudents(studentsArray, pageToDisplay);
      } else {
        showStudents(workarray, pageToDisplay);
      }

      activePage();
  }
}

// Applying the active class to the showed page
const activePage = () => {
  for (let i = 0; i < linkList.length; i++) {
      if (i === pageToDisplay - 1) {
          linkList[i].firstElementChild.className = 'active';
      } else {
          linkList[i].firstElementChild.className = '';
      }
  }
}

// Gives back the search result for name or email
const searchStudents = (query) => {
  return studentsArray.filter(function(element) {
    const regex = new RegExp(query, 'gi');
    return element.firstElementChild.children[1].textContent.match(regex) ||  element.firstElementChild.children[2].textContent.match(regex)})
}

// Displaying search result or message
const searching = () => {
  pageToDisplay = 1;
  activePage();
  searchText = searchInputField.value;
  workarray = searchStudents(searchText);
  showStudents(workarray, pageToDisplay);

  if (searchText !== '' && workarray.length === 0) {
    messageBox.style.display = '';
  } else {
    messageBox.style.display = 'none';
  }
}


// Start
createDomElements();

})

