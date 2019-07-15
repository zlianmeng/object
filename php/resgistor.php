<?php
// 连接数据库
require "link.php";
// 接收数据
$username = $_POST['username'];
$password = $_POST['password'];
if (isset($username) && isset($password)) {
    $result = $conn->query("insert reg values (null,'$username','$password')");
    header("Location:http://10.31.158.21/tianmao/object/src/login.html");
} else {
    exit ("非法操作");
}
