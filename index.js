const elements = document.querySelector('.elements');
const popupEditProfile = document.querySelector('#popup-profile');
const popupEditContent = document.querySelector('#popup-content');
const popupImage = document.querySelector('.image-popup');

const closeButtons = document.querySelectorAll('.popup__close');

const elementsList = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;

const btnOpenEditProfile = document.querySelector('.profile__button_size_little');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const nameInputProfile = document.querySelector('.popup__item_el_profile-name');
const jobInputProfile = document.querySelector('.popup__item_el_profile-job');
const formEditProfile = document.forms.formEditProfile;
const btnCloseEditProfile = document.querySelector('#btn-profile-close');

const popupImageImage = document.querySelector('.image-popup__image');
const popupImageName = document.querySelector('.image-popup__name');

const nameInputContent = document.querySelector('.popup__item_el_content-name');
const linkImgInputContent = document.querySelector('.popup__item_el_content-link-img');
const btnOpenContent = document.querySelector('.profile__button_size_big');
const formEditContent = document.forms.formEditContent;
const btnCloseContent = document.querySelector('#btn-content-close');
  
//----------------Начало работы с массивом
//cards from the backend
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
//call initial card from the array [initialCards]
initialCards.reverse().forEach(function(element) {
    const elementElement = createCard(element.name, element.link)
    elementsList.append(elementElement)
})
//----------------Конец работы с массивом 


//----------------Закрытие поп-апа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
//close pop-up [closest]
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
//----------------Открытие поп-апа
function openPopup(popup) {
  popup.classList.add('popup_opened')
}
//----------------//


//----------------Начало изменения профиля
//open pop-ap [popupEditProfile]
function openFormProfile() {
  nameInputProfile.value = nameProfile.textContent;
  jobInputProfile.value = jobProfile.textContent;
  openPopup(popupEditProfile)
}
btnOpenEditProfile.addEventListener('click', openFormProfile);
//save profile and close pop-ap [popupEditProfile]
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInputProfile.value;
  jobProfile.textContent = jobInputProfile.value;
  closePopup(popupEditProfile);
}
formEditProfile.addEventListener('submit', handleProfileFormSubmit);
//----------------Конец изменения профиля


//----------------Начало добавления контента
//open pop-ap [popupEditContent]
function openFormContent() {
  openPopup(popupEditContent)
}
btnOpenContent.addEventListener('click', openFormContent);
//call card
function createCard(nameInputContent, linkImgInputContent) { 
  const cardElement = elementTemplate.cloneNode(true);
  const elementElement = cardElement.querySelector('.element'); 
  const elementMaskGroup = elementElement.querySelector('.element__mask-group')
  elementElement.querySelector('.element__name').textContent = nameInputContent;
  elementMaskGroup.src = linkImgInputContent;
  elementMaskGroup.alt = 'картинка ' + nameInputContent;
  //like
  const likeButton = elementElement.querySelector(".element__favorite-icon");
  likeButton.addEventListener('click', likeContent);
  function likeContent() {
    likeButton.classList.toggle('element__favorite-icon_active');
  }
  //remove
  const deleteButton = elementElement.querySelector('.element__urn-icon');
  deleteButton.addEventListener('click', removeContent);
  function removeContent(evt) {
    evt.target.closest('.element').remove();
  }
  //open img
  function handleImageClick(){
    openPopup(popupImage);
    popupImageImage.src = linkImgInputContent;
    popupImageName.textContent = nameInputContent;
    popupImageImage.alt =  'картинка ' + nameInputContent;
  }
  elementMaskGroup.addEventListener('click', handleImageClick);
  // add card and location
  elements.prepend(elementElement)
  return cardElement
}
//save new card and close pop-ap [popupEditContent]
function handleContenFormSubmit(evt) {
  //cancellation of default behavior
  evt.preventDefault();
  //function call [createCard]
  createCard(nameInputContent.value, linkImgInputContent.value);
  evt.target.reset()
  //closing after saving
  closePopup(popupEditContent);
}
formEditContent.addEventListener('submit', handleContenFormSubmit);
//----------------Конец добавления контента