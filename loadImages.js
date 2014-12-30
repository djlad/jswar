

function animation(target,imageArray,timeArray){
	this.t = 0;
	this.currentImage = 0;
	this.running = false; //keeps track of whether or not its running

	this.animate = function(){
		this.running = true
		this.t++;
		if(this.t>timeArray[this.currentImage]){
			this.t = 0;//reset timer
			this.currentImage++;//go to next image in imageArray

			if(this.currentImage>=imageArray.length){
				this.sprite = imageArray[0];//set sprite to original
				this.running = false;
				return;//end animation
			}
			target.sprite = imageArray[this.currentImage];

		}
	}

}


q = new Image();

q.src = "rawsoldiers.png"



function spriteSheet(rows,cols){
	this.rows = rows;
	this.cols = cols;
	this.coods=[0,0];
	this.change = function(index){
		this.coods[0] = Math.floor(index/this.cols);
		this.coods[1] = index%this.cols
		console.log(this)
	}
	this.sheetDraw = function(){
	       c.drawImage(q,this.coods[1]*q.width/this.cols,this.coods[0]*q.height/this.rows,q.width/this.cols,q.height/this.rows,this.x,this.y,this.width,this.height)
	}

}
