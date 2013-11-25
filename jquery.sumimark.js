/*!
 * jQuery sumimark plugin
 *
 * @version 1.0.0
 * @author Hiroyuki OHARA <Hiroyuki.no22@gmail.com>
 * @copyright (c) 2013 Hiroyuki OHARA
 * @see https://github.com/no22/jquery-sumimark
 * @license MIT
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
})(function($){
    var timer = false;
    $.fn.sumimark = function(options) {
        if (typeof options === 'string') {
            if (options === 'redraw') {
                return $(this).each(function(){
                    var $this = $(this),
                        settings = $this.data(),
                        boxOffset = $this.offset(),
                        sumi = $this.find('.' + settings.imgClass),
                        w = sumi.width(),
                        h = sumi.height(),
                        m = w < h ? w : h ,
                        offset = sumi.offset(),
                        s = Math.round(m * settings.factor),
                        mark = $this.find('.' + settings.markClass),
                        flag = mark.hasClass(settings.flagClass);
                    mark.css({
                        'width': s + 'px',
                        'height': s + 'px',
                        'top': offset.top - boxOffset.top + (h/2 - s/2) + 'px',
                        'left': offset.left - boxOffset.left + (w/2 - s/2) + 'px'
                    });
                    if (flag) {
                        mark.css({
                            'font-size': s + 'px',
                            'line-height': s + 'px'
                        });
                        if (settings.border) {
                            var circleWidth = Math.round(s * settings.borderFactor);
                            mark.css({
                                'border-width': circleWidth + 'px'
                            });
                            var txt = mark.find('.' + settings.textClass),
                                is = s - circleWidth * 2,
                                sw = Math.round(is * 0.707 * settings.sumiFactor);
                            txt.css({
                                'font-size': sw + 'px',
                                'line-height': sw + 'px',
                                'width': sw + 'px',
                                'height': sw + 'px',
                                'top': (s - sw) / 2 - circleWidth + 'px',
                                'left': (s - sw) / 2 - circleWidth + 'px'
                            });
                        }
                    }
                });
            }
        } else {
            var settings = $.extend(true, {
                'boxClass' : 'sumi-box',
                'imgClass' : 'sumi-img',
                'markClass': 'sumi-mark',
                'textClass': 'sumi-text',
                'flagClass': 'sumi-flag',
                'mark'     : '済', // $('<img src="sumi.png" />')
                'boxCss'   : {
                    'position': 'relative',
                     'display': 'block'
                },
                'imgCss'   : {},
                'markCss'   : {
                    'border-width': 0,
                    'border-color': 'red',
                    'border-style': 'solid',
                    'color': 'red'
                },
                'bgcolor': 'white',
                'opacity': 0.5,
                'rotate'   : 15,
                'border'   : true,
                'factor'   : 0.8,
                'borderFactor': 0.05,
                'sumiFactor' : 1.2,
                'delay': 0
            }, options),
            results = $(this).each(function() {
                var $this = $(this),
                    rotateStyle = false,
                    repl = $('<span />').addClass(settings.boxClass).css($.extend({
                        'background-color': settings.bgcolor
                    }, settings.boxCss)),
                    sumi = $this.clone(true).addClass(settings.imgClass).css(settings.imgCss),
                    mark = $('<span />').addClass(settings.markClass);
                repl.data({
                    'imgClass' : settings.imgClass,
                    'markClass': settings.markClass,
                    'textClass': settings.textClass,
                    'flagClass': settings.flagClass,
                    'border'   : settings.border,
                    'factor'   : settings.factor,
                    'borderFactor': settings.borderFactor,
                    'sumiFactor' : settings.sumiFactor
                }).attr('data-sumimark', 'sumimark');
                if (settings.rotate) {
                    var r = 'rotate(' + settings.rotate + 'deg)';
                    rotateStyle = {
                        'transform': r,
                        '-moz-transform': r,
                        '-webkit-transform': r,
                        '-o-transform': r,
                        '-ms-transform': r
                    };
                }
                sumi.css({
                    'opacity': settings.opacity,
                    'filter': 'alpha(opacity=' + settings.opacity * 100 + ')'
                });
                mark.css($.extend(settings.markCss, {
                    'position': 'absolute'
                }));
                if (typeof settings.mark === 'string') {
                    mark.addClass(settings.flagClass);
                    if (settings.border) {
                        mark.css({
                            'border-radius': '50%',
                            '-webkit-border-radius': '50%',
                            '-moz-border-radius': '50%',
                            'box-sizing': 'border-box',
                            '-webkit-box-sizing': 'border-box',
                            '-moz-box-sizing': 'border-box'
                        });
                        var txt = $('<span />').addClass(settings.textClass).css({
                                'position': 'absolute'
                            }).html(settings.mark);
                        mark.append(txt);
                    } else {
                        mark.html(settings.mark);
                    }
                } else {
                    mark.append(settings.mark.clone().css({
                        'width': '100%',
                        'height': '100%'
                    }));
                }
                if (rotateStyle) {
                    mark.css(rotateStyle);
                }
                repl.append(sumi);
                repl.append(mark);
                $this.replaceWith(repl);
            });
            if (timer) clearTimeout(timer);
            timer = setTimeout(function(){
                $.sumimark('redraw');
            }, settings.delay);
            return results;
         }
    };
    $.sumimark = function(options) {
        return $('*[data-sumimark=sumimark]').sumimark(options);
    };
    $(window).bind('resize.sumimark', function(){
        $.sumimark('redraw');
    });
});
