/**
 * Created by lizhenya on 2018/6/28.
 */

// 數字效果

$.fn.countTo = function (options) {
    options = options || {};

    return $(this).each(function () {
        // 設置目前元素的選項
        var settings = $.extend({}, $.fn.countTo.defaults, {
            from:            $(this).data('from'),
            to:              $(this).data('to'),
            speed:           $(this).data('speed'),
            refreshInterval: $(this).data('refresh-interval'),
            decimals:        $(this).data('decimals')
        }, options);

        // 多少次更新的值，以及每個更新的值增加多少
        var loops = Math.ceil(settings.speed / settings.refreshInterval),
            increment = (settings.to - settings.from) / loops;

        // references & variables that will change with each update
        var self = this,
            $self = $(this),
            loopCount = 0,
            value = settings.from,
            data = $self.data('countTo') || {};

        $self.data('countTo', data);

        // 如果可以找到現有的間隔，請先清除
        if (data.interval) {
            clearInterval(data.interval);
        }
        data.interval = setInterval(updateTimer, settings.refreshInterval);

        // 用起始值初始化元素
        render(value);

        function updateTimer() {
            value += increment;
            loopCount++;

            render(value);

            if (typeof(settings.onUpdate) == 'function') {
                settings.onUpdate.call(self, value);
            }

            if (loopCount >= loops) {
                // 刪除間隔
                $self.removeData('countTo');
                clearInterval(data.interval);
                value = settings.to;

                if (typeof(settings.onComplete) == 'function') {
                    settings.onComplete.call(self, value);
                }
            }
        }

        function render(value) {
            var formattedValue = settings.formatter.call(self, value, settings);
            $self.html(formattedValue);
        }
    });
};

$.fn.countTo.defaults = {
    from: 0,               // 元素開始的數位
    to: 0,                 // 元素結束的數位
    speed: 1,           // 在目標號碼之間計算多長時間
    refreshInterval: 0.5,  //  更新元素的頻率
    decimals: 0,           // 要顯示的小數位數
    formatter: formatter,  // 處理常式用於格式化渲染前的值
    onUpdate: null,        // 每次元素更新時的回檔方法
    onComplete: null       // 元素完成更新時的回檔方法
};

function formatter(value, settings) {
    return value.toFixed(settings.decimals);
}



// 自訂格式化範例
$('#count-number').data('', {
    formatter: function (value, options) {
        return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');
    }
});


$(function() {
	$('.timer').each(count);
	$('.count-title').removeClass('timer');
	
	toastr.options = {
	  "closeButton": true,
	  "newestOnTop": false,
	  "positionClass": "toast-bottom-center",
	  "onclick": null,
	  "timeOut": 0,
	  "tapToDismiss": false
	}
	$("#button").on("click", function() {
		toastr.success('<p>2020/06/20 聯誼費620</p><p>2020/06/21 借5,000</p><p>2020/06/27 高鐵票1,055</p><p>2020/07/01 借4,000</p><p>2020/07/02 (去尾數-675)</p><p>2020/07/14 借5,000</p>', '<h2>支出明細</h2>');
	});
});	


function count(options) {
    var $this = $(this);
    options = $.extend({}, options || {}, $this.data('countToOptions') || {});
    $this.countTo(options);
}

