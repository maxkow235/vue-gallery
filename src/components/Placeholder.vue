<template>
	<div class="placeholder" @click="$emit('imageAdd')">
		
	</div>
</template>
<script></script>
<style scoped>
.placeholder {
	position: relative;
  	border-radius: 3px;
  	background-color: rgb( 255, 255, 255 );
  	box-shadow: 0px 2px 10px 0px rgb( 194, 205, 216 );
	background-color: #fff;
	overflow: hidden;
	text-align: center;
	transition: filter 0.3s;
}

.placeholder:hover {
	filter: contrast(1.2);
	cursor: pointer;
}

.placeholder:before {
	content: '';
	background: url("../assets/plus_icon.png") 50% 50% no-repeat;
	border-radius: 50%;
  	background-color: rgb( 33, 184, 198 );
  	box-shadow: 0px 2px 3px 0px rgb( 160, 176, 186 );
  	width: 50px;
  	height: 50px;
	position: absolute;
  	top: 50%;
  	left: 50%;
  	margin:-25px 0 0 -25px;
}

.placeholder:after {
	font-family: "Open Sans",sans-serif;
	content: 'Add your Picture';
	position: absolute;
	top: 140px;
	left: 50%;
	margin-left: -40px;
	width: 80px;
	font-size: 14px;
	color: #a0b0ba;
}
</style>