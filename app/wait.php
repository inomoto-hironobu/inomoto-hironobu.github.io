<?php
if(isset($_GET['time'])) {
    echo 'wait'.$_GET['time'].'...';
    sleep((int) $_GET['time']);
}
echo 'end';