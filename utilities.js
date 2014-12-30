function launch(obj,speed,angle){
	velocity = angle2vel(speed,angle)
	//console.log(velocity)
	obj.vx += velocity[0];
	obj.vy += velocity[1];
}


function angle2vel(speed,angle){
	return [Math.cos(angle)*speed,-Math.sin(angle)*speed];
}

function angleCalc(obj,target) {
	dx = target.x-obj.x
	dy = target.y-obj.y
	angle = Math.atan(dy/dx)*180/Math.PI
	angle = Math.abs(angle)
	if(dx < 0 && dy < 0)angle = 90 - angle + 90
	if(dx > 0 && dy > 0)angle = 90 - angle + 270
	if(dx < 0 && dy > 0)angle = angle + 180
	
	if(angle == 0 && dx<=0)angle = 180
	if(angle == 90 && dy>=0)angle = 270
	return angle*Math.PI/180
};

function distance(obj1,obj2){
	return Math.sqrt((obj2.x-obj1.x)*(obj2.x-obj1.x)+(obj2.y-obj1.y)*(obj2.y-obj1.y));
}