
var indBxSlide,docsSlider,mainSlider;
var preventDbl=false
var sliderSort = []


jQuery(document).ready(function($){
    if(preventDbl) return;
    preventDbl=true;

    $(window).bind('contextmenu', function(e) {
        //return false;
    });

    $(document.body).attr('unselectable','on')
        .css({'-moz-user-select':'-moz-none',
            '-moz-user-select':'none',
            '-o-user-select':'none',
            '-khtml-user-select':'none',
            '-webkit-user-select':'none',
            '-ms-user-select':'none',
            'user-select':'none'
        }).bind('selectstart', function(){ return false; });

    if($('#sliderPin').length) sliderPin()
    if($('#gallInSlider').length) gallInSlider()
    if($('.designBox .wrap ul').length) designWrap()

    if($("#multiSlide").length) multiSlide()
    if($("#allGallIn").length) bigSlide()
    if($("#formRows").length) formRows()
    if($(".dottedTbl").length) removeDots()
    if($("#blogLay").length) blogLay()


    if($( "#accordion").length) $( "#accordion" ).accordion({
        header: ".accTitle",
        icons:false,
        heightStyle:'content',
        collapsible: true,
        activate:function( event, ui){
            $('.accTitle').removeClass('act').find('span a').html('Развернуть')
            $(ui.newHeader).addClass('act').find('span a').html('Свернуть')
        }
    });

    if($('#feedSlider').length) {
        indBxSlide = $('#feedSlider').bxSlider({
            pager:false,
            slideSelector: 'ul',
            adaptiveHeight: false,
            startSlide: 0,
            controls: false
        });
    }

    if($('#docsSlider').length) {
        docsSlider = $('#docsSlider').bxSlider({
            pager:false,
            slideSelector: 'li',
            adaptiveHeight: false,
            startSlide: 0,
            controls: false
        });
    }

    if($('#indGalSwitcher').length) indGalSwitcher()
    if($('#contaForm').length) {
        var ht = document.location.href
        if(ht.indexOf('#contaFormToogl')===-1){
            $('#contaForm').hide()
        }else{
            $('#contaFormToogl').html('Скрыть форму')
        }

        $('#contaFormToogl').bind('click',function(){
            if($('#contaForm').is(':visible')){
                $('#contaFormToogl').html('Отправить сообщение')
            }else $('#contaFormToogl').html('Скрыть форму')
            $('#contaForm').slideToggle()

        })
    }

    if($('#slider').length) {
        mainSlider = $('#slider').bxSlider({
            pager:false,
            //nextSelector: 'nivo-nextNav',
            //slideSelector: 'div',
            adaptiveHeight: false,
            startSlide: 0,
            auto: true,
            pause: 4000,
            controls: true,
            onSlideBefore: function(slideElement, oldIndex, newIndex){
                $('#nivoCustomNav .packTop a').removeClass('act')
                var to = sliderSort[newIndex] -1
                $($('#nivoCustomNav .packTop a')[to]).addClass('act')
            }
        });
    }

    actToTop()

    /*
    $('#slider').nivoSlider({
                            effect: 'sliceDown', // Specify sets like: 'fold,fade,sliceDown, random'
                            slices: 12, // For slice animations
                            boxCols: 4, // For box animations
                            boxRows: 8, // For box animations
                            animSpeed: 800, // Slide transition speed
                            pauseTime: 4000, // How long each slide will show
                            startSlide: 0, // Set starting Slide (0 index)
                            directionNav: true, // Next & Prev navigation
                            directionNavHide: false, // Only show on hover
                            controlNav: false, // 1,2,3... navigation
                            controlNavThumbs: false, // Use thumbnails for Control Nav
                            controlNavThumbsFromRel: false, // Use image rel for thumbs
                            keyboardNav: false, // Use left & right arrows
                            pauseOnHover: false, // Stop animation while hovering
                            manualAdvance: false, // Force manual transitions
                            captionOpacity: 0.8, // Universal caption opacity
                            prevText: '', // Prev directionNav text
                            nextText: '', // Next directionNav text
                            randomStart: false, // Start on a random slide
                            afterChange: function(){
                                $('#nivoCustomNav .packTop a').removeClass('act')
                                $($('#nivoCustomNav .packTop a')[$('#'+this.id).data('nivo:vars').currentSlide]).addClass('act')
                            }
    });
    */

    $(".fancy").fancybox()
    $(".signInline").fancybox({
        padding: 0,
        fitToView    : false,
        autoSize    : true,
        closeClick    : false
        //openEffect    : 'none',
        //closeEffect    : 'none'
    });


    if($("#mapList").length){
        ymaps.ready(function () {
            startMap()
        })
    }

})

