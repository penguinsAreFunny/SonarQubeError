//// [templateStringBinaryOperationsInvalid.ts]
var a = 1 - `${ 3 }`;
var b = 1 - `2${ 3 }`;
var c = 1 - `${ 3 }4`;
var d = 1 - `2${ 3 }4`;
var e = `${ 3 }` - 5;
var f = `2${ 3 }` - 5;
var g = `${ 3 }4` - 5;
var h = `2${ 3 }4` - 5;

var a2 = 1 * `${ 3 }`;
var b2 = 1 * `2${ 3 }`;
var c2 = 1 * `${ 3 }4`;
var d2 = 1 * `2${ 3 }4`;
var e2 = `${ 3 }` * 5;
var f2 = `2${ 3 }` * 5;
var g2 = `${ 3 }4` * 5;
var h2 = `2${ 3 }4` * 5;

var a3 = 1 & `${ 3 }`;
var b3 = 1 & `2${ 3 }`;
var c3 = 1 & `${ 3 }4`;
var d3 = 1 & `2${ 3 }4`;
var e3 = `${ 3 }` & 5;
var f3 = `2${ 3 }` & 5;
var g3 = `${ 3 }4` & 5;
var h3 = `2${ 3 }4` & 5;

var a4 = 1 - `${ 3 - 4 }`;
var b4 = 1 - `2${ 3 - 4 }`;
var c4 = 1 - `${ 3 - 4 }5`;
var d4 = 1 - `2${ 3 - 4 }5`;
var e4 = `${ 3 - 4 }` - 6;
var f4 = `2${ 3 - 4 }` - 6;
var g4 = `${ 3 - 4 }5` - 6;
var h4 = `2${ 3 - 4 }5` - 6;

var a5 = 1 - `${ 3 * 4 }`;
var b5 = 1 - `2${ 3 * 4 }`;
var c5 = 1 - `${ 3 * 4 }5`;
var d5 = 1 - `2${ 3 * 4 }5`;
var e5 = `${ 3 * 4 }` - 6;
var f5 = `2${ 3 * 4 }` - 6;
var g5 = `${ 3 * 4 }5` - 6;
var h5 = `2${ 3 * 4 }5` - 6;

var a6 = 1 - `${ 3 & 4 }`;
var b6 = 1 - `2${ 3 & 4 }`;
var c6 = 1 - `${ 3 & 4 }5`;
var d6 = 1 - `2${ 3 & 4 }5`;
var e6 = `${ 3 & 4 }` - 6;
var f6 = `2${ 3 & 4 }` - 6;
var g6 = `${ 3 & 4 }5` - 6;
var h6 = `2${ 3 & 4 }5` - 6;

var a7 = 1 * `${ 3 - 4 }`;
var b7 = 1 * `2${ 3 - 4 }`;
var c7 = 1 * `${ 3 - 4 }5`;
var d7 = 1 * `2${ 3 - 4 }5`;
var e7 = `${ 3 - 4 }` * 6;
var f7 = `2${ 3 - 4 }` * 6;
var g7 = `${ 3 - 4 }5` * 6;
var h7 = `2${ 3 - 4 }5` * 6;

var a8 = 1 * `${ 3 * 4 }`;
var b8 = 1 * `2${ 3 * 4 }`;
var c8 = 1 * `${ 3 * 4 }5`;
var d8 = 1 * `2${ 3 * 4 }5`;
var e8 = `${ 3 * 4 }` * 6;
var f8 = `2${ 3 * 4 }` * 6;
var g8 = `${ 3 * 4 }5` * 6;
var h8 = `2${ 3 * 4 }5` * 6;

var a9 = 1 * `${ 3 & 4 }`;
var b9 = 1 * `2${ 3 & 4 }`;
var c9 = 1 * `${ 3 & 4 }5`;
var d9 = 1 * `2${ 3 & 4 }5`;
var e9 = `${ 3 & 4 }` * 6;
var f9 = `2${ 3 & 4 }` * 6;
var g9 = `${ 3 & 4 }5` * 6;
var h9 = `2${ 3 & 4 }5` * 6;

var aa = 1 & `${ 3 - 4 }`;
var ba = 1 & `2${ 3 - 4 }`;
var ca = 1 & `${ 3 - 4 }5`;
var da = 1 & `2${ 3 - 4 }5`;
var ea = `${ 3 - 4 }` & 6;
var fa = `2${ 3 - 4 }` & 6;
var ga = `${ 3 - 4 }5` & 6;
var ha = `2${ 3 - 4 }5` & 6;

var ab = 1 & `${ 3 * 4 }`;
var bb = 1 & `2${ 3 * 4 }`;
var cb = 1 & `${ 3 * 4 }5`;
var db = 1 & `2${ 3 * 4 }5`;
var eb = `${ 3 * 4 }` & 6;
var fb = `2${ 3 * 4 }` & 6;
var gb = `${ 3 * 4 }5` & 6;
var hb = `2${ 3 * 4 }5` & 6;

var ac = 1 & `${ 3 & 4 }`;
var bc = 1 & `2${ 3 & 4 }`;
var cc = 1 & `${ 3 & 4 }5`;
var dc = 1 & `2${ 3 & 4 }5`;
var ec = `${ 3 & 4 }` & 6;
var fc = `2${ 3 & 4 }` & 6;
var gc = `${ 3 & 4 }5` & 6;
var hc = `2${ 3 & 4 }5` & 6;


