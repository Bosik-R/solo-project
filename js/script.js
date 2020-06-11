'use strict';

const navLinks = document.querySelectorAll('.sidebar-list div');
const pages = document.querySelector('#pages').children;
const secondOption = '#template-links';

const defaultPage = pages[0].id;
let pageMatchingHash = defaultPage;

const idFromHash = window.location.hash.replace('#/', '');

for (let page of pages){
  if (page.id == idFromHash){
    pageMatchingHash = page.id;
    break;
  }
}

for (let link of navLinks){
  link.addEventListener('click', function(event){
    event.preventDefault();

    const clickedElement = this;
    
    const classToId = clickedElement.classList.item(0);

    const id = classToId.replace('sidebar-list-', '');
    
    activatePage(id);

    window.location.hash = '#/' + id;
  });
}

const activatePage = function(pageId){
  console.log(pageId);
  
  const wrapper = document.querySelector('.' + pageId + '-wrapper');
  
  const select = '#template-' + pageId;
  
  const template = Handlebars.compile(document.querySelector(select).innerHTML);
  
  const generateHTML = template();
  
  wrapper.innerHTML = generateHTML;

  for (let page of pages){
    page.classList.toggle('active', page.id == pageId);

    if (page.id === pages[0].id) {
      var ctx = document.getElementById('myChart').getContext('2d');
      var chart = new Chart(ctx, {
    // 1
    type: 'bar',
    data: {
        // 2
        labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
        // 3
        datasets: [{
            // 4
            label: "Signups",
            // 5
            backgroundColor: '#8DBEC8',
            borderColor: '#8DBEC8',
            // 6
            data: [ 52, 51, 41, 94, 26, 6, 72, 9, 21, 88 ],
        },
        {
            label: "FTD",
            backgroundColor: '#F29E4E',
            borderColor: '#F29E4E',
            data: [ 6, 72, 1, 0, 47, 11, 50, 44, 63, 76 ],
        },
        {
            label: "Earned",
            backgroundColor: '#71B374',
            borderColor: '#71B374',
            data: [ 59, 49, 68, 90, 67, 41, 13, 38, 48, 48 ],
            // 7
            hidden: true,
        }]
    },
      });
      const secondWrapper = document.querySelector('.wrapper-second-option'); 
      const secondTemplate = Handlebars.compile(document.querySelector(secondOption).innerHTML);
      const html = secondTemplate();
      secondWrapper.innerHTML = html;

    } 
  }
}

activatePage(pageMatchingHash);

window.location.hash = '#/' + pageMatchingHash;




/* const dateToStr = function(dateObj){
  return dateObj.toISOString().slice(0, 10);
};


const datePicker = document.querySelectorAll(`input[name="datePicker"]`);

datePicker.value = dateToStr(new Date());
console.log(datePicker.value);
datePicker.input.value = datePicker.value;

flatpickr(datePicker, {
  defaultDate: datePicker.value,
  
  altInput: true,
  altFormat: "F j, Y",
  dateFormat: "Y-m-d",
  {
  wrap: true,
  }
  'locale': {
    'firstDayOfWeek': 1
  },

  onChange: function(selectedDates, dateStr){
    datePicker.value = dateStr;
  },
}); */
