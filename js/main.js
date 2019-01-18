(function() {

    var document_width;
    var document_height;

    // $.event.special.scrollstop.latency = 650;

    function convertVwToPx(vw) {
        return document_width/100 * vw;
    }

    function convertVhToPx(vw) {
        return document_width/100 * vh;
    }

    function resizeCircleSizes() {
        let w = $(document).innerWidth();
        let h = $(document).innerHeight();
        let circleSize = Math.floor(convertVwToPx(0.55));
        let circleMarginRight = Math.round(convertVwToPx(0.1));
        $('.effect-content .circle').css('width', circleSize + 'px');
        $('.effect-content .circle').css('height', circleSize + 'px');
        $('.effect-content .circle').css('margin-right', circleMarginRight + 'px');
    }

    $(document).ready(function() {
        var document_width = $(document).innerWidth();
        var document_height = $(document).innerHeight();

        $('.effect-content .percent').each(function(i, el) {
            $el = $(el);
            let percent = $el.data('percent');
            let cntFullFill = Math.floor(percent/10);
            for (let i = 0 ; i < cntFullFill ; i++) {
                let $circle_out = $('<div class="circle border-primary"></div>');
                let $circle_in = $('<span class="fill bg-primary"></span>');
                $circle_out.append($circle_in);
                $el.append($circle_out);
            }
            if (cntFullFill<10) {
                let $circle_out = $('<div class="circle border-primary"></div>');
                let $circle_in = $('<span class="fill bg-primary"></span>');
                $circle_in.css('width', ((percent-cntFullFill*10)*10)+ '%');
                $circle_out.append($circle_in);
                $el.append($circle_out);
                
                for (let i = cntFullFill+2 ; i < 11 ; i++) {
                    let $circle_out = $('<div class="circle border-primary"></div>');
                    let $circle_in = $('<span class="fill bg-primary"></span>');
                    $circle_in.css('width', '0%');
                    $circle_out.append($circle_in);
                    $el.append($circle_out);
                }
            }
        });

        resizeCircleSizes();

        // callback when click on arrow_down icon
        $('.page .arrow_down').on('click', function(event) {
            $.scrollify.next();
        });


        $.scrollify({
            section : ".page",
            sectionName : "section-name",
            interstitialSection : "",
            easing: "easeOutExpo",
            scrollSpeed: 500,
            offset : 0,
            scrollbars: false,
            standardScrollElements: "",
            setHeights: true,
            overflowScroll: false,
            updateHash: true,
            touchScroll:true,
            before: pageWillChange,
            after: pageChanged,
            afterResize:function() {},
            afterRender:function() {}
          });

        
        $(window)
            .on("scrollstart", function() {
                $.scrollify.disable();
            })
            .on("scrollstop", function() {
                $.scrollify.enable();
            })
    });

    $(document).keydown(function(event) {
        switch (event.keyCode) {
            case 37:
            case 38:
                $.scrollify.previous();
                break;
            case 39:
            case 40:
                $.scrollify.next();
                break;
        }
    });

    $(window).resize(function() {
        resizeCircleSizes();
    });

    function pageWillChange(e) {
        if (e == 1) {
            $('.border-container').removeClass('appear_animation');
        }
    }

    function pageChanged(e) {
        if (e == 1) {
            console.log('page changed' + e);
            $('.border-container').addClass('appear_animation');
        }
    }
   
})();