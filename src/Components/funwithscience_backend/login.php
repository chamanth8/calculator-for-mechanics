<?php
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "funwithscience_backend";

$con = mysqli_connect($servername, $username, $password, $dbname);

if($con){
    // echo "connection successfull";
}else{
    echo "no connection";
}

$postdata = file_get_contents("php://input");
if(isset($postdata)&&!empty($postdata)){
    $request = json_decode($postdata);



$subscriber_email = $request->email;
$subscriber_password = $request->pass;
}

$q="select * from sign_up where email ='$subscriber_email';";
$result=mysqli_query($con,$q);
$num = mysqli_num_rows($result);

if($num == 1){
  $passfetch = mysqli_fetch_array($result);
  $db_pass = $passfetch['pass'];
  $db_user=$passfetch['username'];
  $pass_decode = password_verify($subscriber_password,$db_pass);

  if($pass_decode){
    echo $db_user;
  }
  else{
    echo "2";
  }


}else {
  echo "0";
}
?>
