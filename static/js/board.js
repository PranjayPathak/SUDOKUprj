//Dropdown for difficulty level
$(".dropdown p").click(function () {
  $(".dropdown ul").toggleClass("invisible");
  $(".dropdown ul ").toggleClass("visible");
  $(".dropdown .arrow ").toggleClass("up");
});
// god parent div
$(".god").click(function () {
  if ($(".nav_links").hasClass("nav_active")) {
    burg_click();
  }
});
$(".nav_links li ").click(function () {
  if ($(".nav_links").hasClass("nav_active")) {
    burg_click();
  }
});
$(".burger").click(function () {
  burg_click();
});
function burg_click() {
  $(".nav_links").toggleClass("nav_active");

  document.querySelectorAll(".nav_links li").forEach(function (link, index) {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation =
        "navLinkFade 0.35s ease forwards " + (index / 7 + 0.27) + "s";
      //  var x =((10-index)*20)+"px";
    }
  });
  let burg = $(".burger");
  burg.toggleClass("toggle");
  burg.toggleClass("burg");
}

//numbers from keypad
$(".mobg").click(function () {
  if (clk != null && !$(clk).hasClass("fixed")) {
    let value = $(this).text();
    let j = clk.cellIndex;
    let i = clk.parentNode.rowIndex;
    ins_move(i, j, value, 1, $(clk).text());

    $(clk).text(value);
    cookie_array_update();
    checkall(board());
  }
});
//erase button
$(".erase").click(function () {
  if (clk != "null" && !$(clk).hasClass("fixed")) {
    let j = clk.cellIndex;
    let i = clk.parentNode.rowIndex;
    if (Number($(clk).text()) != 0) {
      ins_move(i, j, $(clk).text(), 0, null);
    }
    $(clk).text(" ");
    cookie_array_update();
    $(clk).css("background-color", "rgb(30,30,30)");
    $(clk).css(
      "box-shadow",
      "inset 0px 0px 10px rgb(30,30,30),inset 0px 0px 5px 5px rgb(26,26,26) "
    );
    checkall(board());
  }
});

var clk;
//clk is a global variable holdimg the board cell that is clicked

// when cell on board is clicked
$(".cell").click(function (event) {
  clk = this;
  $(".cell").css("background-color", "rgb(26,26,26)");
  $(".cell").css("box-shadow", "none");
  let j = this.cellIndex;
  let i = this.parentNode.rowIndex;
  let x = Math.floor(i / 3);
  let y = Math.floor(j / 3);
  for (let m = x * 3; m < x * 3 + 3; m++) {
    for (let n = y * 3; n < y * 3 + 3; n++) {
      $("." + m + "x." + n + "y").css("background-color", "rgb(36,36,36)");
    }
  }
  $("." + i + "x,." + j + "y").css("background-color", "rgb(36,36,36)");
  $(this).css("background-color", "rgb(30,30,30)");
  $(this).css(
    "box-shadow",
    "inset 0px 0px 10px 5px rgb(27,27,27),inset 0px 0px 5px 5px rgb(26,26,26) "
  );

  let fix = !$(this).hasClass("fixed");
  this.addEventListener("keydown", function (event) {
    var key = event.key;
    if (key > 0 && key < 10 && fix) {
      var brd = board();
      ins_move(i, j, key, 1, $(this).text());

      $(this).text(key);
      cookie_array_update();
      checkall(board());
    } else if ((key == "Backspace" || key == "Delete") && fix) {
      if (Number($(this).text()) != 0) {
        ins_move(i, j, $(this).text(), 0, null);
      }
      $(this).text(" ");
      $(this).css("background-color", "rgb(30,30,30)");
      $(this).css(
        "box-shadow",
        "inset 0px 0px 10px rgb(30,30,30),inset 0px 0px 5px 5px rgb(26,26,26) "
      );
      cookie_array_update();
      checkall(board());
    } else if (key == "ArrowUp" && i > 0) {
      i = i - 1;
      next(i, j);
    } else if (key == "ArrowDown" && i < 9) {
      i = i + 1;
      next(i, j);
    } else if (key == "ArrowLeft" && j > 0) {
      j = j - 1;
      next(i, j);
    } else if (key == "ArrowRight" && j < 9) {
      j = j + 1;
      next(i, j);
    }
  });
});
function next(i, j) {
  $("." + i + "x." + j + "y").focus();
  $("." + i + "x." + j + "y").click();
}

