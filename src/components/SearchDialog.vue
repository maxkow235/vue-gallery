<template>
	<div class="bg" v-bind:class="{visible:isVisible}">
		<div>
			<div class="close-btn" @click="toggleDialog"></div>
			<div class="loader" v-if="loading"></div>
				<div class="preview">
					<img>
				</div>
				<div class="search">
					<button class='accept' v-if="!loading" @click="acceptImage">Load this image</button>
					<input type="text" class="query">
					<input type="submit" class="flickr" value="Search images on:" @click="getFlickrImage">
				</div>
		</div>
	</div>
</template>
<script>
	export default {
		
		data() {
			return {
				isVisible:false,
				previewSource:'',
				loading:false,
				isLoaded:false
			}
		},
		methods: {
			getImageSize(imageId) {
				this.isLoaded = false;
				var component = this;
				let requestSize = new XMLHttpRequest();
					let getImage = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=3c77930cc5ea5b30c2cdd8b172da85ed&photo_id='+imageId+'&format=json&nojsoncallback=1'
					requestSize.open('GET',getImage);
					requestSize.send();
					requestSize.onreadystatechange = function() {
						if(requestSize.readyState==4 && requestSize.status==200) {
								let img = new Image();
								img = document.querySelector('.preview img');
        						let foundSizes = JSON.parse(requestSize.responseText);
        						let originalSize = foundSizes.sizes.size.length-1;
        						img.src = foundSizes.sizes.size[originalSize].source;
        						component.previewSource = img.src;
        						component.isLoaded = true;
        				}
					}
			},
			getFlickrImage(e) {
				e.preventDefault();
				let query = document.querySelector(".query").value;
				let input = document.querySelector('input.flickr');
				let searchMethod = 'flickr.photos.search';
				var component = this;
				if(query != ''&&query.indexOf('&') == -1&&(query.replace(/\s/g, '').length)){
					let request = new XMLHttpRequest();
					let url = 'https://api.flickr.com/services/rest/?method='+searchMethod+'&api_key=3c77930cc5ea5b30c2cdd8b172da85ed&text='
					+query+'&format=json&nojsoncallback=1'
					request.open('GET',url);
					request.send();
					request.onreadystatechange = function() {
						if(request.readyState==4 && request.status==200){
        						let foundImages = JSON.parse(request.responseText);
        					if(foundImages.photos.photo.length !==0){
        						let range = Math.floor(Math.random() *foundImages.photos.photo.length-1) + 1;
        						let img = new Image();
								img = document.querySelector('.preview img');
        						component.loading = true;
        						img.style.opacity = 0;
        						input.disabled = true;
        						img.onload = function(){
        							input.disabled = false;
        							component.loading = false;
        							img.style.opacity = 1;
        						}
        						component.getImageSize(foundImages.photos.photo[range].id);
        					}
        					else{
        						alert("No photos found");
        					}	
        				}	

					}

				}
			},
			toggleDialog() {
				this.isVisible = false;
			},
			acceptImage() {
				if(this.isLoaded)
				this.$emit('pushLoadedImage');
			}
		}
	}
</script>
<style scoped>

.accept {
	background-color: white;
	font-family: 'Open Sans';
	font-size: 16px;
	position: absolute;
	margin: 0 auto;
}

.loader {
    border: 10px solid #ccc; 
    border-top: 10px solid  rgb( 33, 184, 198 );
    border-radius: 50%;
    margin:0 auto;
    margin-top: 300px;
    width: 50px;
    height: 50px;
    animation: spin 1.5s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.search {
	margin: auto;
	margin-bottom: 150px;
	position: absolute;
	left: 0;
	right: 0;
	bottom: 20px;
	text-align: center;
}
img {
	display: block;
	margin: 0 auto;
	width: 100%;
}
.query {
	margin-bottom: 20px;
	border:0;
	outline: 0;
	font-size: 16px;
	background-color: white;
	font-family: 'Open Sans';
	border-bottom: 2px solid #ccc;

}

.flickr {
	background: url('../assets/flickr.png') no-repeat center;
	background-size: 40%;
	background-position: right;
	text-align: left;
	height: 100px;
	width:220px;
	font-family: 'Open Sans';
	font-size: 14px;
}

.close-btn {
  background: url('../assets/close-icon.png');
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top:10px;
}

.bg {
	display: none;
	 width:100%;
    height:100%;
    position:fixed;
    top:0px;
    left:0px;
    background:rgba(242,243,245,0.7);
}

.accept,.flickr {
	background-color: rgb( 33, 184, 198 );
	border: 0;
	border-radius: 15px;
	color: #fff;
}


div.visible {
	display: block;
}

.bg > div {
  display: inline-block;
  border-radius: 3px;
  background-color: rgba( 255, 255, 255,0.1 );
  box-shadow: 0px 2px 10px 0px rgb( 194, 205, 216 );
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
.preview {
	height: 600px;
	width: 600px;
	margin:0 auto;
}
</style>