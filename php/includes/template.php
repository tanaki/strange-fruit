<!doctype html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
		<title><?php echo $title; ?>Strange Fruit - Jewellery brand based in London</title>
		<!-- TODO Add meta tags -->

		<link href='http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
		<!-- <link href='http://fonts.googleapis.com/css?family=Yanone+Kaffeesatz:400,300,700,200&subset=latin,latin-ext' rel='stylesheet' type='text/css'> -->

		<!--[if lt IE 9]>
		<script src="js/libs/html5shiv.js"></script>
		<![endif]-->

		<link rel="stylesheet" type="text/css" href="css/base.css">
		<link rel="stylesheet/less" type="text/css" href="css/screen.less">
		<script src="js/libs/less.min.js" type="text/javascript"></script>
	</head>
	<body class="<?php echo $page; ?>">

		<div id="wrapper">
			<?php include("header.php"); ?>
			<?php include('content/' . $page . '.php'); ?>
			<?php include("footer.php"); ?>
		</div>

		<!-- LIBS -->
		<!-- <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js"></script> -->

	</body>
</html>