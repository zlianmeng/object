<?php
// 连接数据库
require "link.php";
$result=$conn->query("select * from tmallgj");
$arr= array();
for($i=0;$i<$result->num_rows;$i++){
    $arr[$i]=$result->fetch_assoc();
};
echo json_encode($arr);