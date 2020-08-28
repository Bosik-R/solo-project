/* use strict */
/* global Handlebars, Chart */

const adminInterface = {

  initPages: function() {
    const thisApp = this;

    thisApp.navLinks = document.querySelectorAll('.sidebar-list-buttons div');
    thisApp.pages = document.querySelector('#pages').children;
    thisApp.secondOptionTemplate = '#template-links';
    thisApp.secondOptionWrapper = '.wrapper-second-option';

    const idFromHash = window.location.hash.replace('#/', '');

    thisApp.defaultPage = thisApp.pages[0].id;
    let pageMatchingHash = thisApp.defaultPage;
    
    for (let page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }
    
    thisApp.activatePage(pageMatchingHash);

    window.location.hash = '#/' + pageMatchingHash;

    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function(event) {
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
      thisApp.sidebarWrapper.classList.toggle('slide', visible);
      thisApp.contentWrapper.classList.toggle('dim', visible);
      
    }

    thisApp.contentWrapper.addEventListener('click', function(e) {
      e.preventDefault();
      toggleMenu(false);
    });

    document.querySelector('.hamburger').addEventListener('click', function(e) {
      e.preventDefault();
      toggleMenu();
    });
  },

  initModal: function() {
    const thisApp = this;

    function closeModal() {
      document.getElementById('overlay').classList.remove('show');
    }

    document.querySelectorAll('#overlay .js--close-modal').forEach(function (btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal();
      });
    });

    document.querySelector('#overlay').addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal();
      }
    });

    document.addEventListener('keyup', function(e) {
      if (e.keyCode === 27) {
        closeModal();
      }
    });
    document.querySelector('#quit-button').addEventListener('click', function(e) {
      e.preventDefault();
      
      thisApp.activatePage(thisApp.defaultPage);
      
      for (let profile of thisApp.profileName) {
        profile.innerHTML = '';
      }
    });

    document.querySelectorAll('.button-modal').forEach(function (button) {
      
      button.addEventListener('click', function(e) {
        const clickedElement = this;
        e.preventDefault();

        const id = '.modal-' + clickedElement.id;
        console.log('modal id: ', id);
        thisApp.openModal(id);
      });
    });
  },

  openModal: function(modal) {
    document.querySelectorAll('#overlay > *').forEach(function(modal) {
      
      modal.classList.remove('show');
    });
    
    document.querySelector('#overlay').classList.add('show');
    document.querySelector(modal).classList.add('show');
  },

  startPage: function() {
    const thisApp = this;

    document.querySelector('#enter').addEventListener('click', function() {

      const inputLogin = document.querySelector('#page-login');

      thisApp.activatePage(thisApp.pages[1].id);

      thisApp.profileName = document.querySelectorAll('.profile-name');
      
      for (let profile of thisApp.profileName) {

        profile.innerHTML = inputLogin.value;
      }
    });
  },

  activatePage: function(pageId) {
    const thisApp = this;

    thisApp.wrapper = document.querySelector('.' + pageId + '-wrapper');

    const select = '#template-' + pageId;

    const template = Handlebars.compile(document.querySelector(select).innerHTML);

    const generateHTML = template();

    thisApp.wrapper.innerHTML = generateHTML;

    for (let page of thisApp.pages) {
      page.classList.toggle('active', page.id == pageId);
    }

    if (pageId == thisApp.defaultPage) {
      thisApp.startPage();
    }

    if (pageId == thisApp.pages[1].id) {
      const ctx = document.getElementById('myChart').getContext('2d');
      // eslint-disable-next-line no-unused-vars
      const myChart = new Chart(ctx, {
        // 1
        type: 'bar',
        data: {
          // 2
          labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
          // 3
          datasets: [{
            // 4
            label: 'Signups',
            // 5
            backgroundColor: '#8DBEC8',
            borderColor: '#8DBEC8',
            // 6
            data: [ 52, 51, 41, 94, 26, 6, 72, 9, 21, 88 ],
          },
          {
            label: 'FTD',
            backgroundColor: '#F29E4E',
            borderColor: '#F29E4E',
            data: [ 6, 72, 1, 0, 47, 11, 50, 44, 63, 76 ],
          },
          {
            label: 'Earned',
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
    
    thisApp.initModal();

    window.location.hash = '#/' + pageId;
  },

  init: function() {
    const thisApp = this;

    thisApp.initPages();
  }
};

adminInterface.init();
