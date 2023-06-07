<?php
if(isset($_GET['time'])) {
    echo 'wait'.$_GET['time'].'...';
    $sleep = sleep((int) $_GET['time']);
    echo $sleep.'...';
}
echo 'end';