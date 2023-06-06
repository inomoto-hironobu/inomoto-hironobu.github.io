<?php
if(isset($_GET['time'])) {
    echo 'wait...';
    sleep((int) $_GET['time']);
}
echo 'end';