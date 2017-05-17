//ScoreView
function ScoreView(score) {
	EventEmitter.call(this);
    this.score = score;

    // binds
    this.viewToGame = this.viewToGame.bind(this);
    this.viewToScore = this.viewToScore.bind(this);
    this.showScores = this.showScores.bind(this);

    //init
    this.init();
}

ScoreView.prototype = Object.create(EventEmitter.prototype);
ScoreView.prototype.constructor = ScoreView;

ScoreView.prototype.init = function(){
    $('#affichage').css('display', 'block ');
    $('#display-scores').css('display', 'none');

    $('#scores').click( this.viewToScore);
    $('#joueur').click( this.viewToGame);

     this.score.on('set-scores', this.showScores);
}

ScoreView.prototype.viewToScore = function(){
    $('#affichage').css('display', 'none');
    $('#display-scores').css('display', 'block ');
    this.emit('show-scores');
}

ScoreView.prototype.viewToGame = function(){
    $('#affichage').css('display', 'block ');
    $('#display-scores').css('display', 'none');
}


ScoreView.prototype.showScores = function(data) {
     
    $("#table-scores tbody tr").remove();
    
    $.each(data.scores, (function(i, val){

        $("#table-scores").append(this.createLine(val));
    }).bind(this));
}

// create a kitten line for the table
ScoreView.prototype.createLine = function(data) {

    // data
    var name = data['name'] || '';
    var score = data['score'] || '';
    
    // line
    var line = "<tr>";
    line += "<td>"+name+"</td>";
    line += "<td>"+score+"</td>";
    line += "</tr>";
    console.log(line);
    return line;
}