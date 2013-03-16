  <?
   $query = null;
   if(isset($_REQUEST['q'])) {
       $query = $_REQUEST['q'];
   } elseif(isset($_REQUEST['query'])) {
       $query = $_REQUEST['query'];
   } else {
       $trends = json_decode(file_get_contents("https://api.twitter.com/1/trends/1.json"));
       $query = $trends[0]->trends[0]->name;
   }
  ?><!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <title><? echo $query; ?> feed</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
  <meta name="generator" content="https://github.com/thefinn93/tweet-wall" />
  <link rel="help" href="https://github.com/collectiveidea/tweet-wall" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js" type="text/javascript"></script>
  <script type="text/javascript" type="text/javascript">
  var realquerytext = '<? echo $query; ?>';
  var realflickrquerytext = '<? echo $query; ?>'
  var flickr_api = '6f6a0a18485bf6a2a6b9a7f467e39f96';
  </script>
  <script src="javascripts/jquery.highlight-3.js" type="text/javascript"></script>
  <script src="javascripts/jquery-linkify/src/jquery.linkify.js" type="text/javascript"></script>
  <script src="javascripts/tweetwall.js" type="text/javascript"></script>
  <link rel="stylesheet" type="text/css" href="stylesheets/tweetwall.css">
  <meta http-equiv="refresh" content="3600" /> <!-- refresh every hour to unbreak things if they get stuck -->
</head>
<body>
    <ul id="flickr"></ul>
    <ul id="tweets"></ul>

    <!-- Prompt IE users to install Chrome Frame. Remove this if you want to support IE          chromium.org/developers/how-tos/chrome-frame-getting-started -->
    <!--[if IE  ]>
    <script defer src="https://ajax.googleapis.com/ajax/libs/chrome-frame/1.0.3/CFInstall.min.js"></script>
    <script defer>window.attachEvent('onload',function(){CFInstall.check({mode:'overlay'})})</script>
    <![endif]-->
    <?
    if(is_file("config.inc.php")) {
        include("config.inc.php");
    }
    ?>
<div id="shamelessSelfPromotion"><a href="https://github.com/thefinn93">thefinn93</a>'s fork of <a href="https://github.com/weiweiweb">weiweiweb</a>'s fork of <a href="https://github.com/collectiveidea">collectiveidea</a>'s <a href="https://github.com/collectiveidea/tweet-wall">twitter-wall</a>. <a href="https://github.com/thefinn93/tweet-wall">See the code on github</a></div>
</body>
</html>
