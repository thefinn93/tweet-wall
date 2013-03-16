(function($) {
  $.fn.scroller = function () {
    var list = this;
    list.items = [];
    
    function hashtagHandler(tag) {
        return window.location.origin + window.location.pathname + "?q=" + tag;
    }
    
    list.push = function(items) {
      items.css('display', 'none').highlight(realquerytext);
      items.each(function() {
        list.items.push(this);
      })
    }
    
    list.cleanup = function() {
      if(list.children().length > 30) {
        list.children().slice(0, 15).remove()
      }
    }
    
    var process = function() {
      $(list.items.shift()).appendTo(list).slideDown(8000);
      list.cleanup();
    }
    
    setInterval(process, 8000);
    return list;
  }
 
  var querytext = 'aiww OR "ai weiwei" OR "aiweiwei" OR "#aiww" OR "freeaiweiwei" OR aiwwenglish OR weiweicam';
  // var querytext = 'weiweicam';
  if ( typeof realquerytext !== 'undefined' ) {
      querytext = realquerytext;
  } 

  var flickrquerytext;
  if ( typeof realflickrquerytext !== 'undefined' ) {
    flickrquerytext = encodeURIComponent(realflickrquerytext);
  } else {
    flickrquerytext = encodeURIComponent('aiww OR "ai weiwei" OR "aiweiwei" OR "#aiww" OR "freeaiweiwei" OR aiwwenglish');
  }

  var query = encodeURIComponent(querytext);
  url = 'https://search.twitter.com/search.json?q=' + query + '&rpp=30&include_entities=true&callback=?'; 
 
  $(function() {
    tweets = $('#tweets').scroller();
    flicks = $('#flickr').scroller();
    
    function fetchTweets() {
      if(tweets.items.length < 15) {
        $.getJSON(url, function(data) {
          $.each(data.results, function() {  
            for(var i = 0; i < this.entities.urls.length; i++) {
                this.text = this.text.replace(this.entities.urls[i].url, "<a href=\"" + this.entities.urls[i].url + "\" target=\"_blank\">" + this.entities.urls[i].display_url + "</a>");
            }
            if(this.entities.hasOwnProperty("media")) {
                for(var i = 0; i < this.entities.media.length; i++) {
                    this.text = this.text.replace(this.entities.media[i].url, "<a href=\"" + this.entities.media[i].url + "\" target=\"_blank\"><img src=\"" + this.entities.media[i].media_url_https + ":thumb\" class=\"thumb\"></a>");
                }
            }
            tweets.push($('<li><img class="profile" src="' + this.profile_image_url_https + '"/><span class="meta"><span class="from">' + this.from_user + '</span> <a href="https://twitter.com/' + this.from_user + '/status/' + this.id_str + '" class="created_at">' + fmtDates(this.created_at) + '</a></span>' + $.linkify(this.text, {link: false}) + '</li>'))
            if(this.entities.hasOwnProperty("media")) {
                $.each(this.entities.media, function() {
                    if(this.type == "photo") {
                        flicks.push($('<li><a href="' + this.expanded_url + '" target=\"_blank\"><img src="' + this.media_url_https + '" width="240" /></a></li>'));
                    } else {
                        console.log(this);
                    }
                });
            }
           });
           if(data != undefined) {
                url = "https://search.twitter.com/search.json" + data.refresh_url + "&callback=?"
            }
         });
      }
      setTimeout(fetchTweets, 5000);
    }
    
    jsonFlickrApi = function(data) {
      $.each(data.photos.photo, function(i,photo){
        //notice that "t.jpg" is where you change the
        //size of the image
        var t_url = "https://farm" + photo.farm + 
        ".static.flickr.com/" + photo.server + "/" + 
        photo.id + "_" + photo.secret + "_" + "m.jpg";

        var p_url = "http://www.flickr.com/photos/" + 
        photo.owner + "/" + photo.id;

        flicks.push($('<li><a href="' + p_url + '"><img src="' + t_url + '"/></a></li>'));
      });
    }

    function fetchFlicks() {
      var user_id = "";
      if ( typeof flickr_user_id !== 'undefined' ) {
          user_id = "&user_id=" + flickr_user_id;
      }
      var f_api = '99c91f41388ac416592ab3c00f181146';
      if ( typeof flickr_api !== 'undefined' ) {
          f_api = flickr_api;
      }

      var flick_url = "https://secure.flickr.com/services/rest/?callback=?&format=json&method=flickr.photos.search&text=" + flickrquerytext + user_id + "&tag_mode=any&api_key=" + f_api + "&jsoncallback=jsonFlickrApi";
      if (flicks.items.length < 15) {
          $.getJSON(flick_url)
      }
      window.setTimeout(fetchFlicks, 120000);        
    }
         
    

    function fmtDates(datestring) {
        var d = new Date(datestring);
        if (!isNaN(d.getMonth())) {
            return d;
            // return d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
        } else {
            return "";
        }
    }
            
    fetchTweets();
    fetchFlicks();
  });
  
})(jQuery)