// checks the number at specific index
function check(arr, num, i, j) {
  // console.log("arr: "+arr);
  // console.log(" num: "+num+" ("+i+","+j+")");
  arr[i][j] = 0;
  let row = [];
  for (let m = 0; m < 9; m++) {
    row.push(arr[i][m]);
  }

  let col = [];
  let grp = [];
  for (let m = 0; m < 9; m++) {
    col.push(arr[m][j]);
  }
  let x = Math.floor(i / 3);
  let y = Math.floor(j / 3);
  for (let m = x * 3; m < x * 3 + 3; m++) {
    for (let n = y * 3; n < y * 3 + 3; n++) {
      grp.push(arr[m][n]);
    }
  }
  // console.log("row: "+row);
  // console.log("col: "+col);
  // console.log("grp: "+grp);
  if (row.includes(num) || col.includes(num) || grp.includes(num)) {
    return false;
  } else {
    return true;
  }
}

// gets the numbers in board from html
function board() {
  var a = [];
  var b = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      var item = $("." + i + "x." + j + "y").text();
      b.push(Number(item));
    }
    a.push(b);
    b = [];
  }
  return a;
}

//checking all the elements of board
let flag;
// false for wrong input in board
function checkall(arr) {
  flag = true;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let cellx = document.getElementsByClassName("" + i + "x " + j + "y")[0];
      if (!cellx.classList.contains("fixed") && arr[i][j] != 0) {
        if (!check(board(), arr[i][j], i, j)) {
          cellx.style.color = "rgba(190,30,30)";
          flag = false;
        } else {
          cellx.style.color = "whitesmoke";
        }
      }
    }
  }
}

/////////////////////////////
///////TIMER/////////////////

let coo = cookies();
for (i = 0; i < 3; i++) {
  if (coo[i][0].trim() == "cookie_tim") {
    var tim_c = coo[i];
  }
}
tim_c = tim_c[1].split("A");

let seconds = Number(tim_c[2]);
let minutes = Number(tim_c[1]);
let hours = Number(tim_c[0]);

function impr(x) {
  //////changing numbers to string of type 00:00:00
  if (x < 10) {
    x = "0" + x.toString();
  }
  return x;
}
function watch() {
  seconds++;
  if (seconds / 60 == 1) {
    seconds = 0;
    minutes++;
  }
  if (minutes / 60 == 1) {
    minutes = 0;
    hours++;
  }
  $("#watch").text(impr(hours) + ":" + impr(minutes) + ":" + impr(seconds));
}

// play/pause button
$(".control_border ").click(function () {
  var control = $(".control");
  if (control.hasClass("play")) {
    interval = window.setInterval(watch, 1000);
    $(".cell").css("opacity", "1");
    $(".cell").css("pointer-events", "all");
    control.removeClass("play");
    control.addClass("pause");
  } else {
    window.clearInterval(interval);
    control.removeClass("pause");
    control.addClass("play");
    $(".cell").css("opacity", "0");
    $(".cell").css("pointer-events", "none");
  }
});
$(".control_border ").click();

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
var flagy = 0,
  x = 1;
// var FlagY to check if the algo is already running or not ,x is for timer arg of settimeout()
$(".sol").click(function () {
  x = 1;

  if (flagy == 0) {
    if ($(".control").hasClass("play")) {
      $(".control_border ").click();
    }
    $(".unfixed").css("background-color", "rgba(34,34,34)");
    $(".unfixed").css("box-shadow", "none");
    $(".unfixed").text(null);
    flagy = 1;
    solve(board());
  }
});

// checks and returns the first empty cell of arr
function empty(arr) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (arr[i][j] == 0) {
        let x = [i, j];
        return x;
      }
    }
  }
  return false;
}

//Sudoku solver using backteacking
function solve(arr) {
  let empt = empty(arr);
  if (!empt) {
    return true;
  } else {
    let p = empt[0];
    let q = empt[1];
    let cell = $("." + p + "x." + q + "y");
    setTimeout(function () {
      cell.css("background-color", "rgba(90,90,90)");
      cell.css("color", "yellow");
    }, x * 150 + 200);

    for (let r = 1; r < 10; r++) {
      let chk = check(arr, r, p, q);
      setTimeout(function () {
        cell.css("background-color", "rgba(80,80,80)");
      }, x * 150 + 400);
      setTimeout(function () {
        cell.text(r);
        cell.css("background-color", "rgba(60,60,60)");
        cell.css("color", "orange");
      }, x * 150 + 500);

      if (chk) {
        arr[p][q] = r;
        setTimeout(function () {
          cell.css("background-color", "rgba(40,40,40)");
          cell.css("color", "yellow");
        }, x * 150 + 700);
        setTimeout(function () {
          cell.text(r);
          cell.css("background-color", "rgba(24,24,24)");
          cell.css("color", "#48D1CC");
          if (p == 8) {
            flagy = 0;
          }
        }, x * 150 + 900);
        x++;
        if (solve(arr)) {
          return true;
        } else {
          arr[p][q] = 0;
        }
      }
    }
    return false;
  }
}
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
// stores the sabed array
var saved = [[], [], [], [], [], [], [], [], []];
// stores the moves of player [index x,index y,numebr,input/erase,previous_num]
var moves = [];