function like(id, ob){
	var CID= '#like-counter-'+ id;
    $.ajax({
        url: "mods/a.function.php",
        data: {aj:17, id:id, sid:SID},
        success: function(data, textStatus, jqXHR){
            if($.trim(data)== 'ok'){
                $(ob).html(parseInt($(ob).html())+1);
								$(CID).html(parseInt($(CID).html())+1);
            }
        }
    })
}

function blogLay(){
    var lis = $('#blogLay li')
    var l = lis.length
    if(l>3) {
        var p0 = $(lis[0]).position().top + $(lis[0]).outerHeight()
        var p1 = $(lis[3]).position().top
        var dif = parseInt(p1) - parseInt(p0) - 17
        $(lis[3]).css('margin-top', '-'+dif+'px')
    }
    if(l>4) {
        var p0 = $(lis[1]).position().top + $(lis[1]).outerHeight()
        var p1 = $(lis[4]).position().top
        var dif = parseInt(p1) - parseInt(p0) - 17
        $(lis[4]).css('margin-top', '-'+dif+'px')
    }
    if(l>5) {
        var p0 = $(lis[2]).position().top + $(lis[2]).outerHeight()
        var p1 = $(lis[5]).position().top
        var dif = parseInt(p1) - parseInt(p0) - 17
        $(lis[5]).css('margin-top', '-'+dif+'px')
    }
}

function removeDots(){
    $.each($('.dottedTbl tr td'), function(index, el) {
        var t = $(el).html().replace(/\s/g,'').replace(/&nbsp;/g, '')
        if(!t){
            $(el).css('background', '#fff')
        }

    })
}


function formRows(){
    $('#reqRow1').bind('change',function(){
        if(this.value){
            $('#reqRow2').removeAttr('required')
        }else{
            $('#reqRow2').attr('required','required')
        }
    })

    $('#reqRow2').bind('change',function(){
        if(this.value){
            $('#reqRow1').removeAttr('required')
        }else{
            $('#reqRow1').attr('required','required')
        }
    })
}

var ymap=''
function startMap(){
    var markers=[]
    $.each($('#mapList .orangeBtn'), function(index, el) {
        if($(el).attr('data-map')){
            var json = jQuery.parseJSON($(el).attr('data-map'))
            json.name = $(el).attr('data-title')
            markers[markers.length] = json

            $(el).bind('click',function(){
                //openMap()
                ymap.setCenter([parseFloat(json.lng), parseFloat(json.lat)]);
            })
        }
    })

    if(!markers.length) return

    ymap = new ymaps.Map("map", {
        center: [parseFloat(markers[0].lng), parseFloat(markers[0].lat)],
        zoom: parseInt(markers[0].z),
        //type: "yandex#map",
        controls: ['smallMapDefaultSet']
    });

    for(i=0; i<markers.length; i++){

        myPlacemark = new ymaps.Placemark([parseFloat(markers[i].lng), parseFloat(markers[i].lat)], {
            balloonContent: '<h2>ООО "Юдистрой"</h2>'+markers[i].name
        },{
            iconLayout: 'default#image',
            iconImageHref: 'img/marker.png',
            iconImageSize: [33, 42],
            iconImageOffset: [-3, -42]
        });

        ymap.geoObjects.add(myPlacemark);
    }

    $('#mapToogler').bind('click',toogleMap)

}

function toogleMap(){
    if($('#mapToogler').hasClass('opened')){
        closeMap()
    }else{
        openMap()
    }
}

function openMap(){
    if($('#mapToogler').hasClass('opened')) return

    $('#map').css('height', 500)
    ymap.container.fitToViewport();
    $('#mapToogler').addClass('opened')

    $('#mapWrap').animate({
        height: 500
    }, 400);
}

function closeMap(){
    if(!$('#mapToogler').hasClass('opened')) return

    $('#mapWrap').animate({
        height: 249
    }, 400, function() {
        $('#map').css('height', 249)
        ymap.container.fitToViewport();
        $('#mapToogler').removeClass('opened')
    });
}

