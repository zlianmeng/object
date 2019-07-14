<?php
// 连接数据库
require "link.php";
// 设置变量
$username = $_POST['username'];
$password = $_POST['password'];
if (isset($username) && isset($password)) {
    $result = $conn->query("select * from reg where username='$username' and password='$password'");
    if ($result->fetch_assoc()) {
        echo true;
    } else {
        echo false;
    }
} else {
    exit('非法操作');
}
