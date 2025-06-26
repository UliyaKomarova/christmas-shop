function getGiftsData() {
    return fetch('./js/gifts.json')
        .then(response => {
            if (!response.ok) {
                console.log('No data');
            }
            return response.json();
        });
};

function giftBlock(params, popupMode = 0) {
    let giftBlock = document.createElement('div');
    let giftImage = document.createElement('img');
    let giftInformation = document.createElement('div');
    let giftCategory = document.createElement('span');
    let giftName = document.createElement('span');
    let giftDescription;
    let giftSuperpowers;
    let giftSuperpowersTable;

    giftBlock.classList.add('catalog-item');
    giftBlock.setAttribute('data-name', params.name);

    giftImage.classList.add('catalog-item__img');
    giftImage.setAttribute('alt', params.name);
    giftImage.setAttribute('src', `./assets/${params.category}.png`);

    giftInformation.classList.add('catalog-item__info');

    giftCategory.classList.add('catalog-item__category');
    giftCategory.setAttribute('data-category', params.category);
    giftCategory.textContent = `For ${params.category}`;

    giftName.classList.add('catalog-item__name');
    giftName.textContent = params.name;

    giftInformation.append(giftCategory, giftName);

    if (popupMode) {
        giftDescription = document.createElement('span');
        giftSuperpowers = document.createElement('div');

        giftDescription.classList.add('catalog-item__description');
        giftDescription.textContent = params.description;

        giftSuperpowers.classList.add('catalog-item__superpowers');
        giftSuperpowers.innerHTML = `<span class="catalog-item__superpowers-title">Adds superpowers to:</span>`;
        giftSuperpowersTable = document.createElement('div');
        giftSuperpowersTable.classList.add('catalog-item__table');

        for (let key in params.superpowers) {
            let tableRow = document.createElement('div');
            tableRow.classList.add('catalog-item__table-row');
            tableRow.setAttribute('data-superpower', params.superpowers[key]);

            tableRow.innerHTML = `<div class="catalog-item__table-text">${key}</div>
                                    <div class="catalog-item__table-text">${params.superpowers[key]}</div>
                                    <div class="catalog-item__table-icon"></div>
                                    <div class="catalog-item__table-icon"></div>
                                    <div class="catalog-item__table-icon"></div>
                                    <div class="catalog-item__table-icon"></div>
                                    <div class="catalog-item__table-icon"></div>`;

            giftSuperpowersTable.append(tableRow);
        }

        giftSuperpowers.append(giftSuperpowersTable);

        giftInformation.append(giftDescription, giftSuperpowers);
    }

    giftBlock.append(giftImage, giftInformation);

    return giftBlock;
};

function shuffleGiftsArray(array) {

    for (let i = (array.length - 1); i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
};

async function addGiftOnPage(category = 0) {
    const bestGiftsContainer = document.getElementById('bestGifts');
    const catalog = document.getElementById('catalog');
    const giftsArray = await getGiftsData();
    let shuffledGiftsArray = [...giftsArray];

    shuffledGiftsArray = shuffleGiftsArray(shuffledGiftsArray);

    if (bestGiftsContainer) {
        for (let i = 0; i < 4; i++) {
            bestGiftsContainer.append(giftBlock(shuffledGiftsArray[i]));
        }
    }

    if (catalog) {
        for (let i = 0; i < giftsArray.length; i++) {
            if ((category && category === giftsArray[i].category) || !category) {
                catalog.append(giftBlock(giftsArray[i]));
            }
        }
    }
};

function initCategories() {
    let tabs = document.querySelectorAll('.tabs-list__item');

    tabs.forEach((tab) => {
        tab.addEventListener('click', event => showCategoryGifts(event.target));
    })
};

function showCategoryGifts(tab) {
    const activeClass ='_active';
    const catalog = document.getElementById('catalog');
    let tabs = document.querySelectorAll('.tabs-list__item');
    let category = tab.getAttribute('data-category');

    tabs.forEach((tab) => {
        if (tab.classList.contains(activeClass)) {
            tab.classList.remove(activeClass);
        }
    });

    tab.classList.add(activeClass);

    catalog.innerHTML = '';
    addGiftOnPage(category);
};

function initPopup() {
    const body = document.querySelector('body');
    const noScrollPageClass = '_no-scroll';
    const catalog = document.querySelector('.catalog');
    const popup = document.getElementById('popup');
    const popupClose = document.getElementById('popupClose');
    const popupInner = popup.querySelector('.popup-inner');

    catalog.addEventListener('click', async (event) => {
        let gift = await getChosenGift(event.target.closest('.catalog-item'));

        updatePopupData(gift);
        showGiftPopup();
        body.classList.add(noScrollPageClass);
    });

    popupClose.addEventListener('click', () => {
        popup.close();
        body.classList.remove(noScrollPageClass);
    });

    window.addEventListener('click', (event) => {
        if(event.target == popup){
            popup.close();
            body.classList.remove(noScrollPageClass);
        }
    });
};

async function getChosenGift(giftBlock) {
    const giftsArray = await getGiftsData();
    const giftName = giftBlock.getAttribute('data-name');
    const gift = giftsArray.find((gift) => {
        return gift.name == giftName;
    });

    return gift;
}

function showGiftPopup() {
    const popup = document.getElementById('popup');
    popup.showModal()
}

function updatePopupData(gift) {
    const popup = document.getElementById('popup');
    const popupInner = popup.querySelector('.popup-inner');

    popupInner.innerHTML = '';
    popupInner.append(giftBlock(gift, true));
}

addGiftOnPage();
initCategories();
initPopup();