function indGalSwitcher(){
    $.each($('#indGalSwitcher li a'), function(index, el) {
        $(el).bind('mouseover',function(){
            $('.galListAll').css('display','none')
            $('#gal_'+$(el).attr('data-rel')).css('display','block')
        })
    })
}

function slideTo(idx) {
    mainSlider.goToSlide(idx);
    mainSlider.stopAuto();

    //$('#slider').data('nivo:vars').currentSlide = idx - 1;
    //$("#slider a.nivo-nextNav").trigger('click');
}

var multiSlideTransact=false
function multiSlide(){
    //$('#multiSlide section').hide()
    $('#multiSlide .accTitle').addClass('act')
    $.each($('#multiSlide .accTitle'), function(index, el) {
        $(el).bind('click',function(){
            if(multiSlideTransact) return
            multiSlideTransact=true
            var sect =  $(this).next('section');
            if(sect.is(':visible')){
                sect.slideUp(400,function(){multiSlideTransact=false})
                $(this).removeClass('act')
                $(this).find('span a').html('Развернуть')
            }else{
                sect.slideDown(400,function(){multiSlideTransact=false})
                $(this).addClass('act')
                $(this).find('span a').html('Свернуть')

            }
            // act
        })
    })
}

var accO_=true
function multiSlideToggle(ob){
    if(!accO_){
        $('#multiSlide section').slideDown()
        $('#multiSlide .accTitle').addClass('act')
        $(ob).html('Свернуть все')
        accO_=true;
        $('#multiSlide .accTitle span a').html('Свернуть')
    }else{
        $('#multiSlide section').slideUp()
        $('#multiSlide .accTitle').removeClass('act')
        $(ob).html('Развернуть все')
        accO_=false;
        $('#multiSlide .accTitle span a').html('Развернуть')
    }
}

var bigSlideI=0
var bigSlideA=[]
function bigSlide(){
    if(bigSlideA.length) return

    $.each($('#allGallIn a'), function(index, el) {
        bigSlideA[bigSlideA.length]=el
    })

    $('#gallInBig .arrRight').bind('click',function(e){
        bigSlideNext()
    })

    $('#gallInBig .arrLeft').bind('click',function(e){
        bigSlidePrev()
    })

    var href = document.location.href
    if(href.indexOf('#')!==-1){
        var anch = parseInt(href.split('#')[1].replace('ad-image-',''))
        if(anch) {
            bigSlideI=anch
            bigSlideSetImg()
            bigSlideSetAct()
        }
    }
}

function bigSlideSetImg(){
    $('#allGallOn').html($(bigSlideA[bigSlideI]).clone())
    var url = document.location.href.split('#')[0]
    document.location.href = url+'#ad-image-'+bigSlideI
}

function bigSlideNext(){
    bigSlideI++
    if(bigSlideI >= bigSlideA.length) bigSlideI=0
    bigSlideSetImg()
    bigSlideSetAct()
}

function bigSlidePrev(){
    bigSlideI--
    if(bigSlideI<0) bigSlideI=bigSlideA.length-1
    bigSlideSetImg()
    bigSlideSetAct()
}

function bigSlideSetAct(){
    var curRow = Math.ceil(bigSlideI / 6)
    var updB = bigSlideRowIndex+1
    if(!(bigSlideI % 6) && bigSlideI) {
        curRow++
    }
    if(curRow==0) curRow=1
    if(curRow!=updB){
        if(curRow>updB){
            for(i=updB; i<curRow; i++){
                $('#bsArrR').trigger('click')
            }
        }else{
            for(i=curRow; i<updB; i++){
                $('#bsArrL').trigger('click')
            }
        }
    }

    $('#gallInSlider ul li a').removeClass('act')
    $($('#gallInSlider ul li a')[bigSlideI]).addClass('act')
}

function designWrap(){
    $.each($('.designBox .wrap ul'), function(index0, el0) {
        $.each($(el0).find('li a'), function(index, el) {
            $(el).bind('click',function(e){

                var title = (index+1) +'. ' + $(this).html().replace(/<b.*>.*?<\/b>/,'')
                $(this).parent().parent().parent().find('div.txt strong.h4').html(title)
                $(this).parent().parent().parent().find('div.txt .disStageTxt').css('display','none')
                $(this).parent().parent().parent().find('div.txt .disStage_'+(index+1)).css('display','block')
                $(el0).find('li a').removeClass('act')
                $(this).addClass('act')
                return false;
            })
        })
    })

}

