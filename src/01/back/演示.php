<?php 
// 	function array_sum2($arr){
// 	$sum = 0;
// 	foreach ($arr as $key => $value) {
// 		$sum += $value;
// 	}
// 	return $sum;
// }




// 	$a = [12,'3.4',45.2];
// 	print_r(array_sum2($a));
// 	$arr = array('qwne','zxc');
// 	$json_str = json_encode($arr);
// 	var_dump($json_str);
// 	$str = '[\"qwne","zxc"]';
// 	$res = json_decode(stripslashes($str));
// 	var_dump($res);

// 	var_export($arr);
// 	var_dump($arr);
 


// 	function my_build_query($arr){
// 		$res = '';
// 		foreach ($arr as $key => $value) {
// 			$res .= $key.'='.$value.'&';
// 		}
// 		return $res;
// 	}


// 	interface Logger {
// 	      public function log(string $msg);
// 	}

//    class Application {
//       private $logger;

//       public function getLogger(){
//          return $this->logger;
//       }

//       public function setLogger($logger) {
//          $this->logger = $logger;
//       }  
//     }

//    	$app = new Application;
// 	    $app->setLogger(new class implements Logger {
// 	      	public function log(string $msg) {
// 	         	print($msg);
// 	      	}
// 	    });

//    	$app->getLogger()->log("My first Log Message");



//    	$array = ['wer','13',234];
// 	var_dump(serialize($array));
// 	$str = 'a:3:{i:0;s:3:"wer";i:1;s:2:"13";i:2;i:234;}';
// 	var_dump(unserialize($str));



// 	class myclass{
// 		public $num = 10;
// 		public function getnNum() {
// 			return $this->num;
// 		}
// 	}
// 	$instance = new myclass;
// 	$str = serialize($instance);
// 	var_dump($str);
// 	$ins = unserialize($str);
// 	var_dump($ins);
// 	var_dump($ins->getnNum());

class Base {
    public function sayHello() {
        echo 'Hello ';
    }
}

trait SayWorld {
    public function sayHello() {
        parent::sayHello();
        echo 'World!';
    }
}

class MyHelloWorld extends Base {
    use SayWorld;
}

$o = new MyHelloWorld();
$o->sayHello();
 ?>