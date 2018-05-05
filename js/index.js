$(document).ready(function(){
  var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  
 
  
  
  $("input[name=search]").keypress(function(ev){
    
    if(ev.keyCode == '13'){
      var query = $(this).val();
     
      getChannel(query);
      
     
    }
  });
  
  function makeURL(type, name){
      return "https://wind-bow.gomix.me/twitch-api/" + type + "/" + name + "?callback=?";
    }
  
  function getChannelInfo(){
    
    
    channels.forEach(function(channel){
      $.getJSON(makeURL("streams", channel), function(data){
        var game, status;
        if(data.stream === null){
          game = "offline";
          status = "offline";
        }else if(data.stream === undefined){
          game = "Account is closed";
          status = "offline";
        }else{
          game = data.stream.game;
          status = "online";
        }
        
        $.getJSON(makeURL("channels", channel), function(data1){
          var logo = data1.logo != null ? data1.logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F";
          var name = data1.display_name != null ? data1.display_name : channel;
          var description = status === "online" ? "Online " : "offline";
          
          
         var url = "https://www.twitch.tv/" + channel;
          
          
          html = '<a href="'+ url + '" target="_blank"><div class="box '+ status +'"> <div class="logo1"><img src="'+ logo +'"></div><div class="name">'+ name +'</div> <div class="description">'+ description +'</div>  </div></a>';
          
          status === "online" ? $(".container").prepend(html) : $(".container").append(html);
        });
      });
    });
  }
  
  function getChannel(channel){
    
    
    
      $.getJSON(makeURL("streams", channel), function(data){
        var game, status;
        if(data.stream === null){
          game = "offline";
          status = "offline";
        }else if(data.stream === undefined){
          game = "Account is closed";
          status = "offline";
        }else{
          game = data.stream.game;
          status = "online";
        }
        
        $.getJSON(makeURL("channels", channel), function(data1){
          var logo = data1.logo != null ? data1.logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F";
          var name = data1.display_name != null ? data1.display_name : channel;
          var description = status === "online" ? "online" : "offline";
          
          
         var url = "https://www.twitch.tv/" + channel;
          
          
          html = '<a href="'+ url + '" target="_blank"><div class="box '+ status +'"> <div class="logo1"><img src="'+ logo +'"></div><div class="name">'+ name +'</div> <div class="description">'+ description +'</div>  </div></a>';
          
          $(".container").prepend(html);
        });
      });
    
  }
  
  getChannelInfo();
  
  
  
  // making all online and offline button work
 
    $("nav > a").click(function(){
      $("nav > a").removeClass("active");
      $(this).addClass("active");
      var s = $(this).attr("id");
      if(s === "all"){
        $(".online, .offline").show();
      }else if(s === "online"){
        $(".offline").hide();
        $(".online").show();
      }else if(s === "offline"){
        $(".online").hide();
        $(".offline").show();
      }
    });
  
});
