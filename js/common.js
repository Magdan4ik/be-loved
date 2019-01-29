
window.addEventListener('load', function() {

	/* Vladislav M. scripts start */

	/* Sliding line on nav link */
		(function(d) {
			let link    = d.querySelectorAll(".header__navlist > li > a");
			let current = d.querySelector(".header__navlist > li.current > a");
			let line    = d.querySelector(".header__navline-indicator");

			link.forEach( el => {
				el.addEventListener('mouseover', () => sline(el));
				el.addEventListener('mouseout', () => sline(current));
				el.addEventListener('click', () => {
					current = el;
					link.forEach( el => el.parentNode.classList.remove('current'));
					el.parentNode.classList.add('current');
					sline(el);
				});
			});

			function sline(el) {
				let paddingL = parseInt(window.getComputedStyle(el).getPropertyValue('padding-left'));
				let paddingR = parseInt(window.getComputedStyle(el).getPropertyValue('padding-right'));

				line.style.width = el.offsetWidth - paddingL - paddingR + 'px';
				line.style.left  = el.getBoundingClientRect().left  + paddingL + 'px';
			};

			sline(current);
		}(document));


	/* Burger Menu*/
	(function(d) {
		let burger  = d.querySelector('.header__burger'),
			nav     = d.querySelector('.header__nav'),
			overlay = d.createElement('div');
			overlay.className = 'overlay';

			function toggleMobmenu() {
				burger.classList.toggle('active');
				nav.classList.toggle('active');
				d.body.classList.toggle('o-hidden');
				(nav.classList.contains('active')) ? d.body.insertBefore(overlay, d.body.firstChild) : overlay.remove()
			};

			[overlay, burger].forEach(el => el.addEventListener('click', toggleMobmenu));

	}(document));


	/* Mobile Sumbenu*/
	(function(d, w) {
		let li    = d.querySelectorAll(".header__navlist > li");
		let ddown = d.querySelectorAll('.header__navlist-dropdown');

		li.forEach(el => {
			let	more = d.createElement('div');
				more.className = 'navlist__more';
				more.innerHTML = "Развернуть";
			el.insertBefore(more, el.lastChild);

		});

		let more = d.querySelectorAll('.navlist__more');

		more.forEach(el => {
			el.addEventListener('click', (event) => {
				toggleMore(el);
				closeOthers(el);
			});
		});

		function toggleMore(el) {
			el.classList.toggle('active');
			if(el.classList.contains('active')) {
				el.parentNode.querySelector('.header__navlist-dropdown').classList.add('visible');
				el.innerHTML = "Свернуть";
			} else {
				el.parentNode.querySelector('.header__navlist-dropdown').classList.remove('visible');
				el.innerHTML = "Развернуть"
			}
		};

		function closeOthers(el) {
			more.forEach(el => {
				if(el !== event.target) {
					el.classList.remove('active');
					el.innerHTML = "Развернуть";
					el.parentNode.querySelector('.header__navlist-dropdown').classList.remove('visible');
				};
			});
		};

	}(document, window));


	(function(d, w) {
		const header = d.querySelector('header.header');
		const headerCompact = () => setTimeout(() => {(w.pageYOffset > 50) ? header.dataset.compacted = true : header.dataset.compacted = false}, 150);
		w.addEventListener("scroll", headerCompact);
	}(document, window));




	/* ALL POPUP`S START */
	(function(d, w) {
		d.querySelectorAll('.open__popup').forEach(el => {
		el.addEventListener('click', () => {
			d.querySelector(el.dataset.popup).dataset.visible = true;
		});
		});
	
		d.querySelectorAll('.popup').forEach(el => {
		el.addEventListener('click', e => {
			if(e.target.classList.contains("popup") || e.target.classList.contains("popup__close")) {
			el.dataset.visible = false;
			}
		});
		});
	}(document, window));
	/* POPUP END */
	
	
	/* SALE POPUP START */
	(function(d, w) {
		const popup = d.querySelector('.popup.discount');
	
		if(!sessionStorage.getItem('firstVisit')) {
			sessionStorage.setItem('firstVisit', Date.now());
		}
	
		let timer;
	
		// if($.cookie('emailSubscription') != 'subscription') {
			
			timer = setInterval(popupTimer, 1000);
	
			function popupTimer() {
			let time = Date.now() - parseInt(sessionStorage.getItem('firstVisit'));
			localStorage.setItem('timeOnSite', time);
			if (+time/1000 >= 5) {
				showDiscount();
				clearInterval(timer);
			}
			}
	
		// } else {
		//   localStorage.removeItem('timeOnSite');
		//   sessionStorage.removeItem('firstVisit');
		// }
	
		function showDiscount() {
			popup.dataset.visible = true;
		}
	
		function closeDiscount() {
			popup.dataset.visible = false;
			sessionStorage.setItem('firstVisit', Date.now());
			clearInterval(timer);
			if (!d.querySelector('.discount__success')) {
			setInterval(popupTimer, 1000);
			}
		}
	
		popup.addEventListener('click', e => {
			if(e.target.classList.contains("popup") || e.target.classList.contains("popup__close")) {
			closeDiscount();
			}
		});
	
	}(document, window));
	/* SALE POPUP END */

	

});