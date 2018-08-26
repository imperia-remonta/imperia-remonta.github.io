$(document).ready(function(){
	

	
	var Summa = 0
$('table.price-table tr td input.kolvo-input').live('keyup',function(Summa){
	var Summa = 0
	$('table.price-table tr td input.kolvo-input').each(function(index) {
    	var Kolvo = $(this).val()
		var Price = $(this).next('input.price').val() 
		var Sum = Price * Kolvo
		
		$(this).parent().parent().children('td.sum').html(Sum + ' грн.')
		
		Summa = Summa + Sum
		$('span#calc-summ').html(Summa + ' грн.')
		});
	})
	
	
	$('span.calc-reset').live('click',function(Summa){
		
		$('table.price-table tr td input.kolvo-input').each(function(index) {
    	var Kolvo = $(this).val('0.0')
		
		$(this).parent().parent().children('td.sum').html(0 + ' грн.')
		
		$('span#calc-summ').html(0 + ' грн.')
		});
	
	})

});