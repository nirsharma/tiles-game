(function(config) {
    
    var levels = config.levels;
    var passingScore = config.passingScore;
    var lightTime = config.timeToTap;
    var timePerLevel = config.timePerLevel;
    var gridSize = 2;
    var tileHandler, levelHandler;
    var status = false;

    var score = 0;

    var levelScore = 0;

    var currentTileNode;

    var container = document.getElementById('container');

    var header = document.getElementsByTagName('h3')[0];

    function startGame() {

    }

    function gameOver() {
        clearInterval(tileHandler);
        clearInterval(levelHandler);
        alert('Game Over !, your total score is :- ' + score);
    }

    this.generateNextLevel = function() {
        gridSize++;
        score += levelScore;
        if(status && (levelScore < passingScore || levels == gridSize-3) ) {
            gameOver();
            return;
        }
        levelScore = 0;
        var height = (100 / gridSize) + '%';
        str = '<div class="tile" style="height: '+height +'; width: '+ height +';"></div>';
            container.innerHTML = '';
        for(var i=0; i < gridSize * gridSize; i++)
            container.innerHTML += str;
            status = true;
    }

    function generateRandom() {
        var row = Math.floor((Math.random() * gridSize) + 1);
        var col = Math.floor((Math.random() * gridSize) + 1);
        var ob = {};
        ob.row = row;
        ob.col = col;
        return ob;
    }

    function lightRandomTile() {
        if(currentTileNode)
            currentTileNode.style.backgroundColor = 'white';
        var tile = generateRandom();
        var nTh = (tile.row - 1) * gridSize + tile.col;
        currentTileNode = document.getElementsByClassName('tile')[nTh-1];
        currentTileNode.style.backgroundColor = 'yellow';
    }


    container.addEventListener('click', function(evt) {
        if(evt.target == currentTileNode) levelScore++;
        else levelScore--;
        header.innerHTML = 'Score: ' + levelScore;
    });

    levelHandler = setInterval(generateNextLevel, timePerLevel * 1000);
        generateNextLevel();

    tileHandler = setInterval(lightRandomTile, lightTime);


})(config);