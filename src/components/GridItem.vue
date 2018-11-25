<template>
	<div class="box">
		<img :src="src">
		<button class="delete" @click="$emit('deleteItem')"><i class="fas fa-trash-alt"></i></button>
		<div class="hover-box" @click="$emit('showPopup')">
			<div class="comments"><div class="num">{{comments.length}}</div></div>
			<div class="ratings">
				<div class="dislikes"><div class="num">{{dislikes}}</div></div>
				<div class="likes"><div class="num">{{likes}}</div></div>
			</div>
		</div>
		
	</div>
</template>
<script>
	export default {
		props: ['tall','wide','likes','dislikes','comments','src','liked','disliked']
  	}
</script>
<style scoped>
button {
	background-color: #fff;
	position: absolute;
	color: rgb( 13, 127, 138 );
	border-radius: 5px;
	width: 40px;
	height: 40px;
	font-size: 20px;
	top: 20px;
	left:20px;
}

.hover-box {
  background-color:white;
  padding: 10px;
  opacity:0;
  height: 40px;
  line-height: 50px;
  width: 100%;
  position: absolute;
  bottom: 0;
}

.box:hover {
	cursor: pointer;
}

.box:hover>.hover-box {
	opacity: 0.949;
}

.comments,.likes,.dislikes {
	position: relative;
	display: inline-block;
	background-repeat: no-repeat;
	height: 29px;
	width: 35px;
}
.hover-box .ratings {
	float:right;
	margin-right: 16px;
}
.comments {
	background-image: url("../assets/comment-icon.png");
	margin-left: 16px;
}

.likes {
	background-image: url("../assets/like-icon.png");
}

.dislikes {
	margin-right: 10px;
	background-image: url("../assets/dislike-icon.png");
}

.num {
  font-size: 9px;
  font-family: "Open Sans";
  color: rgb( 13, 127, 138 );
  line-height: 6.545;
  text-align: center;
  position: absolute;
  right: 5px;
  top: -20px;
}

.box {
	display: flex;
	position: relative;
	justify-content: center;
  	border-radius: 3px;
  	background-color: rgb( 255, 255, 255 );
  	box-shadow: 0px 2px 10px 0px rgb( 194, 205, 216 );
	background-color: #fff;
	overflow: hidden;
}
.box img {
	align-self: center;
	width: 280%;
}


</style>