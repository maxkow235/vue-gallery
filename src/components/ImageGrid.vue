<template>
	<div class="grid">		
		<grid-item v-for="(item,index) in items" :key="index" :src="item.src"  v-bind:class="{wd:item.wide,tl:item.tall}" :likes="item.likes" :comments ="item.comments" :dislikes="item.dislikes" @showPopup="showPopup(item)" @deleteItem="removeItem(item)"></grid-item>
		<placeholder @imageAdd="uploadImage"></placeholder>

		<popup @hidePopup="hidePopup" v-bind:class="{hidden:state}" ref="popup"></popup>
    <search-dialog ref="searchdialog" @pushLoadedImage="pushImage"></search-dialog>
	</div>
</template>

<script>
import db from './db'

let itemsRef = db.ref('items');
export default {
   data() {
    return{
      state:true,
      newImage: {
          wide:false,
          tall:false,
          src:'',
          comments:'',
          likes:0,
          dislikes:0,
          liked:false,
          disliked:false
      }
   }
  },
  firebase: {
    items:itemsRef
  },
  methods: {
    showPopup(item){
    	var popup = this.$refs.popup;
    	this.state =false;
    	popup.item = item;
    },
    hidePopup(){
      var popup = this.$refs.popup;
      let p = popup.item;
    	this.state = true;
      itemsRef.child(popup.item[".key"]).update({likes:p.likes,dislikes:p.dislikes,comments:p.comments,disliked:p.disliked,liked:p.liked});
    },
    uploadImage() {
      let searchDialog =this.$refs.searchdialog;
      searchDialog.isVisible = true;    
    },
    pushImage() {
      let src =this.$refs.searchdialog.previewSource;
      var img = new Image;
      let newImage = this.newImage;
      let array = itemsRef;
      img.src = src;      
        img.onload = function() {         
          let hAspect = img.height/256;
          let wAspect = img.width/256;
          let diff = hAspect - wAspect;
          newImage.src = img.src;
              if(diff>=2) {newImage.wide = true;}
              else if (diff<=-2){newImage.tall = true;}
              array.push(newImage);
              newImage.wide = false;
              newImage.tall = false;
              newImage.src = '';
        };      
    },
    removeItem(item) {
       itemsRef.child(item[".key"]).remove();
    }
  },
  
}
</script>

<style scoped>
span {
	color: #21b8c6;
}

input {
	display: none;
}

.hidden {
	display: none;
}
.grid {
	display: grid;
	margin:0 auto;
	width: 974px;
	grid-template-columns: repeat(100,236px);
	grid-auto-flow: column dense;
	grid-template-rows: repeat(3,200px);
	grid-gap: 10px;
	padding: 10px 10px 50px 10px;
	height: 650px;
	overflow-x: scroll;
}

.grid::-webkit-scrollbar-thumb {
  background-color: rgb( 33, 184, 198 );
  border-radius: 10px;
  height: 10px;
}

.grid::-webkit-scrollbar{
	border-radius: 10px;
	height: 10px;
	background-color: rgb( 209, 218, 227 );
}

.wd {
	grid-column: span 2;
}

.tl {
	grid-row: span 2;
}
</style>