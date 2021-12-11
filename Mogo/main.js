let FscreenButtContent = "'"+document.querySelector('#learn-more').innerHTML+"'";
document.documentElement.style.setProperty('--h', FscreenButtContent);

const spollersItem = document.querySelectorAll('.what-we-do__item');

function spollers(item){
   for (let index = 0; index < spollersItem.length; index ++) {
      spollersItem[index].classList.remove('_active');
	}
   spollersItem[item-1].classList.add('_active');
}

window.onscroll = function showHeader() {
	if(window.pageYOffset > document.documentElement.clientHeight - 1) {
		document.querySelector('.header').classList.add('fixed');
	}
	else {
		document.querySelector('.header').classList.remove('fixed')
		}
}
