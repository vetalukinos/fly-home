jQuery(function($){
    $(document).ready(function(){

        var bodySelector = $('body');

        /*Change Image on Add Photo*/
        function handleFileSelect(evt, idOutput) {

            var files = evt.target.files; // FileList object

            // Loop through the FileList and render image files as thumbnails.
            for (var i = 0, f; f = files[i]; i++) {

                // Only process image files.
                if (!f.type.match('image.*')) {
                    continue;
                }

                var reader = new FileReader();

                // Closure to capture the file information.
                reader.onload = (function(theFile) {
                    return function(e) {
                        // Render thumbnail.
                        var span = document.createElement('span');
                        span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
                        document.getElementById(idOutput).insertBefore(span, null);
                    };
                })(f);

                // Read in the image file as a data URL.
                reader.readAsDataURL(f);
            }
        }

        if($('#image-for-profile').length){
            document.getElementById('image-for-profile').addEventListener('change', function() { handleFileSelect(event, 'output-list'); }, false);
        }
        if($('#image-for-add-travelers').length){
            document.getElementById('image-for-add-travelers').addEventListener('change', function() { handleFileSelect(event, 'output-list-toggle-travelers'); }, false);
        }

        /*Change Edit Profile*/
        $('.edit-profile a').click(function(event) {
            event.preventDefault();
            $('.profile-user').hide();
            $('.profile-edit').css('display', 'flex');
        });

        $('.cancel-editing a').click(function(event) {
            event.preventDefault();
            $('.profile-edit').hide();
            $('.profile-user').css('display', 'flex');
        });

        /*International Telephone Input*/
        $('#mobile-number-edit, #mobile-number-support').intlTelInput({
            utilsScript: "js/utils.js"
        });

        /*Profile Travelers Toggle Block*/
        $('#add-new-traveler').click(function(event) {
            event.preventDefault();
            $(this).hide();
            $('.profile-title-travelers-close').show();
            $('.toggle-travelers').slideDown();
        });
        $('.profile-title-travelers-close').click(function(event) {
            event.preventDefault();
            $(this).hide();
            $('#add-new-traveler').show();
            $('.toggle-travelers').slideUp();
        });

        $('.add-new-traveler, .edit-information').click(function(event) {
            event.preventDefault();
            $('.travelers-users-block').hide();
            $('.toggle-travelers').css('display', 'block');
        });

        $('.toggle-travelers-close').click(function(event) {
            event.preventDefault();
            $('.travelers-users-block').show();
            $('.toggle-travelers').css('display', 'none');
        });


        /*Booking Toggle Block*/
        $('.booking-flight-details').on('click', function(event) {
            event.preventDefault();
            if($(this).hasClass('active')) {
                $(this).html('Flight details').removeClass('active');
                $(this).prev().slideUp();
            } else {
                $(this).html('Collapse').addClass('active');
                $(this).prev().slideDown();
            }
            $(this).closest('.booking-airports-wrapper').find('.booking-airports').toggleClass('active');

        });

        /* Tabs on My FAQ Page */
        $('.faq-list-column li').on('click', function(){
            $('.faq-list-column li').removeClass('active');
            $('.faq-questions-column').removeClass('active');
            $(this).addClass('active');
            $('#' + $(this).data('tab')).addClass('active');
        });

        /* Tabs on My Profile Page */
        $('.travelers-list-column li').on('click', function(){
            $('.travelers-list-column li').removeClass('active');
            $('.travelers-user-column').removeClass('active');
            $(this).addClass('active');
            $('#' + $(this).data('tab')).addClass('active');
        });

        /* Tabs on Payment Methods */
        $('.payment-switch-tabs li').on('click', function(){
            $('.payment-switch-tabs li').removeClass('active');
            $('.payment-box-tabs > div').removeClass('active');
            $(this).addClass('active');
            $('#' + $(this).data('tab')).addClass('active');
        });

        /* Tabs on Places Choose */
        $('.passenger').on('click', function(){
            $('.service-places-choose').removeClass('active');
            $('#' + $(this).data('tab')).addClass('active');
        });

       /* id для select*/
        $('#choose-payment-method').on('change', function(){
            $('.payment-box-tabs > div').removeClass('active');
            $('#' + $(this).val()).addClass('active');
        });

        /*More Details*/
        $('.more-details-toggle').on('click', function(event) {
            event.preventDefault();
            if($(this).hasClass('active')) {
                $(this).html('More details');
            } else {
                $(this).html('Close');
            }
            $(this).toggleClass('active');
            $(this).closest('.result-item').find('.result-item-options').slideToggle();
        });

        /*Change Options on Radio Tabs*/
        $('.tab-option').on('change', function() {
            $('.form-wrapper-for-tab').removeClass('active');
            $('#' + $('.tab-option:checked').attr('data-tab')).addClass('active');
        });

        /*Filter*/
        $('.filter-button').click(function(event) {
            event.preventDefault();
            $(this).toggleClass('active');
            $(this).next('.filter-block').slideToggle();
        });

        /*Modify Search Button*/
        $('.modify-search').on('click', function(event) {
            event.preventDefault();
            $('.modify-row').slideDown();
        });
        /*Close Modify Search*/
        $('.close-modify-search-button').on('click', function(event) {
            event.preventDefault();
            $('.modify-row').slideUp();
        });

        /*Slick Slider for Result Page*/
        $('#result-slider').slick({
            dots: false,
            slidesToShow: 7,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: '<div class="result-slider-btn slick-prev"></div>',
            nextArrow: '<div class="result-slider-btn slick-next"></div>',
            responsive: [
                {
                    breakpoint: 1919,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 1279,
                    settings: {
                        slidesToShow: 4
                    }
                }
            ]
        });

        /*Slick Slider for Confirm Page*/
        $('#select-place-slider-1, #select-place-slider-2').slick({
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: '<div class="confirm-slider-btn slick-prev"></div>',
            nextArrow: '<div class="confirm-slider-btn slick-next"></div>'
        });
        $('.modal').on('shown.bs.modal', function () {
            $('#select-place-slider-1, #select-place-slider-2').slick("setPosition", 0);
        });
       /* $('#select-place-slider-1, #select-place-slider-2').on('beforeChange', function(event, slick, currentSlide, nextSlide){
            if(nextSlide == 0) {
                $('#select-place-slider-1 .slick-prev, #select-place-slider-2 .slick-prev').hide();
            } else {
                $('#select-place-slider-1 .slick-prev, #select-place-slider-2 .slick-prev').show();
            }
            if(slick.$slides.length == currentSlide + slick.options.slidesToScroll) {
                $('#select-place-slider-1 .slick-next, #select-place-slider-2 .slick-next').hide();
            } else {
                $('#select-place-slider-1 .slick-next, #select-place-slider-2 .slick-next').show();
            }
        });*/

        /*Tooltips*/
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });

        /*Toggle for Baggage Information*/
        $('.baggage-information').click(function(event) {
            event.preventDefault();
            $(this).toggleClass('active');
            $(this).closest('.result-item').find('.result-baggage-information').slideToggle();
        });
        /*Toggle for Fair Details*/
        $('.fare-details').click(function(event) {
            event.preventDefault();
            $(this).toggleClass('active');
            $(this).closest('.result-item').find('.result-fare-details').slideToggle();
        });
        /*Toggle for Flight Details*/
        $('.flight-details').click(function(event) {
            event.preventDefault();
            $(this).toggleClass('active');
            $(this).closest('.result-item').find('.result-flight-details').slideToggle();
        });

        /*Choose Options*/
        $('.minus').on('click', function() {
            var $input = $(this).parent().find('input');
            var count = parseInt($input.val()) - 1;
            count = count < 0 ? 0 : count;
            $input.val(count);
            $input.change();
            return false;
        });
        $('.plus').on('click', function() {
            var $input = $(this).parent().find('input');
            $input.val(parseInt($input.val()) + 1);
            $input.change();
            return false;
        });

        /*Choose Options Info*/
        $('#adult-one-way, #child-one-way, #infant-one-way, #economy-option-one-way, #business-option-one-way, #premium-economy-option-one-way').on('change', function(){
            var countPassenger = parseInt($('#adult-one-way').val()) + parseInt($('#child-one-way').val()) + parseInt($('#infant-one-way').val());
            var titlePassenger = 'Passenger';
            if(countPassenger > 1) {
                titlePassenger = 'Passengers';
            }
            $('.choose-options-one-way').html(countPassenger + ' ' + titlePassenger + ', ' + $('.class-option:checked').val());
        });

        $('#adult-round, #child-round, #infant-round, #economy-option-round, #business-option-round, #premium-economy-option-round').on('change', function(){
            var countPassenger = parseInt($('#adult-round').val()) + parseInt($('#child-round').val()) + parseInt($('#infant-round').val());
            var titlePassenger = 'Passenger';
            if(countPassenger > 1) {
                titlePassenger = 'Passengers';
            }
            $('.choose-options-round').html(countPassenger + ' ' + titlePassenger + ', ' + $('.class-option-round:checked').val());
        });

        $('#adult-multi, #child-multi, #infant-multi, #economy-option-multi, #business-option-multi, #premium-economy-option-multi').on('change', function(){
            var countPassenger = parseInt($('#adult-multi').val()) + parseInt($('#child-multi').val()) + parseInt($('#infant-multi').val());
            var titlePassenger = 'Passenger';
            if(countPassenger > 1) {
                titlePassenger = 'Passengers';
            }
            $('.choose-options-multi').html(countPassenger + ' ' + titlePassenger + ', ' + $('.class-option-multi:checked').val());
        });


        /*Select for Airport*/
        $('.selectpicker').selectpicker();

        /*Adaptive Menu*/
        $('.menu-adaptive-icon').click(function(event) {
            event.preventDefault();
            $('.adaptive-menu-wrapper').slideToggle();
        });

        /*Adaptive Filter*/
        $('.settings-adaptive-icon').click(function(event) {
            event.preventDefault();
            $('.filter-wrapper').slideToggle();
        });

        /*Header Info Country Toggle */
        $('.header-right-country-default').on('click', function(e){
            e.preventDefault();
            $('.header-right-country-toggle').slideToggle();
        });
        $('.header-right-country-toggle li a').on('click', function(e){
            e.preventDefault();
            $('.header-right-country-toggle').slideUp();
            $('.header-right-country-toggle li').removeClass('active');
            $(this).closest('li').addClass('active');
            $('.header-right-country-default').html($(this).html());
            $('#choice-country').val($(this).attr('data-country'));
        });

        /*Header Info Currency Toggle */
        $('.header-right-currency-default').on('click', function(e){
            e.preventDefault();
            $('.header-right-currency-toggle').slideToggle();
        });
        $('.header-right-currency-toggle li a').on('click', function(e){
            e.preventDefault();
            $('.header-right-currency-toggle').slideUp();
            $('.header-right-currency-toggle li').removeClass('active');
            $(this).closest('li').addClass('active');
            $('.header-right-currency-default').html($(this).html());
            $('#choice-currency').val($(this).attr('data-currency'));
        });

        /*Menu Country Toggle */
        $('.menu-country-default').on('click', function(e){
            e.preventDefault();
            $('.menu-country-toggle').slideToggle();
        });
        $('.menu-country-toggle li a').on('click', function(e){
            e.preventDefault();
            $('.menu-country-toggle').slideUp();
            $('.menu-country-toggle li').removeClass('active');
            $(this).closest('li').addClass('active');
            $('.menu-country-default').html($(this).html());
            $('#menu-choice-country').val($(this).attr('data-country'));
        });

       /*Menu Currency Toggle */
        $('.menu-currency-default').on('click', function(e){
            e.preventDefault();
            $('.menu-currency-toggle').slideToggle();
        });
        $('.menu-currency-toggle li a').on('click', function(e){
            e.preventDefault();
            $('.menu-currency-toggle').slideUp();
            $('.menu-currency-toggle li').removeClass('active');
            $(this).closest('li').addClass('active');
            $('.menu-currency-default').html($(this).html());
            $('#menu-choice-currency').val($(this).attr('data-currency'));
        });

        /*Hide Country and Currency Toggles*/
        bodySelector.on('mousedown', function (e){
            var targetBlock = $(".header-right-country-toggl, .header-right-currency-toggle");
            if (!targetBlock.is(e.target)
                && targetBlock.has(e.target).length === 0) {
                $('.header-right-country-toggle, .header-right-currency-toggle').slideUp();
            }
        });

        /*Calendar Fields on One Way*/
        $('#date-one-way-1').datetimepicker({
            locale: 'en',
            stepping: 10,
            format: 'ddd, D MMMM, YYYY',
            daysOfWeekDisabled:[0,6]
        });
        $('#date-one-way-2').datetimepicker({
            locale: 'en',
            stepping:10,
            format: 'ddd, D MMMM, YYYY',
            daysOfWeekDisabled:[0,6]
        });
        $("#date-one-way-1").datetimepicker();
        $("#date-one-way-2").datetimepicker({
            useCurrent: false
        });
        $("#date-one-way-1").on("dp.change", function (e) {
            $('#date-one-way-2').data("DateTimePicker").minDate(e.date);
        });
        $("#date-one-way-2").on("dp.change", function (e) {
            $('#date-one-way-1').data("DateTimePicker").maxDate(e.date);
        });

        /*Calendar Fields on Round*/
        $('#date-round-1').datetimepicker({
            locale: 'en',
            stepping: 10,
            format: 'ddd, D MMMM, YYYY',
            daysOfWeekDisabled:[0,6]
        });
        $('#date-round-2').datetimepicker({
            locale: 'en',
            stepping:10,
            format: 'ddd, D MMMM, YYYY',
            daysOfWeekDisabled:[0,6]
        });
        $("#date-round-1").datetimepicker();
        $("#date-round-2").datetimepicker({
            useCurrent: false
        });
        $("#date-round-1").on("dp.change", function (e) {
            $('#date-round-2').data("DateTimePicker").minDate(e.date);
        });
        $("#date-round-2").on("dp.change", function (e) {
            $('#date-round-1').data("DateTimePicker").maxDate(e.date);
        });

        /*Calendar Fields on Multi*/
        $('#date-multi-1').datetimepicker({
            locale: 'en',
            stepping: 10,
            format: 'ddd, D MMMM, YYYY',
            daysOfWeekDisabled:[0,6]
        });
        $('#date-multi-2').datetimepicker({
            locale: 'en',
            stepping:10,
            format: 'ddd, D MMMM, YYYY',
            daysOfWeekDisabled:[0,6]
        });
        $("#date-multi-1").datetimepicker();
        $("#date-multi-2").datetimepicker({
            useCurrent: false
        });
        $("#date-multi-1").on("dp.change", function (e) {
            $('#date-multi-2').data("DateTimePicker").minDate(e.date);
        });
        $("#date-multi-2").on("dp.change", function (e) {
            $('#date-multi-1').data("DateTimePicker").maxDate(e.date);
        });

        /*Calendar Fields on Confirm Page*/
        $('#confirm-month-1, #confirm-month-2, #confirm-month-3, #confirm-month-4, #confirm-month-5, #confirm-month-6, #confirm-month-7').datetimepicker({
            locale: 'en',
            stepping: 10,
            format: 'MMMM'
        });

        $('#confirm-year-first-1, #confirm-year-second-1, #confirm-year-first-2, #confirm-year-second-2, #confirm-year-first-3, #confirm-year-second-3, #confirm-year-first-4, #confirm-year-second-4, #confirm-year-first-5, #confirm-year-second-5, #confirm-year-first-6, #confirm-year-second-6, #confirm-year-first-7, #confirm-year-second-7').datetimepicker({
            locale: 'en',
            stepping: 10,
            format: 'YYYY'
        });

        /* Slider Price */
        var sliderPrice = $("#slider-price");
        sliderPrice.slider({
            range: true,
            min: 0,
            max: 250000,
            values: [ 6028, 18000 ],
            slide: function(event,ui){
                $('#price-min').val(ui.values[0]);
                $('#price-max').val(ui.values[1]);
            },
            stop: function(event, ui) {
                $('#price-min').val(ui.values[0]);
                $('#price-max').val(ui.values[1]);
            }
        });

        bodySelector.on('change', "#price-min", function(){
            var value1 = $("#price-min").val();
            var value2 = $("#price-max").val();
            if(parseInt(value1) > parseInt(value2)){
                value1 = value2;
                $("#price-min").val(value1);
            }
            sliderPrice.slider("values",0,value1);
        });

        bodySelector.on('change', "#price-max", function(){
            var value1 = $("#price-min").val();
            var value2 = $("#price-max").val();
            if (value2 > 250000) {
                value2 = 250000;
                $("#price-max").val(250000)
            }
            if(parseInt(value1) > parseInt(value2)){
                value2 = value1;
                $("#price-max").val(value2);
            }
            sliderPrice.slider("values",1,value2);
        });

        /* Slider Layover Time */
        var sliderLayover = $("#slider-layover-time");
        sliderLayover.slider({
            range: true,
            min: 0,
            max: 24,
            values: [ 0, 2 ],
            slide: function(event,ui){
                $('#layover-time-min').val(ui.values[0]);
                $('#layover-time-max').val(ui.values[1]);
            },
            stop: function(event, ui) {
                $('#layover-time-min').val(ui.values[0]);
                $('#layover-time-max').val(ui.values[1]);
            }
        });

        bodySelector.on('change', "#layover-time-min", function(){
            var value1 = $("#layover-time-min").val();
            var value2 = $("#layover-time-max").val();
            if(parseInt(value1) > parseInt(value2)){
                value1 = value2;
                $("#layover-time-min").val(value1);
            }
            sliderLayover.slider("values",0,value1);
        });

        bodySelector.on('change', "#layover-time-max", function(){
            var value1 = $("#layover-time-min").val();
            var value2 = $("#layover-time-max").val();
            if (value2 > 24) {
                value2 = 24;
                $("#layover-time-max").val(24)
            }
            if(parseInt(value1) > parseInt(value2)){
                value2 = value1;
                $("#layover-time-max").val(value2);
            }
            sliderLayover.slider("values",1,value2);
        });

        /* validate enter number value */
        $('#departure-time-min, #departure-time-max, #arrive-time-min, #arrive-time-max').on('keypress', function(event){
            var key = window.event ? event.keyCode : event.which;
            if(event.keyCode === 8 || event.keyCode === 46){
                return true;
            } else if(key < 48 || key > 58){
                return false;
            }
        });

        /* Slider departure */
        var sliderDeparture = $("#slider-departure-time");
        sliderDeparture.slider({
            range: true,
            min: 0,
            max: 86400,
            values: [0, 86400],
            step: 600,
            slide: function(event,ui){
                var totalSecondsMin = ui.values[0];
                var hoursMin = Math.floor(totalSecondsMin / 3600);
                totalSecondsMin %= 3600;
                var minutesMin = Math.floor(totalSecondsMin / 60);
                $('#departure-time-min').val(String(hoursMin).padStart(2, "0") + ':' + String(minutesMin).padStart(2, "0"));
                var totalSecondsMax = ui.values[1];
                var hoursMax = Math.floor(totalSecondsMax / 3600);
                totalSecondsMax %= 3600;
                var minutesMax = Math.floor(totalSecondsMax / 60);
                $('#departure-time-max').val(String(hoursMax).padStart(2, "0") + ':' + String(minutesMax).padStart(2, "0"));
            }
        });
        $('#departure-time-min').on('change', function(){
            var value1 = $(this).val().split(':');
            value1 = parseInt(value1[0]) * 3600 + parseInt(value1[1]) * 60;
            var value2 = $("#departure-time-max").val().split(':');
            value2 = parseInt(value2[0]) * 3600 + parseInt(value2[1]) * 60;
            if(parseInt(value1) > 85800){
                value1 = 85800;
                $("#departure-time-min").val(String(Math.floor(value1 / 3600)).padStart(2, "0") + ':' + String(Math.floor((value1%3600) / 60)).padStart(2, "0"));
            }
            if(parseInt(value1) > parseInt(value2)){
                value1 = value2;
                $("#departure-time-min").val(String(Math.floor(value1 / 3600)).padStart(2, "0") + ':' + String(Math.floor((value1%3600) / 60)).padStart(2, "0"));
            }
            sliderDeparture.slider("values",0,value1);
        });

        $('#departure-time-max').on('change', function(){
            var value1 = $("#departure-time-min").val().split(':');
            value1 = parseInt(value1[0]) * 3600 + parseInt(value1[1]) * 60;
            var value2 = $("#departure-time-max").val().split(':');
            value2 = parseInt(value2[0]) * 3600 + parseInt(value2[1]) * 60;
            if(parseInt(value2) > 86400){
                value2 = 86400;
                $("#departure-time-max").val(String(Math.floor(value2 / 3600)).padStart(2, "0") + ':' + String(Math.floor((value2%3600) / 60)).padStart(2, "0"));
            }
            if(parseInt(value1) > parseInt(value2)){
                value1 = value2;
                $("#departure-time-min").val(String(Math.floor(value1 / 3600)).padStart(2, "0") + ':' + String(Math.floor((value1%3600) / 60)).padStart(2, "0"));
            }
            sliderDeparture.slider("values",1,value2);
        });

        /* Slider arrive */
        var sliderArrive = $("#slider-arrive-time");
        sliderArrive.slider({
            range: true,
            min: 0,
            max: 86400,
            values: [0, 86400],
            step: 600,
            slide: function(event,ui){
                var totalSecondsMin = ui.values[0];
                var hoursMin = Math.floor(totalSecondsMin / 3600);
                totalSecondsMin %= 3600;
                var minutesMin = Math.floor(totalSecondsMin / 60);
                $('#arrive-time-min').val(String(hoursMin).padStart(2, "0") + ':' + String(minutesMin).padStart(2, "0"));
                var totalSecondsMax = ui.values[1];
                var hoursMax = Math.floor(totalSecondsMax / 3600);
                totalSecondsMax %= 3600;
                var minutesMax = Math.floor(totalSecondsMax / 60);
                $('#arrive-time-max').val(String(hoursMax).padStart(2, "0") + ':' + String(minutesMax).padStart(2, "0"));
            }
        });
        $('#arrive-time-min').on('change', function(){
            var value1 = $(this).val().split(':');
            value1 = parseInt(value1[0]) * 3600 + parseInt(value1[1]) * 60;
            var value2 = $("#arrive-time-max").val().split(':');
            value2 = parseInt(value2[0]) * 3600 + parseInt(value2[1]) * 60;
            if(parseInt(value1) > 85800){
                value1 = 85800;
                $("#arrive-time-min").val(String(Math.floor(value1 / 3600)).padStart(2, "0") + ':' + String(Math.floor((value1%3600) / 60)).padStart(2, "0"));
            }
            if(parseInt(value1) > parseInt(value2)){
                value1 = value2;
                $("#arrive-time-min").val(String(Math.floor(value1 / 3600)).padStart(2, "0") + ':' + String(Math.floor((value1%3600) / 60)).padStart(2, "0"));
            }
            sliderArrive.slider("values",0,value1);
        });

        $('#arrive-time-max').on('change', function(){
            var value1 = $("#arrive-time-min").val().split(':');
            value1 = parseInt(value1[0]) * 3600 + parseInt(value1[1]) * 60;
            var value2 = $("#arrive-time-max").val().split(':');
            value2 = parseInt(value2[0]) * 3600 + parseInt(value2[1]) * 60;
            if(parseInt(value2) > 86400){
                value2 = 86400;
                $("#arrive-time-max").val(String(Math.floor(value2 / 3600)).padStart(2, "0") + ':' + String(Math.floor((value2%3600) / 60)).padStart(2, "0"));
            }
            if(parseInt(value1) > parseInt(value2)){
                value1 = value2;
                $("#arrive-time-min").val(String(Math.floor(value1 / 3600)).padStart(2, "0") + ':' + String(Math.floor((value1%3600) / 60)).padStart(2, "0"));
            }
            sliderArrive.slider("values",1,value2);
        });

        /*Modify Search on Adaptive*/
        var widthPage = parseInt(bodySelector.width());
        if(widthPage < 768) {
            $('.modify-search').on('click', function(event) {
                event.preventDefault();
                if($(this).hasClass('active')) {
                    $(this).html('Modify search');
                    $('.modify-row').slideUp();
                } else {
                    $(this).html('Close');
                    $('.modify-row').slideDown();
                }
                $(this).toggleClass('active');
            });
        }

        /*Adaptive Toggle User Column on My Profile Page*/
        var widthPage = parseInt(bodySelector.width());
        if(widthPage < 768) {
            $('.travelers-column-title').on('click', function(event) {
                event.preventDefault();
                $(this).next('.travelers-user-column-wrapper').slideToggle();
            });
        }

        /*Adaptive Toggle FAQ Questions Column on FAQ Page*/
        var widthPage = parseInt(bodySelector.width());
        if(widthPage < 1280) {
            $('.faq-answers-block-title').on('click', function(event) {
                event.preventDefault();
                $(this).toggleClass('active');
                $(this).next('.faq-answers-block-wrapper').slideToggle();
            });
        }

    });
});
