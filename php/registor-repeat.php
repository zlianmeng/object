<?php
// 连接数据库
require "link.php";
$username = $_GET['username'];
if ($_GET['username']) {
    $result = $conn->query("select * from reg where username='$username'");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
} else {
    echo 非法操作;
}
