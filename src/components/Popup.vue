<template>
	<div class="bg">
		<div id="popup">
      <div class="close-btn" @click="$emit('hidePopup',item)"></div>
      <div class="image">
         <div class="img-container">
            <img :src="this.item.src">
         </div>
          <div class="hover-box">
            <button class="btn dislikes" @click="dislike" :class="{active:this.item.disliked==true}"><div class="num">{{this.item.dislikes}}</div></button>
            <button class="btn likes" @click="like" :class="{active:this.item.liked==true}"><div class="num">{{this.item.likes}}</div></button>
          </div>
      </div>
      <div class="comment-section">
        <h2>Comments: {{this.item.comments.length}}</h2>
        <div class="comments">
          <div class="comment" v-for="comment in item.comments">
            <span class="author">By {{comment.author}} </span>
            <span class="time">{{comment.time}}</span>
            <div class="text">{{comment.text}}</div>
          </div>
        </div>
        <div>
            <form>
              <input type="text" class="nickname" placeholder="Type your nickname here..." value="">
              <input type="text" class="comment-input" placeholder="Write your comment here..." value="">
              <input class="send-btn" @click="newComment" type="reset" value=""></input>
            </form>
        </div>
      </div>
		</div>
	</div>
</template>

<script>

	export default {
      props:['liked','disliked'],
	data() {
    return {
      item:{
        src:'',
        comments:'',
        likes:'',
        dislikes:'',
        liked:'se',
        disliked:'se'
      }
    }
  },
  methods: {
    like() {
      if(!this.item.liked){
        this.item.liked=true;
         if(this.item.dislikes>0&&this.item.disliked)
          this.item.dislikes--;
        this.item.disliked=false;
        this.item.likes++;
       
      }
      else {
        this.item.liked = false;
        this.item.likes--;
      }
    },
    dislike() {
      if(!this.item.disliked){
        this.item.disliked=true;
         if(this.item.likes>0&&this.item.liked)
          this.item.likes--;
        this.item.liked=false;
        this.item.dislikes++;
        
      }
      else {
        this.item.disliked = false;
        this.item.dislikes--;
      }
    },
     newComment(){
      var currentDate= new Date();
      var timeStamp = this.formatDate(currentDate);
          
      var text = document.querySelector('input.comment-input').value;
      var author = document.querySelector('input.nickname').value;
      if((text!=""&&author!="")){
      	if(this.item.comments == '')
      		this.item.comments = [];
        this.item.comments.push({
          author:author,
          time:timeStamp,
          text:text
        });
      }      
    },
   formatDate(date) {
      var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];

      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();

      return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

  }
 
		
}
  	
</script>

<style scoped>

.submit-btn:disabled {
  background-color: #ccc;
}
.img-container {
  display: flex;
  align-self: top;
  justify-content: center;
}
h2 {
  margin: 0;
  margin-top: 20px;
  margin-left: 10px;
  font-family: 'Open Sans';
  font-size: 24px;
  color: rgb( 132, 153, 167 );
}

.nickname {
  border:0;
  width: 280px;
  margin-bottom: 20px;
  height: 26px;
  border-bottom: 2px solid rgb( 209, 218, 227 );
}

.btn {
  background-color: rgb( 224, 229, 233 );
  background-repeat: no-repeat;
  background-position: center;
  border: 0;
  outline: 0;
  cursor: pointer;
  transform:translateY(-15px);
  transition: transform 0.3s,background-color 0.3s;
  display: inline-block;
  float: right;
  margin: 5px;
  width: 65px;
  height: 60px;
}

.likes {
  background-image: url("../assets/like-icon.png");
}

.dislikes {
  background-image: url("../assets/dislike-icon.png");
}

.likes.active {
  background-image: url("../assets/like-white.png");
  background-color: #28d0ce;
  transform: translateY(-5px);
}

.dislikes.active {
   background-image: url("../assets/dislike-white.png");
  background-color: #d02828;
  transform: translateY(-5px);
}

.comment-input {
  height: 44px;
  border: 2px solid rgb( 209, 218, 227 );
  width: 240px;
}
.num {
  font-size: 10px;
  font-family: "Open Sans";
  color: rgb( 13, 127, 138 );
  line-height: 6.545;
  text-align: center;
  position: absolute;
  right: 18px;
  top: -8px;
}


img {
  width: 100%;
  display: block;
  margin:auto;
  top:0;
  height: auto;
}

.nickname,.comment-input {
   font-family: 'Open Sans';
   outline: 0;
  font-size: 14px;
  color: rgb( 149, 167, 179 );
  text-align: left;
}

.image {
  overflow:hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 450px;
  position: relative;
}
.send-btn {
  display: inline-block;
  border:0;
  border-radius: 2px;
  position: absolute;
  right: 36px;
  bottom: 20px; 
  background-color: rgb( 33, 184, 198 );
  width: 50px;
  height: 50px;
  background-image: url("../assets/send-icon.png");
  background-position: center;
  background-repeat: no-repeat;
}

.hover-box {
  opacity:0;
  background-color: white;
  width: 450px;
  height: 60px;
  transition: opacity 0.3s ease-out;
  position: absolute;
  bottom: 0;
}
.hover-box:hover {
   opacity: 0.949;
}


.comment {
  width: 290px;
  position: relative;
  margin: 0 auto;
  word-wrap: break-word;
  margin-top: 20px;
  font-family: "Open Sans";
}

.author,.time {
  font-size: 11px;
  top: -15px;
  color: rgb( 149, 167, 179 );
}

.text {
  border:2px solid rgb( 240, 243, 246 );
  border-radius: 3px;
  background-color: white;
  padding: 10px;
  font-size: 14px;
  color: rgb( 96, 117, 131 );
  text-align: left;
}

.comments::-webkit-scrollbar-thumb {
  background-color: rgb( 33, 184, 198 );
  border-radius: 10px;
   width: 5px;
}

.comments::-webkit-scrollbar{
  border-radius: 10px;
   width: 5px;
  background-color: rgb( 209, 218, 227 );
}

.author {
  position: absolute;
  left: 0;
}

.time {
  position: absolute;
  right: 0;
}

.bg {
	 width:100%;
    height:100%;
    position:fixed;
    top:0px;
    left:0px;
    background:rgba(242,243,245,0.7);
}

.comments {
  width: 320px;
  height: 420px;
  background-color: white;
  overflow-y:auto;
  border-bottom: 2px solid rgb( 209, 218, 227 );
}

.comment-section {
  width:328px;
  height: 570px;
  margin-left: 15px;
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

#popup{
  display: flex;
  border-radius: 3px;
  background-color: rgb( 255, 255, 255 );
  box-shadow: 0px 2px 10px 0px rgb( 194, 205, 216 );
  position: absolute;
  margin: auto;
  top: 0; left: 0; bottom: 0; right: 0;
  width: 810px;
  height: 595px;
}
</style>