var accO=false
function accordionOpenAll(ob){
    if(!accO){
        $('.ui-accordion-header').removeClass('ui-corner-all').addClass('ui-accordion-header-active ui-state-active ui-corner-top').attr({'aria-selected':'true','tabindex':'0'});
        $('.ui-accordion-header .ui-icon').removeClass('ui-icon-triangle-1-e').addClass('ui-icon-triangle-1-s');
        $('.ui-accordion-content').addClass('ui-accordion-content-active').attr({'aria-expanded':'true','aria-hidden':'false'}).show();
        $('.accTitle').addClass('act').find('span a').html('Свернуть')
        $(ob).html('Свернуть все')
        accO=true;
    }else{
        $('.ui-accordion-header').removeClass('ui-accordion-header-active ui-state-active ui-corner-top').addClass('ui-corner-all').attr({'aria-selected':'false','tabindex':'-1'});
        $('.ui-accordion-header .ui-icon').removeClass('ui-icon-triangle-1-s').addClass('ui-icon-triangle-1-e');
        $('.ui-accordion-content').removeClass('ui-accordion-content-active').attr({'aria-expanded':'false','aria-hidden':'true'}).hide();
        $('.accTitle').removeClass('act').find('span a').html('Развернуть')
        $(ob).html('Развернуть все')
        accO=false;
    }
}

function toogleGalIn(ob){
    if($('#allGallIn').is(':visible')){
        $('#allGallIn').slideUp();
        $(ob).html('Развернуть всё фото объекта')
        $('.gallInBig .arrLeft, .gallInBig .arrRight').show()
        $('#allGallOn').css('display','block')
        $('#gallInSlider').css('display','block')
        $('html, body').animate({scrollTop: 150});
        $('#gallInSlider ul li a').removeClass('act')
        $($('#gallInSlider ul li a')[0]).addClass('act')
        //$('#allGallIn').addClass('resetCursor')
    }else{
        $('#bigSrc').attr('src',$($('#gallInSlider ul li a')[0]).attr('data-rel'))
        $('#allGallOn').css('display','none')
        $('#allGallIn').slideDown();
        $(ob).html('Свернуть всё фото объекта')
        $('.gallInBig .arrLeft, .gallInBig .arrRight').hide()
        $('#gallInSlider').css('display','none')
        //$('#allGallIn').addClass('resetCursor')
    }
}

var bigSlideRowIndex = 0
function gallInSlider(){
    var ul=$('#gallInSlider ul')
    var li=$('#gallInSlider ul li')
    var bPrev=$('#gallInSlider a.arrLeft')
    var bNext=$('#gallInSlider a.arrRight')
    var w = $('#gallInSlider .gallInSliderWrap').width()
    var inRow = 6

    var startSlide = 0

    $(ul).attr('data-index',0).css('width',146*li.length)

    $.each($('#gallInSlider ul li a'), function(index, el) {
        if($('#gallInSlider').hasClass('usehref')) {
            return;
        }

        if(index==startSlide) $(el).addClass('act')
        $(el).bind('click',function(e){
            bigSlideI=index
            bigSlideSetImg()
            bigSlideSetAct()

            /*$('#bigSrc').attr('src',$(this).attr('data-rel'))
            $('#gallInSlider ul li a').removeClass('act')
            $(this).addClass('act')*/

            return false;
        })
    })

    if(bPrev) $(bPrev).bind('click',function(e){
        var ind = parseInt($(ul).attr('data-index'))
        if(ind > inRow) goTo = ind - inRow
        else goTo=0
        $(ul).attr('data-index',goTo)
        var x = -parseInt($('#gallInSlider ul li:eq( '+goTo+' )').position().left)
        $( ul ).animate({left: x}, {queue:false, duration: 1000});
        bigSlideRowIndex--

        return false;
    })
    if(bNext) $(bNext).bind('click',function(e){
        var ind = parseInt($(ul).attr('data-index'))
        if(ind + inRow*2 <li.length) goTo = ind + inRow
        else goTo=li.length-inRow
        $(ul).attr('data-index',goTo)
        var x = -parseInt($('#gallInSlider ul li:eq( '+goTo+' )').position().left)
        $( ul ).animate({left: x}, {queue:false, duration: 1000});
        bigSlideRowIndex++

        return false;
    })
}

