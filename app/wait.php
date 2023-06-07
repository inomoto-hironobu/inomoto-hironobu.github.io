<?php
if(isset($_GET['time'])) {
    ini_set('default_socket_timeout', $_GET['time']+10);
    echo 'wait'.$_GET['time'].'...';
    $sleep = sleep((int) $_GET['time']);
    while ($sleep > 0) {
        $sleep = sleep($sleep);
    }
    echo $sleep.'...';
}
echo 'end';