canvas = document.getElementById("canvas");
c = canvas.getContext("2d");

smallerSide = window.innerWidth>window.innerHeight?window.innerHeight:window.innerWidth;

canvas.width = window.innerWidth//smallerSide;
canvas.height = window.innerHeight//smallerSide;

fps = 30
soldiers = [],teams=[];

firstMap = new map(10,10);

function map(rows,columns){
    this.rows = rows;
    this.columns = columns;
    
    this.squareSize = smallerSide/this.columns;

    this.board = [];
    
    for(i=0;i<this.rows;i++){
        this.board.push([])
        for(i2=0;i2<this.columns;i2++)this.board[i].push(0)
    }
}

function bullet(x,y){
    this.x=x;
    this.y=y;
    this.vx=0;
    this.vy=0;
    this.width=10;
    this.height=10;
    this.dmg=10;
}

/*map.prototype.getBoardPos = function(obj){
    obj
}*/

function soldier(x,y){
    spriteSheet.apply(this,[8,12]);
    this.x=x;
    this.y=y;
    this.vx=0;
    this.vy=0;
    this.health = 10;
    this.width = 60;
    this.height = 60;
    this.id=1;//identifies as soldier
    this.meleeAttack = 0;
    this.direction = 3/2*Math.PI;
    this.attacking =false;
    this.bullets = [];
    this.loaded = true;
    //firstMap.board[x][y] = this.id;
}

//soldier.prototype = new spriteSheet(8,12)

soldier.prototype.move = function(speed,vertical){
    
    speed = speed/100;
    if(speed > 1)speed = 1;
    
    if(vertical){
        this.vy = speed;
    }else{
        this.vx = speed;
    }

    this.direction=this.getDir();
}



soldier.prototype.getDir = function(){
    return angleCalc(this,{x:this.x+this.vx,y:this.y+this.vy})
}

soldier.prototype.attack = function(direction){
    if(this.loaded){
        this.loaded = false;
        load(this);
        this.bullets.push(new bullet(this.x+this.width/2,this.y+this.height/2))
        launch(this.bullets[this.bullets.length-1],4,this.direction)
    }
}

function load(soldierObj){
    setTimeout(function(){soldierObj.loaded=true},3000);
}

function team(){
    this.soldiers=[];

    this.addCode = function(code,vars){
        //define your variables in vars as a funtion
        //it will run once
        this.customVars = vars;
        //all vars defined
        this.customVars();
        //first write a function
        //then pass it to this function
        //it will run every frame
        this.code = code;
    }

    this.customVars = function(){

    }


    this.code = function(){
        
    }

    this.getEnemies= function(){
        enemies = [];
        for(i=0;i<teams.length;i++)
            if (teams[i]!=this)enemies.push(i)
        return enemies
    }
}

function bulletCollision(bulletObj,teamNum){
    //console.log(teamNum)

    for(i3=0;i3<teams.length;i3++){
        //console.log(teamNum!==i3)
        if(teamNum !== i3){
            //console.log(i3)
            teams[i3].soldiers.map(function(target){
               
                if(distance(bulletObj,target)<40){
                    teams[i3].soldiers.splice(teams[i3].soldiers.indexOf(target),1)
                }
            })
        }
    }
}



function updateSoldiers(teamNum){
    teams[teamNum].soldiers.map(function(e){
        e.y+=e.vy;
        e.x+=e.vx;

        e.bullets.map(function(ebullet){
            ebullet.x+=ebullet.vx;
            ebullet.y+=ebullet.vy;

            for(i2=0;i2<teams.length;i2++)
                bulletCollision(ebullet,teamNum)

        })
    })

    if(teams[teamNum].soldiers.length>0)
        teams[teamNum].code();
}

function renderMap(mapObj){
    mapObj.board.map(function(e){
        console.log("hello")
    })
}

function update(){
    for(i=0;i<teams.length;i++)
        updateSoldiers(i)
}

function renderSoldiers(teamNum){
    teams[teamNum].soldiers.map(function(e){
        //c.fillRect(e.x,e.y,10,10);
        //c.drawImage(q,e.coods[1]*q.width/e.cols,e.coods[0]*q.height/e.rows,q.width/e.cols,q.height/e.rows,e.x,e.y,e.width,e.height)
        e.sheetDraw();

        e.bullets.map(function(ebullet){
            c.fillRect(ebullet.x,ebullet.y,10,10)
        })
    })
}

function render(){
    c.clearRect(0,0,canvas.width,canvas.height);
    for(i=0;i<teams.length;i++)
        renderSoldiers(i)
    //renderMap(firstMap)
}

function game(){
    update();
    render();
}





function defaultVars(){
    this.soldiers.map(function(e){
    e.velocity = [Math.random()*200-100,Math.random()];
    })

    //this.nearest = {xthis.getEnemies()[0].soldiers[0].x,this.getEnemies()[0].soldiers[0].y};
}

function defaultAi(){
    this.soldiers.map(function(e){
        if(Math.random() >.98){
                e.velocity = [Math.random()*200-100,Math.random()*200-100];
                e.move(e.velocity[0],1)
                e.move(e.velocity[1])
        }
        /*this.getEnemies().map(function(eteam){
            eteam.soldiers.map(function(esoldier){

            })
        })*/
        e.attack();
    })
}

teams.push(new team())
teams.push(new team())

for(i=0;i<3;i++){
    teams[0].soldiers.push(new soldier(i*80,10))
    teams[1].soldiers.push(new soldier(i*80+500,200))
}


teams[0].code = defaultAi
teams[1].code = defaultAi


setInterval(game,1000/fps)



