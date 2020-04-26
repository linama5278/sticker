<?php
    $post_data = $_POST['data'];
    if (!empty($post_data)) {
        $file = fopen('list.json', 'w+');
        fwrite($file, json_encode($post_data));
        fclose($file);
        echo json_encode('success');
    } 
?>