<?php
// 连接数据库
require "link.php";
$result=$conn->query("select * from play");
$arr= array();
for($i=0;$i<$result->num_rows;$i++){
    $arr[$i]=$result->fetch_assoc();
};
echo json_encode($arr);

// $result1=$conn->query("select * from outdoors");
// $arr1= array();
// for($i=0;$i<$result1->num_rows;$i++){
//     $arr1[$i]=$result1->fetch_assoc();
// };


// //echo json_encode($arr);


// class data{

// }

// $d1=new data();
// $d1->goodlist=$arr;
// $d1->goodlist1=$arr1;

// echo json_encode($d1);