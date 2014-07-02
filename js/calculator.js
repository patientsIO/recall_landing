var Calculator = Calculator || {};

Calculator.init = function(){

  $( "#patientSlider" ).slider({
    value:5000,
    min: 1500,
    max: 20000,
    step: 100,
    slide: function( event, ui ) {
      $( "#numPatients" ).val( ui.value );
      Calculator.calculate();
    }
  });

  $( "#examSlider" ).slider({
    value:350,
    min: 250,
    max: 500,
    step: 10,
    slide: function( event, ui ) {
      $( "#examFee" ).val( ui.value );
      Calculator.calculate();
    }
  });


  $( "#startFrequencySlider" ).slider({
    value:27,
    min: 12,
    max: 48,
    step: 1,
    slide: function( event, ui ) {
      $( "#startFrequency" ).val( ui.value );
      Calculator.calculate();
    }
  });

  $( "#endFrequencySlider" ).slider({
    value:21,
    min: 12,
    max: 48,
    step: 1,
    slide: function( event, ui ) {
      $( "#endFrequency" ).val( ui.value );
      Calculator.calculate();
    }
  });

  $('#numPatients').on('change',Calculator.calculate),
  $('#examFee').on('change',Calculator.calculate),
  $('#startFrequency').on('change',Calculator.calculate),
  $('#endFrequency').on('change',Calculator.calculate);

  $('#numPatients').on('keyup',Calculator.calculate),
  $('#examFee').on('keyup',Calculator.calculate),
  $('#startFrequency').on('keyup',Calculator.calculate),
  $('#endFrequency').on('keyup',Calculator.calculate);

  Calculator.calculate();
}

Calculator.calculate = function(){
  var numPatients = $('#numPatients').val(),
      examFee =     $('#examFee').val(),
      startFrequency = $('#startFrequency').val(),
      endFrequency = $('#endFrequency').val();

  var startNumPatientsPerMonth = numPatients / startFrequency,
      startBilledPerMonth = startNumPatientsPerMonth * examFee,
      endNumPatientsPerMonth = numPatients / endFrequency,
      endBilledPerMonth = endNumPatientsPerMonth * examFee;

  console.log("startNumPatientsPerMonth =",startNumPatientsPerMonth);
  console.log("startBilledPerMonth =",startBilledPerMonth);
  console.log("endNumPatientsPerMonth =",endNumPatientsPerMonth);
  console.log("endBilledPerMonth =",endBilledPerMonth);

  var extraMoney = endBilledPerMonth - startBilledPerMonth;
  $('.extraMoney').text("$" + extraMoney.formatMoney(2, '.', ','));
}



$( document ).ready(function() {
  Calculator.init();
});



Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };
