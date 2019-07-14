<?php
// 连接数据库
require "link.php";
$table = $_GET['table'];
$id = $_GET['id'];
if (isset($table) && isset($id)) {
    $result = $conn->query("select * from $table where id='$id'");
    echo json_encode($result->fetch_assoc());
} else {
    exit('系统错误');
}