function sliderPin(){
    var sc = $('#sliderWrap li a')
    var bw = $('#sliderWrap').width()
    var sw = $('#sliderPin').width()
    var ofs = $('#sliderWrap').hasClass('smallWrap') ? 13 : 4
    $(sc[sc.length-1]).addClass('sliderLast')
    sc.bind('mouseover', function(e){
        if($(this).hasClass('sliderLast')){
            var x = parseInt(bw-sw+4)
        }else {
            var pl = parseInt($(this).position().left)
            var pw = $(this).width()
            if(sw>pw){
                var x = pl-ofs
            }else var x = pl

        }
        var o = this
        $( "#sliderPin" ).animate({left: x}, {queue:false, complete: function() {
            $('#sliderWrap li').removeClass('act')
            $(o).parent().addClass('act')
        }});


    })
}








function tab(n,li){
    $('.tabs a').removeClass('act')
    $(li).addClass('act')
    $('.tab').css('display','none')
    $('#tab'+n).css('display','block')


}

function actProduct(){
    $.each($('.prodSize ul li'), function(index, el) {
        $(el).bind('click',function(){
            $('.prodSize ul li').removeClass('act')
            $(this).addClass('act')
            if($(this).attr('data-amount')){
                $('#left').html('Осталось: '+$(this).attr('data-amount')).css('display','block')
            }else $('#left').css('display','none')
        })
    })
}

function actFilters(){
    $.each($('.filtSizes li'), function(index, el) {
        $(el).bind('click',function(){
            if($(this).hasClass('act')){
                $(this).removeClass('act')
            }else{
                $(this).addClass('act')
            }
        })
    })
}

var sl = false
function actToTop(){
    if($(window).width()<1150){
        $('#goTop').css({'right': -45+'px','display': 'block', 'position': 'absolute', 'bottom':'90px'})
    }else{
        $(window).scroll(function() {
            var scrTop=$(window).scrollTop()
            if(scrTop){
                if(!sl) {
                    sl = ($('html, window').width() - 1020) / 2 - 70
                }

                $('#goTop').css({'right': sl+'px','display': 'block'})
            }else $('#goTop').css('display','none')
        })
    }
}

function toTop(){
    $('html, body').animate({scrollTop: 0})
}

function msg(title,msg){
    $('#msgTitle').html(title)
    $('#msgBody').html(msg)
    $('#msgModal').trigger('click')
}










var colPos=0;
var colStep=206;
var animSpeed=1000;
function actCollection(){
    if($('#collectionPrevus ul li').length>18){
        $('#galNext').click(function(){
            $('#collectionPrevus ul').animate({
                top: -colStep+'px'
            },500)
            $('#galPrev').css('display','block')
            return false;
        })
        $('#galPrev').click(function(){
            $('#collectionPrevus ul').animate({
                top: 0+'px'
            },500)
            $('#galNext').css('display','block')
            return false;
        })
        
        $.each($('#collectionPrevus ul li a'), function(index, el) {
            $(el).click(function(){
                rel = $(this).attr('rel') ? $(this).attr('rel') : false;
                collLoadImage(this.href,rel)
                return false;
            })
        })
    }
}

function collLoadImage(src,rel){
    $('#bigImg').css('opacity',.2)
    $('#imgPreload').attr('src',src).css({'display': 'block','opacity':0}).load(function(){
        $('#bigImg').css('opacity',0)
        $('#imgPreload').animate({opacity: 1},animSpeed,function(){
            $('#imgPreload').css('display', 'none').attr('src','img/balnk.png')
            $('#bigImg').attr('src',src).css('opacity',1)
            if(rel) $('#shopIt').attr('href',rel).css('display','block')
            else $('#shopIt').css('display','none')
        })
        $('#imgPreload').unbind("load");
    })
}

function actPlaceHolder(){
    $.each($('.placeholder'), function(index, el) {
        el.value=el.title
        $(el).focus(function(){
            if(this.value==this.title) this.value=''  
        })
        $(el).blur(function(){
            if(!this.value) this.value=this.title  
        })
    })
}

function checkSubmit(cl,form){
    ret = true
    $.each($(cl), function(index, am) {
        if(am.type=='radio'){
            v=$('input[name='+am.name+']:checked', '#'+form).val()
            if(!v) ret=false
        }else{
            if((am.title && am.value==am.title) || !am.value) ret=false
        }
    })
    
    if(ret){
        $('#'+form+'_error').html('').css('display','none')
        $('#'+form).submit()
    }else{
        $('#'+form+'_error').html('Заполните поля формы!').css('display','block')
    }
}
