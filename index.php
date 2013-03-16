  <?
   $query="occupywallstreet";
   if(isset($_REQUEST['query'])) {
       $query = $_REQUEST['query'];
   }
  ?><!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <title><? echo $query; ?> feed</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
  <meta name="generator" content="https://github.com/weiweiweb/tweet-wall" />
  <link rel="help" href="https://github.com/weiweiweb/tweet-wall" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js" type="text/javascript"></script>
  <script type="text/javascript" type="text/javascript">
  var realquerytext = '<? echo $query; ?>';
  var realflickrquerytext = '<? echo $query; ?>'
  var flickr_user_id = '87328984@N04';
  var flickr_api = '99c91f41388ac416592ab3c00f181146';
  </script>
  <script src="javascripts/jquery.highlight-3.js" type="text/javascript"></script>
  <script src="javascripts/jquery-linkify/src/jquery.linkify.js" type="text/javascript"></script>
  <script src="javascripts/tweetwall.js" type="text/javascript"></script>
  <link rel="stylesheet" type="text/css" href="stylesheets/weiweicam.css">
  <meta http-equiv="refresh" content="10800" />
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
</body>
</html>
