<?php
// 连接数据库
require "link.php";
//1 潮店酷玩
$palyresult = $conn->query("select * from play");
$playarr = array();
for ($i = 0; $i < $palyresult->num_rows; $i++) {
    $playarr[$i] = $palyresult->fetch_assoc();
};

// 2户外
$outresult = $conn->query("select * from outdoors");
$outarr = array();
for ($i = 0; $i < $outresult->num_rows; $i++) {
    $outarr[$i] = $outresult->fetch_assoc();
};
// 3打造爱巢
$loveresult = $conn->query("select * from love");
$lovearr = array();
for ($i = 0; $i < $loveresult->num_rows; $i++) {
    $lovearr[$i] = $loveresult->fetch_assoc();
};
// 4猜你喜欢
$guessresult = $conn->query("select * from guesslist");
$guessarr = array();
for ($i = 0; $i < $guessresult->num_rows; $i++) {
    $guessarr[$i] = $guessresult->fetch_assoc();
};
// 5美丽人生
$fashionresult = $conn->query("select * from fashion");
$fashionarr = array();
for ($i = 0; $i < $fashionresult->num_rows; $i++) {
    $fashionarr[$i] = $fashionresult->fetch_assoc();
};
//6居家
$familyresult = $conn->query("select * from family");
$familyarr = array();
for ($i = 0; $i < $familyresult->num_rows; $i++) {
    $familyarr[$i] = $familyresult->fetch_assoc();
};
// 7天猫超市
$superresult = $conn->query("select * from supermarket");
$superarr = array();
for ($i = 0; $i < $superresult->num_rows; $i++) {
    $superarr[$i] = $superresult->fetch_assoc();
};
// 8天猫国际
$hkresult = $conn->query("select * from tmallgj");
$hkarr = array();
for ($i = 0; $i < $hkresult->num_rows; $i++) {
    $hkarr[$i] = $hkresult->fetch_assoc();
};
// 9广告展示
$brandresult = $conn->query("select * from brand");
$brandarr = array();
for ($i = 0; $i < $brandresult->num_rows; $i++) {
    $brandarr[$i] = $brandresult->fetch_assoc();
};
//10 banner图
$bannerresult = $conn->query("select * from banner");
$bannerarr = array();
for ($i = 0; $i < $bannerresult->num_rows; $i++) {
    $bannerarr[$i] = $bannerresult->fetch_assoc();
};
class data
{ }
$alldata = new data();
$alldata->play = $playarr;
$alldata->outdoors = $outarr;
$alldata->love = $lovearr;
$alldata->guesslist = $guessarr;
$alldata->fashion = $fashionarr;
$alldata->family = $familyarr;
$alldata->supermarket = $superarr;
$alldata->tmallgj = $hkarr;
$alldata->brand = $brandarr;
$alldata->banner = $bannerarr;
echo json_encode($alldata);
