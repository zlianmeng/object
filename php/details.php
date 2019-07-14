<?php
// 连接数据库
require "link.php";
// 接收前端数据
$table = $_GET['table'];
$id = $_GET['id']+1;
if (isset($table) && isset($id)) {
    $result = $conn->query("select * from $table where id='$id'");
    echo json_encode($result->fetch_assoc());
} else {
    exit('系统错误');
}
