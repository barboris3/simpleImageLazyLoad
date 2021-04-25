class SimpleImageLazyLoad {
	
	constructor() {
		SimpleImageLazyLoad.loadVisableImage();
		window.addEventListener('scroll', SimpleImageLazyLoad.loadVisableImage);
	}
	
	static async loadVisableImage() {
		
		let imgs = SimpleImageLazyLoad.getImagesForLoad();
		
		if(!imgs) return;
		
		for(let img of imgs) {
			
			if(!SimpleImageLazyLoad.isImageVisable(img)) continue;
			
			try {
				await SimpleImageLazyLoad.loadImage(img);
			} catch(error) {
				console.log(error);
				img.alt = 'ERR_FILE_NOT_FOUND';
			}
		}
	}
	
	static loadImage(img) {
		return new Promise((resolve, reject) => {
			img.src = img.dataset.lazySrc;
			img.onload = resolve;
			img.onerror = reject;
		});
	}
	
	static getImagesForLoad() {
		return document.querySelectorAll('img[data-lazy-src]');
	}
	
	static getImagesForCreatingPlaceHolders() {
		return document.querySelectorAll('img[data-lazy-src]:not([src])');
	}
	
	static isImageVisable(img) {
		let imgCoords = img.getBoundingClientRect();
		return (imgCoords.top > 0 && imgCoords.top + imgCoords.height < document.documentElement.clientHeight) || (imgCoords.top < 0 && imgCoords.top + imgCoords.height > 0);
	}
}