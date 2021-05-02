var pledgeNum = 0;
var itemLeft = 0;
var totalBackers;
var moneySum = 0;
var itemLeftClass = "";
var perkTypeClass = "";
var customPledgeNum = 0;
var bar = $(".bar").width();;

$(".alert-danger").hide();

//open pledge section (modal), clear all inputs,uncheck them all and hide all pledge pop up-s
$(".backProjectBtn").on("click", function() {
  $(".pledge-section").show();
  $(".pledge-pop-up").hide();
  $("input").val("");
  $(".pledge-type-card").css("border","1px solid #ced4da");
  $(".form-check-input").prop("checked", false);
});

//close all other (if opened) pledge pop up-s and "reset" their styles
//than show and set styles for the selected pledge pop up  
$(".pledge-type-card").on("click", function() {
  if(!($(this).children().attr("class").includes("grey-card"))){//prevent the option for the newly sold out prize
    if($(this).attr('class')!=="type-card pledge-type-card grey-card"){//prevent the option for Mahagnoy card that is already sold out
      $(".pledge-pop-up").hide();
      $(".alert-danger").hide();
      $(".pledge-type-card").css("border","1px solid #ced4da");
      $(this).find(".form-check-input").prop("checked", true);
      $(this).find(".pledge-pop-up").show();
      $(this).css("border","1px solid hsl(176, 50%, 47%)");
    }
  }
});

//update total backed money, backers and disable perks that are out of stock
function updateAll(pledge) {
  bar+=5;
  moneySum+=pledge;
  moneySum = moneySum.toString().substring(0, 2)+ "," +moneySum.toString().substring(2, moneySum.length);

  totalBackers++;
  totalBackers = totalBackers.toString().substring(0, 1)+ "," +totalBackers.toString().substring(1, totalBackers.length);

  itemLeft--;

  if(itemLeft===0){
    $(this).parents(".type-card").addClass("grey-card");
    $("div."+perkTypeClass).addClass("grey-card");
  }

  $("#total-backers").html(totalBackers);
  $("#money-sum").html(moneySum);
  $("span."+itemLeftClass).html(itemLeft);
  $(".bar").width(bar);
}

$(".select-reward-button").on("click",function() {
  totalBackers = $("#total-backers").html().replace(",","");
  moneySum = parseInt($("#money-sum").html().replace(",",""));
  pledgeNum = parseInt($(this).parent().siblings().find(".pledge-num").html());
  itemLeft = $(this).parent().siblings().find(".title-card").find("span").html();
  itemLeftClass = $(this).parent().siblings().find("h1").find("span").attr("class");
  perkTypeClass = $(this).parent().parent().parent().attr("class");

  if(itemLeft!=0){
    updateAll(pledgeNum);
  }else{
    $(this).prop("disabled",true);
  }
});

$(".continue-btn").on("click", function(e) {
  pledgeNum = parseInt($(this).parentsUntil(".type-card").find(".pledge-num").html());
  moneySum = parseInt($("#money-sum").html().replace(",",""));
  itemLeft = $(this).parentsUntil(".m").siblings("h1").find("span").html();
  itemLeftClass = $(this).parentsUntil(".type-card").children("h1").find("span").attr("class");
  perkTypeClass = $(this).parents(".type-card").children().attr("class").replace("m ","");
  customPledgeNum = parseInt($(this).parent().siblings().find("input").val());
  totalBackers = $("#total-backers").html().replace(",","");

  if(itemLeft==null){//pledge with no reward
    totalBackers++;
    totalBackers = totalBackers.toString().substring(0, 1)+ "," +totalBackers.toString().substring(1, totalBackers.length);
    $("#total-backers").html(totalBackers);
  }else if(itemLeft!==0){
    if(customPledgeNum<pledgeNum || Number.isNaN(customPledgeNum)){
      console.log($(this).parentsUntil(".m").siblings(".alert-danger"));
      $(this).parentsUntil(".m").siblings(".alert-danger").show();
      e.stopPropagation(); //prevent modal from closing
    }else{
      updateAll(customPledgeNum);
      $(this).parentsUntil(".m").siblings("h1").find("span").html(itemLeft);
    }
  }else{
    $(this).prop("disabled",true);
  }
});