$(".restore").click(function () {
  restore();
  cookie_array_update();
});
$(".save").click(function () {
  save();
});
$(".undo").click(function () {
  undo_move();
  cookie_array_update();
});

//inserting move in moves
function ins_move(i, j, n, x, prev) {
  let len = moves.length;
  let ar = moves[len - 1];
  if (len == 0) {
    moves.push([i, j, n, x, prev]);
  } else if (len == 50) {
    save();
    moves.shift();
    if (ar[0] == i && ar[1] == j && ar[2] == n && ar[3] == x) {
    } else {
      moves.push([i, j, n, x, prev]);
    }
  } else {
    if (ar[0] == i && ar[1] == j && ar[2] == n && ar[3] == x) {
    } else {
      moves.push([i, j, n, x, prev]);
    }
  }
}

function undo_move() {
  let len = moves.length;
  if (len > 0) {
    let a = moves[len - 1];
    moves.pop();

    if (a[3] == 1) {
      $("." + a[0] + "x." + a[1] + "y").text(a[4]);
    } else {
      $("." + a[0] + "x." + a[1] + "y").text(a[2]);
    }
  } else {
  }
  checkall(board());
}

// saves the current board
function save() {
  var temp = board();
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      saved[i][j] = temp[i][j];
    }
  }
  moves = [];
}

// restores the board to the last saved state
function restore() {
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      if (saved[i][j] == 0) {
        $("." + i + "x." + j + "y").text(null);
      } else {
        $("." + i + "x." + j + "y").text(saved[i][j]);
      }
    }
  }
  moves = [];
}

//////saves the initial array
save();

/////////////////////////////////////////////////////
////Final checking the submitted array
let flagz = true;
$(".submit").click(function () {
  if (flagz) {
    flagz = false;

    save();
    let brd = board();
    checkall(brd);
    if (flag && !empty(brd)) {
      correct();
    } else {
      wrong();
    }
    setTimeout(function () {
      flagz = true;
    }, 700);
  }
});

// comments as per the performance
function scorex(tim) {
  if (tim[0] > 0) {
    return [" ", "H", "m", "m", "m", ".", ".", "."];
  } else if (tim[2] < 2) {
    return [" ", "J", "E", "S", "U", "S", "!"];
  } else if (tim[1] < 10) {
    return "EXCELLENT".split("");
  } else if (tim[1] < 20) {
    return ["G", "O", "O", "D", " ", " ", "J", "O", "B"];
  } else if (tim[1] > 20 && tim[1] < 30) {
    return [" ", "N", "O", "T", " ", "B", "A", "D"];
  } else {
    return [" ", "G", "O", "O", "D"];
  }
}

