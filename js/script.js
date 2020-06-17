const adminInterface = {
  initPages: function(){
    const thisApp = this;

    thisApp.navLinks = document.querySelectorAll('.sidebar-list div');
    thisApp.pages = document.querySelector('#pages').children;
    thisApp.secondOptionTemplate = '#template-links';
    thisApp.secondOptionWrapper = '.wrapper-second-option';

    const idFromHash = window.location.hash.replace('#/', '');

    thisApp.defaultPage = thisApp.pages[0].id;
    let pageMatchingHash = thisApp.defaultPage;
    
    
    for (let page of thisApp.pages){
      if (page.id == idFromHash){
        pageMatchingHash = page.id;
        break;
      }
    }
    
    thisApp.activatePage(pageMatchingHash);

    window.location.hash = '#/' + pageMatchingHash;

    for (let link of thisApp.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();

        const classToId = clickedElement.classList.item(0);

        const id = classToId.replace('sidebar-list-', '');
        
        thisApp.activatePage(id);

        window.location.hash = '#/' + id;
      });
    }

    thisApp.sidebarWrapper = document.querySelector('.sidebar-wrapper');
    thisApp.contentWrapper = document.querySelector('.content-wrapper');
    
    function toggleMenu(visible) {
      
      thisApp.sidebarWrapper.classList.toggle('show', visible);
      thisApp.contentWrapper.classList.toggle('dim', visible);
      
    }

    thisApp.contentWrapper.addEventListener('click', function(e){
      e.preventDefault();
      toggleMenu(false);
    });

    document.querySelector('.hamburger').addEventListener('click', function(e){
      e.preventDefault();
      toggleMenu()
    });
  },

  activatePage: function(pageId){
    console.log(pageId);
    const thisApp = this;

    thisApp.wrapper = document.querySelector('.' + pageId + '-wrapper');

    const select = '#template-' + pageId;

    const template = Handlebars.compile(document.querySelector(select).innerHTML);

    const generateHTML = template();

    thisApp.wrapper.innerHTML = generateHTML;

    for (let page of thisApp.pages){
      page.classList.toggle('active', page.id == pageId);

      if (page.id === thisApp.pages[0].id) {
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
        thisApp.secondWrapper = document.querySelector(thisApp.secondOptionWrapper); 
        const secondTemplate = Handlebars.compile(document.querySelector(thisApp.secondOptionTemplate).innerHTML);
        const html = secondTemplate();
        thisApp.secondWrapper.innerHTML = html;
      } 
    }
  },

  init: function(){
    const thisApp = this;

    thisApp.initPages();
  }
}
adminInterface.init();


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
