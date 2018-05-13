$(()=>{
  console.log('JS linked');

  const $time = $('#time');
  const $go = $('.go');
  const $submit = $('.answers').hide();
  const $ready = $('.ready');
  const $sum = $('.sum').hide();
  const $answers = $('.answers');
  const $score = $('#points');
  const $next = $('#next').hide();
  const $retry = $('#retry').hide();

  let score = 0;
  let level = 1;

  let a = Math.floor(Math.random()*10);
  let b = Math.floor(Math.random()*10);
  let compAnswer = a + b;


  $go.on('click', (e) => {

    $(e.target).hide();
    $submit.show();
    $ready.hide();
    playGame();
  });

  $retry.on('click', () =>{
    playGame();
  });

  $next.on('click', () =>{
    level++;
    playGame();
  });

  //reset
  function playGame() {
    $next.hide();
    $retry.hide();
    $answers.show();
    $sum.show().html(`${a} + ${b}`);
    startTimer();
    if(level === 1) {
      score = 0;
    }

    $score.html(score);
    quest();
  }
  //create a random sum
  function quest(){
    a = Math.floor(Math.random()*10);
    b = Math.floor(Math.random()*10);
    if(level === 1) {
      compAnswer = a + b;
      $sum.show().html(`${a} + ${b}`);
    } else {
      compAnswer = a * b;
      $sum.show().html(`${a} * ${b}`);
    }
  }
  //countdown timer
  function startTimer(){
    let time = 30;
    const timerStart = setInterval(() => {
      time -= 1;
      if(time < 10 && time > 0) {
        time = '0' + time;
      }
      if (time === 0) {
        clearInterval(timerStart);
        time = '0' + time;
        $next.slideDown();
        $retry.slideDown();
        $answers.hide();
      }
      $time.text(time);
    }, 1000);
  }

  $answers.on('submit', (e) => {
    e.preventDefault();
    const playerAnswer = $('.text').val();

    parseInt(playerAnswer) === compAnswer ? score++ : score--;
    quest();
    $('.text').val(' ');
    $score.html(score);
  });

  // only allows numeric digits to be entered.
  // need to allow space key (code 13)
  // $('.text').on('keypress',function (press) {
  //   $(this).val($(this).val().replace(/[^\d].+/, ''));
  //   if ((press.which < 48 || press.which > 57)) {
  //     press.preventDefault();
  //   }
  // });

});