//// [templateStringBinaryOperationsInvalid.js]
var a = 1 - ("" + 3);
var b = 1 - ("2" + 3);
var c = 1 - (3 + "4");
var d = 1 - ("2" + 3 + "4");
var e = ("" + 3) - 5;
var f = ("2" + 3) - 5;
var g = (3 + "4") - 5;
var h = ("2" + 3 + "4") - 5;
var a2 = 1 * ("" + 3);
var b2 = 1 * ("2" + 3);
var c2 = 1 * (3 + "4");
var d2 = 1 * ("2" + 3 + "4");
var e2 = ("" + 3) * 5;
var f2 = ("2" + 3) * 5;
var g2 = (3 + "4") * 5;
var h2 = ("2" + 3 + "4") * 5;
var a3 = 1 & "" + 3;
var b3 = 1 & "2" + 3;
var c3 = 1 & 3 + "4";
var d3 = 1 & "2" + 3 + "4";
var e3 = "" + 3 & 5;
var f3 = "2" + 3 & 5;
var g3 = 3 + "4" & 5;
var h3 = "2" + 3 + "4" & 5;
var a4 = 1 - ("" + (3 - 4));
var b4 = 1 - ("2" + (3 - 4));
var c4 = 1 - ((3 - 4) + "5");
var d4 = 1 - ("2" + (3 - 4) + "5");
var e4 = ("" + (3 - 4)) - 6;
var f4 = ("2" + (3 - 4)) - 6;
var g4 = ((3 - 4) + "5") - 6;
var h4 = ("2" + (3 - 4) + "5") - 6;
var a5 = 1 - ("" + 3 * 4);
var b5 = 1 - ("2" + 3 * 4);
var c5 = 1 - (3 * 4 + "5");
var d5 = 1 - ("2" + 3 * 4 + "5");
var e5 = ("" + 3 * 4) - 6;
var f5 = ("2" + 3 * 4) - 6;
var g5 = (3 * 4 + "5") - 6;
var h5 = ("2" + 3 * 4 + "5") - 6;
var a6 = 1 - ("" + (3 & 4));
var b6 = 1 - ("2" + (3 & 4));
var c6 = 1 - ((3 & 4) + "5");
var d6 = 1 - ("2" + (3 & 4) + "5");
var e6 = ("" + (3 & 4)) - 6;
var f6 = ("2" + (3 & 4)) - 6;
var g6 = ((3 & 4) + "5") - 6;
var h6 = ("2" + (3 & 4) + "5") - 6;
var a7 = 1 * ("" + (3 - 4));
var b7 = 1 * ("2" + (3 - 4));
var c7 = 1 * ((3 - 4) + "5");
var d7 = 1 * ("2" + (3 - 4) + "5");
var e7 = ("" + (3 - 4)) * 6;
var f7 = ("2" + (3 - 4)) * 6;
var g7 = ((3 - 4) + "5") * 6;
var h7 = ("2" + (3 - 4) + "5") * 6;
var a8 = 1 * ("" + 3 * 4);
var b8 = 1 * ("2" + 3 * 4);
var c8 = 1 * (3 * 4 + "5");
var d8 = 1 * ("2" + 3 * 4 + "5");
var e8 = ("" + 3 * 4) * 6;
var f8 = ("2" + 3 * 4) * 6;
var g8 = (3 * 4 + "5") * 6;
var h8 = ("2" + 3 * 4 + "5") * 6;
var a9 = 1 * ("" + (3 & 4));
var b9 = 1 * ("2" + (3 & 4));
var c9 = 1 * ((3 & 4) + "5");
var d9 = 1 * ("2" + (3 & 4) + "5");
var e9 = ("" + (3 & 4)) * 6;
var f9 = ("2" + (3 & 4)) * 6;
var g9 = ((3 & 4) + "5") * 6;
var h9 = ("2" + (3 & 4) + "5") * 6;
var aa = 1 & "" + (3 - 4);
var ba = 1 & "2" + (3 - 4);
var ca = 1 & (3 - 4) + "5";
var da = 1 & "2" + (3 - 4) + "5";
var ea = "" + (3 - 4) & 6;
var fa = "2" + (3 - 4) & 6;
var ga = (3 - 4) + "5" & 6;
var ha = "2" + (3 - 4) + "5" & 6;
var ab = 1 & "" + 3 * 4;
var bb = 1 & "2" + 3 * 4;
var cb = 1 & 3 * 4 + "5";
var db = 1 & "2" + 3 * 4 + "5";
var eb = "" + 3 * 4 & 6;
var fb = "2" + 3 * 4 & 6;
var gb = 3 * 4 + "5" & 6;
var hb = "2" + 3 * 4 + "5" & 6;
var ac = 1 & "" + (3 & 4);
var bc = 1 & "2" + (3 & 4);
var cc = 1 & (3 & 4) + "5";
var dc = 1 & "2" + (3 & 4) + "5";
var ec = "" + (3 & 4) & 6;
var fc = "2" + (3 & 4) & 6;
var gc = (3 & 4) + "5" & 6;
var hc = "2" + (3 & 4) + "5" & 6;
