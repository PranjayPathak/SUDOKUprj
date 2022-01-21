const express = require("express");
const body_parser = require("body-parser");
const cookie_parser = require("cookie-parser");
const app = express();

app.use(cookie_parser());
app.use(express.static("static"));
app.use(body_parser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.listen(process.env.PORT || 3000, function () {
  console.log("server started on port 3000");
});

let arr = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  godarr = arr.slice(),
  level = "medium";

// checks the position of specific cell
function check(arr, num, i, j) {
  let row = arr[i];
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

  if (row.includes(num) || col.includes(num) || grp.includes(num)) {
    return false;
  } else {
    return true;
  }
}

//returns the first empty cell
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

// solver usinng backtracking
function solve(arr) {
  let empt = empty(arr);

  if (!empt) {
    return true;
  } else {
    let p = empt[0];
    let q = empt[1];
    for (let r = 1; r < 10; r++) {
      let chk = check(arr, r, p, q);

      if (chk) {
        arr[p][q] = r;
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

app.get("/", function (req, res) {
  var cookie_brd = req.cookies.cookie_brd;
  var cookie_tim = req.cookies.cookie_tim;
  var cookie_str = req.cookies.cookie_str;
  // console.log(cookie_brd);
  if (cookie_brd === undefined) {
    board();
    res.cookie("cookie_brd", JSON.stringify(arr), { maxAge: 43200000 });
    res.cookie("cookie_tim", "00A00A00", { maxAge: 43200000 });
    res.cookie("cookie_str", "", { maxAge: 43200000 });
    res.render("board", { array: arr, mode: level, tim: cookie_tim });
  } else {
    res.render("board", {
      array: JSON.parse(cookie_brd),
      mode: level,
      tim: cookie_tim.split("A").join(":"),
    });
  }
});

app.get("/new", function (req, res) {
  res.clearCookie("cookie_brd");
  res.clearCookie("cookie_tim");
  res.clearCookie("cookie_str");
  res.redirect("/");
});

app.get("/restart", function (req, res) {
  res.cookie("cookie_tim", "00A00A00", { maxAge: 43200000 });
  res.cookie("cookie_str", "", { maxAge: 43200000 });
  res.redirect("/");
});

app.get("/sol", function (req, res) {
  let x = solve(arr);

  if (x) {
    res.redirect("/");
  } else {
    console.log("unable to solve");
    res.redirect("/");
  }
});

app.get("/diff/:mode", function (req, res) {
  let mode;
  level = req.params.mode;
  if (level == "hard") {
    mode = 60;
  } else if (level == "medium") {
    mode = 50;
  } else {
    mode = 30;
  }
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      arr[i][j] = godarr[i][j];
    }
  }

  for (let x = 0; x < mode; x++) {
    let i = Math.ceil(Math.random() * 9) - 1;
    let j = Math.ceil(Math.random() * 9) - 1;
    arr[i][j] = 0;
  }
  res.cookie("cookie_brd", JSON.stringify(arr), { maxAge: 43200000 });
  res.cookie("cookie_tim", "00A00A00", { maxAge: 43200000 });
  res.cookie("cookie_str", "", { maxAge: 43200000 });
  res.redirect("/");
});

///////////////////////////////////////////
////////creating the question board////////
///////////////////////////////////////////

function shuffle() {
  let flag = 0;
  let ar = [];
  while (flag == 0) {
    let num = Math.ceil(Math.random() * 9);
    if (!ar.includes(num)) {
      ar.push(num);
      if (ar.length == 9) {
        flag = 1;
      }
    }
  }
  return ar;
}
function shift(ar_a) {
  let ar_b = [];
  ar_b[0] = ar_a[8];
  for (let i = 1; i < 9; i++) {
    ar_b[i] = ar_a[i - 1];
  }
  return ar_b;
}

function board() {
  var ar = shuffle();

  arr = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  let x = 0;
  for (let m = 0; m < 3; m++) {
    let flag = 1;
    for (let i = 0; i < 9; i++) {
      for (let j = x; j < x + 3; j++) {
        arr[i][j] = ar[flag - 1];
        if (flag % 9 == 0) {
          ar = shift(ar);
          flag = 0;
        }
        flag++;
      }
    }
    x = x + 3;
  }

  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      godarr[i][j] = arr[i][j];
    }
  }

  for (let x = 0; x < 50; x++) {
    let i = Math.ceil(Math.random() * 9) - 1;
    let j = Math.ceil(Math.random() * 9) - 1;
    arr[i][j] = 0;
  }
}