//if the submitted board is correct
function correct() {
  $("button , .full-timer ,.drop ,.tableb").css("display", "none");
  $(".tablea").css(
    "box-shadow",
    "0px 0px 50px 1px cyan , 0px 0px 3px 5px white"
  );
  let a = "COMPLETED".split("");
  let dif = $(".dif").text().toUpperCase().split("");
  dif.splice(dif.length - 1, 1);
  dif.splice(0, 1);
  let tim = $("#watch").text().split(":");
  let score = "GOOD".split("");
  score = scorex(tim);
  tim.splice(1, 0, ":");
  tim.splice(3, 0, ":");
  $("." + i + "x." + j + "y");
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      $("." + i + "x." + j + "y").css("color", "#44b1c7");
      window.clearInterval(interval);
      // stoping timer
      $("." + i + "x." + j + "y").css("border", "2px solid rgba(40,40,40)");
      $("." + i + "x." + j + "y").css(
        "text-shadow",
        "0px 0px 5px rgb(10,10,10) ,0px 0px 10px cyan"
      );
      if (i == 1) {
        setTimeout(function () {
          $("." + i + "x." + j + "y").css("color", "cyan");
          $("." + i + "x." + j + "y").css("font-weight", "500");
          $("." + i + "x." + j + "y").css("font-size", "20px");
          $("." + i + "x." + j + "y").text(a[j]);
        }, j * 60);
      } else if (i == 4 && j > 0 && j < 6) {
        setTimeout(function () {
          $("." + i + "x." + j + "y").css("letter-spacing", "2px");
          $("." + i + "x." + j + "y").text(tim[j - 1]);
        }, j * 60);
      } else if (i == 3 && j > 0 && j <= dif.length) {
        setTimeout(function () {
          $("." + i + "x." + j + "y").text(dif[j - 1]);
        }, j * 60);
      } else if (i == 5 && j >= 0 && j < score.length) {
        setTimeout(function () {
          $("." + i + "x." + j + "y").text(score[j]);
        }, j * 60);
      } else if (i == 7 && j > 5) {
        setTimeout(function () {
          $("." + i + "x." + j + "y").css("color", "cyan");
        }, j * 30);
      } else {
        setTimeout(function () {
          $("." + i + "x." + j + "y").css("border", "2px solid rgba(40,40,40)");
          $("." + i + "x." + j + "y").css("text-shadow", "none");
          $("." + i + "x." + j + "y").css("box-shadow", "none");
          $("." + i + "x." + j + "y").text(null);
        }, j);
      }
    }
  }
  setTimeout(function () {
    $(".7x.6y").text(">");
    $(".7x.8y").text("<");

    $(".7x.7y").text(null);
    $(".7x.7y").click();
    $(".7x.7y").append($('<a href="/new">NEW</a>'));
    $(".7x.7y a").css("text-decoration", "none");
    $(".7x.7y a").css("color", "cyan");
  }, 300);
}

//if the submitted board is incorrect
function wrong() {
  let br = board();
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      setTimeout(function () {
        let cel = $("." + i + "x." + j + "y");
        if (!$(cel).hasClass("fixed")) {
          if (!check(board(), br[i][j], i, j)) {
            let clr = $("." + i + "x." + j + "y").css("background-color");
            setTimeout(function () {
              $("." + i + "x." + j + "y").css(
                "box-shadow",
                "inset 0px 0px 2px black , inset 0px 0px 6px rgba(200,70,70)"
              );
              $("." + i + "x." + j + "y").css(
                "background-color",
                "rgba(180,60,60)"
              );
            }, 300);
            setTimeout(function () {
              $("." + i + "x." + j + "y").css("background-color", clr);
            }, 400);
          }
        }
      }, 200);
    }
  }
}

//////cookies////////
// universal cookie array
let moves_array = [];

cookie_move();

//fetching all cookies from browser
function cookies() {
  let cookies = document.cookie;
  cookies = cookies.split(";");
  for (let i = 0; i < 3; i++) {
    cookies[i] = cookies[i].split("=");
  }
  return cookies;
}

// updating time from cookie
function cookie_tim_update() {
  let tim = $("#watch").text();
  tim = tim.split(":");
  tim = tim.join("A");
  document.cookie = "cookie_tim=" + tim;
}

// updaing cookie array from browser cookie
function cookie_move() {
  let unfix_ar,
    unfix_str,
    cookie = cookies();
  for (p = 0; p < 3; p++) {
    if (cookie[p][0] == " cookie_str") {
      unfix_str = cookie[p][1];
    }
  }
  if (unfix_str != "") {
    unfix_ar = unfix_str.split("A");
    for (i = 0; i < unfix_ar.length; i++) {
      unfix_ar[i] = unfix_ar[i].split("");
    }
    past_moves(unfix_ar);
    moves_array = unfix_ar.slice();
    cookie_array_update();
  }
}

//Restoring moves on board from cookie
function past_moves(ar) {
  ar.forEach((el) => {
    $("." + el[0] + "x." + el[1] + "y").text(el[2]);
  });
  checkall(board());
}

//Updating cookie array
function cookie_array_update() {
  // updating timeer cookie
  cookie_tim_update();

  moves_array = [];
  let brd = board();
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let fix = !$("." + i + "x." + j + "y").hasClass("fixed");
      if (brd[i][j] != 0 && fix) {
        moves_array.push([i, j, brd[i][j]]);
      }
    }
  }
  update_cookie_str();
}

// Updating the cookie in browser
function update_cookie_str() {
  let unfix_str,
    unfix_ar = moves_array.slice();
  for (let i = 0; i < unfix_ar.length; i++) {
    unfix_ar[i] = unfix_ar[i].join("");
  }
  unfix_str = unfix_ar.join("A");
  document.cookie = "cookie_str=" + unfix_str;
  moves_array = [];
}
